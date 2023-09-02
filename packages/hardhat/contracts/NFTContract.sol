pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IERC6551Executable.sol";

// 6551 Interfaces
interface IERC6551Registry {
    event AccountCreated(
        address account,
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    );

    function createAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 seed,
        bytes calldata initData
    ) external returns (address);

    function account(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    ) external view returns (address);
}


contract NFTContract is ERC721URIStorage, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    string public baseTokenUri;
    mapping (address => uint256) public ownTokenNumberList;
    IERC6551Registry public ERC6551Registry;
    address public ERC6551AccountImplementation;
    mapping (uint256 => address) private TBAList;
    

    constructor ( //nftName, symbol, baseURL, maxSupply, price, whiteList, purchaseLimit
        string memory name,
        string memory symbol,
        string memory _baseURL,
        address _ERC6551Registry,
        address _ERC6551AccountImplementation
    )
        ERC721URIStorage()
        ERC721(name, symbol) public {
            baseTokenUri = _baseURL;
            ERC6551Registry = IERC6551Registry(_ERC6551Registry);
            ERC6551AccountImplementation = _ERC6551AccountImplementation;
    }    

    function mintMultiple (
        address _to,
        uint256 _count
    ) public returns(address){
        string memory tempTokenURI;
        for(uint i=0;i<_count;i++){
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _safeMint(_to, newItemId);
            tempTokenURI = string(abi.encodePacked(baseTokenUri, Strings.toString(newItemId), ".json"));
            _setTokenURI(newItemId, tempTokenURI);
            ownTokenNumberList[_to] += 1;
        }
        // Check that the TBA creation was success
        require(tokenBoundCreation(_count, _tokenIds.current()-1), "TBA creation failed");

        return TBAList[_tokenIds.current()];

    }

    
    function tokenBoundCreation(uint256 quantity, uint256 currentMinted) internal returns (bool) {
        for (uint256 i = 1; i <= quantity; i++) {
            TBAList[currentMinted+i] = ERC6551Registry.createAccount(
                ERC6551AccountImplementation,
                block.chainid,
                address(this),
                currentMinted + i,
                0,
                bytes("")
            );
        }
        return true;
    }
    
    function withdraw() external onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Transfer Failed");
    }

    function showTBA(uint256 _tokenId) external view returns (address) {
        return ERC6551Registry.account(ERC6551AccountImplementation, block.chainid, address(this), _tokenId, 0);
    }

    function getTBA(uint256 _tokenId) external view returns(address) {
        return TBAList[_tokenId];
    }

    function totalSupply() public view returns (uint256) {
        // Counter underflow is impossible as _burnCounter cannot be incremented
        // more than `_currentIndex - _startTokenId()` times.
        return _tokenIds.current();
    }
    
    function substring(bytes memory str, uint startIndex, uint endIndex) internal pure returns (bytes memory) {
        bytes memory strBytes = str;
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return result;
    }
    function setTokenUri(string memory _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }
    function getTokenURI() public view returns(string memory){
        return string(abi.encodePacked(baseTokenUri, "0.json"));
    }
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenUri;
    }
    function multiTransfer(address[] memory tos, uint256[] memory _tokenIdList, uint256 _count) public onlyOwner{
        for(uint256 i = 0;i<_count;i++){
            safeTransferFrom(msg.sender, tos[i], _tokenIdList[i]);
        }
    }
    
    function burnSingle(
        uint256 _tokenId
    ) public onlyOwner {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(_tokenId);
    }


    function transferSingle (
        address _to,
        uint256 _tokenId
    ) public onlyOwner{
        safeTransferFrom(msg.sender, _to, _tokenId);
    }
}