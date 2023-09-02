"use client";

import R3FZone from "./R3FZone";
import { Paper, paperClasses, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import GameInventoryBox from "~~/components/GameInventoryBox";
// import { shallow } from "zustand/shallow";
import useEvnStore from "~~/utils/store/envStore";

const StyledInventoryWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  flex: 1,
  // display: "inline-flex",

  [`& > div.invenzone`]: {
    width: 332,
    position: "absolute",
    left: theme.spacing(10),
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContents: "center",
    paddingTop: theme.spacing(3),
    zIndex: 1,
  },
  [`& > .${paperClasses.root}.character`]: {
    position: "absolute",
    inset: 0,
    // zIndex: -1,
    // [`& > .gradient`]: {
    //   background: `radial-gradient(circle at center, transparent 50%, ${grey[900]} 90%)`,
    //   position: "absolute",
    //   inset: 0,
    // },
  },
}));

export default function GameInventory() {
  const selectedGame = useEvnStore(state => state.selectedGame);
  return (
    <StyledInventoryWrapper>
      <div className="invenzone">
        <GameInventoryBox />
      </div>
      <Paper className="character">
        <R3FZone />
        <div className="gradient" />
      </Paper>
    </StyledInventoryWrapper>
  );
}
