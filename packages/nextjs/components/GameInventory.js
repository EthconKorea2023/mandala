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
  display: "inline-flex",
  [`& > .${paperClasses.root}`]: {
    flex: 1,
    margin: theme.spacing(1),
    [`&.character`]: {
      position: "relative",
      // [`& > .gradient`]: {
      //   background: `radial-gradient(circle at center, transparent 50%, ${grey[900]} 90%)`,
      //   position: "absolute",
      //   inset: 0,
      // },
    },
  },
}));

export default function GameInventory() {
  const selectedGame = useEvnStore(state => state.selectedGame);
  return (
    <StyledInventoryWrapper>
      <Paper className="invenzone">
        <GameInventoryBox />
      </Paper>
      <Paper className="character">
        <R3FZone />
        <div className="gradient" />
      </Paper>
    </StyledInventoryWrapper>
  );
}
