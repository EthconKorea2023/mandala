import { Button, styled } from "@mui/material";
import type { NextPage } from "next";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Home: NextPage = () => {
  return <StyledDiv></StyledDiv>;
};

export default Home;
