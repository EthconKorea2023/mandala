pragma solidity ^0.8.0;
import './NFTContract.sol';

contract NFTManager{
    address payable owner;  
    mapping(uint => string) public nameList;
    mapping(uint => address) public contractList;
    uint256 public counter;
    constructor() public {
        owner = payable(address(msg.sender));
    }
    function deployNFTContract(
        string memory name,
        string memory symbol,
        string memory _baseURL,
        address _ERC6551Registry,
        address _ERC6551AccountImplementation,
        address toAddress
        ) public returns (address){
        NFTContract minter = new NFTContract(
            name,
            symbol,
            _baseURL,
            _ERC6551Registry,
            _ERC6551AccountImplementation);
        
        nameList[counter] = name;
        contractList[counter] = address(minter);
        counter++;
        NFTContract(address(minter)).transferOwnership(toAddress);
        return address(minter);
    }

    function deleteList(uint index) public {
        require(msg.sender == owner, "you're not authorized");
        delete nameList[index];
        delete contractList[index];
    }
    
    function getList(uint start, uint end) public view returns(string[1000] memory, address[1000] memory){
        string[1000] memory tempName;
        address[1000] memory tempContract;
        uint trueEnd = end;
        if(end > counter){
            trueEnd = counter;
        }
        for(uint i = start;i<trueEnd;i++){
            tempName[i]= nameList[i];
            tempContract[i] = contractList[i];

        }
        return (tempName, tempContract);
    }
}
