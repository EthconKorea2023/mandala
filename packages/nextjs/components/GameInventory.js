import { Paper, paperClasses, styled } from "@mui/material";
// import { shallow } from "zustand/shallow";
import useEvnStore from "~~/utils/store/envStore";

const StyledInventoryWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  flex: 1,
  display: "inline-flex",
  [`& > .${paperClasses.root}`]: {
    flex: 1,
    margin: theme.spacing(1),
  },
}));

export default function GameInventory() {
  const selectedGame = useEvnStore(state => state.selectedGame);
  return (
    <StyledInventoryWrapper>
      <Paper className="invenzone">inven</Paper>
      <Paper className="Character">r3fzone</Paper>
    </StyledInventoryWrapper>
  );
}
