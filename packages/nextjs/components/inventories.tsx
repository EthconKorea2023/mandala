// react component with multiple box
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import {
  createMockCharacters, // mock data 생성할때
  getTBAForEachCharacter, // 생성된 캐릭터들의 TBA 지갑 주소를 배열로
  getTokenURIForEachCharacter, // 생성된 캐릭터들의 토큰 URI를 배열로
  transferOneRing,  // 원링을 전송하는 함수
  whoHasTheOneRing, // 원링을 가지고 있는지 확인하는 함수
} from "~~/utils/mandala/utils";
import { useMandalaStore } from "~~/utils/mandalaStore";

export default function Inventories() {
  const [mockCharacters, setMockCharacters] = useState(false);
  const smartAccount = useMandalaStore(state => state.biconomySmartAccount);

  const NFTAddress1 = process.env.NEXT_PUBLIC_GAME1_ADDRESS;
  const NFTAddress2 = process.env.NEXT_PUBLIC_GAME2_ADDRESS;
  const itemAddress = process.env.NEXT_PUBLIC_1155_ADDRESS;
  // 은강이형꺼
  // let TBAAddress1 = "0x44899CEcD11fde42176c6422981DbCdA4564B2A9";
  // let TBAAddress2 = "0x013778b4405C67190a995387Bf63df8D8949374C";

  // 내꺼
  // let TBAAddress1 = "0x343209B76e981D3a7d61fCf875874b13083FEc9B";
  // let TBAAddress2 = "0xC9F0DDB7cE32F9048059012D4679653754433827";

  async function testTransferOneRing() {
    const [TBAAddress1, TBAAddress2] = await getTBAForEachCharacter();

    const result = await transferOneRing(`${TBAAddress1}`, `${TBAAddress2}`);
    // const result = await transferOneRing(`${TBAAddress2}`, `${TBAAddress1}`);
    // const result = await transferOneRing("0x25e69a4f2cf8E5cA95c6Bb426818272A947510b7", "0xEf5AB5757C63fEFaF49044F4C1c430c9CcE90E62");
    console.log(result);
  }

  async function testCreateMockCharacters() {
    await createMockCharacters(NFTAddress1, NFTAddress2, itemAddress);

    setMockCharacters(true);
  }

  async function test() {
    const tmp = await getTokenURIForEachCharacter();

    console.log(tmp);
  }

  useEffect(() => {
    async function isCreatedMockData() {
      const result = await getTBAForEachCharacter();
      console.log(result);
      if (result.length == 2) {
        setMockCharacters(true);
      }
    }
    if (smartAccount) {
      console.log("smartAccount", smartAccount);

      isCreatedMockData();
    }
  }, [smartAccount]);

  if (!smartAccount) {
    return (
      <Box
        sx={{
          margin: "100px",
        }}
      >
        <h1>Please Login with Biconomy first</h1>
      </Box>
    );
  }

  return (
    <>
      {mockCharacters ? (
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // backgroundColor: "yellow",
          }}
        >
          <Box
            sx={{
              width: "200px",
              height: "200px",
              backgroundColor: "red",
              margin: "100px",
            }}
          >
            <Link href="https://www.gameuionweb.com/zelda-botw/inventory">
              <h1>Sample Game Character & Inventory</h1>
            </Link>
          </Box>
          <Box
            sx={{
              width: "200px",
              height: "200px",
              backgroundColor: "green",
              //   margin: "100px",
            }}
          >
            <Link href="https://www.gameuionweb.com/zelda-botw/inventory">
              <h1>Gollum & Inventory</h1>
            </Link>
          </Box>
        </Box>
      ) : (
        <>
          <Button
            sx={{
              margin: "100px",
            }}
            color="primary"
            variant="contained"
            onClick={testCreateMockCharacters}
          >
            Create Mock Characters & Inventories
          </Button>
        </>
      )}
      <Button
        sx={{
          margin: "100px",
        }}
        variant="contained"
        color="primary"
        onClick={whoHasTheOneRing}
      >
        who has the one ring?
      </Button>
      <Button
        sx={{
          margin: "100px",
        }}
        variant="contained"
        color="primary"
        onClick={test}
      >
        test
      </Button>
      <Button
        color="primary"
        sx={{
          margin: "100px",
        }}
        variant="contained"
        onClick={testTransferOneRing}
      >
        Transfer One Ring
      </Button>
    </>
  );
}
