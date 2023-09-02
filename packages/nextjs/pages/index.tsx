import { styled } from "@mui/material";
import type { NextPage } from "next";
import { DragDropContext } from "react-beautiful-dnd";
import GameCard from "~~/components/GameCard";
import GameInventory from "~~/components/GameInventory";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "calc(100% - 64px)",
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: 64,
}));
// import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
// import { MetaHeader } from "~~/components/MetaHeader";
// import Inventories from "~~/components/inventories";

const Home: NextPage = () => {
  function handleDragEnd(result: any) {
    if (!result.destination) {
      return;
    }
    // if (result.destination.droppableId === "bin") {
    //   handleDelete({
    //     currentTarget: { dataset: { name: result.draggableId } },
    //   });
    //   return;
    // }
    // if (result.source.index === result.destination.index) {
    //   return;
    // }
    // setItems(l => {
    //   const removed = l.get(result.source.index);
    //   const reorderedList = l.delete(result.source.index).insert(result.destination.index, removed);
    //   saveFile(`${workDir.graphPath}/fbrc/fbrcList.json`, JSON.stringify(reorderedList.toJSON()));
    //   return reorderedList;
    // });
  }
  return (
    <StyledDiv>
      <DragDropContext onDragEnd={handleDragEnd}>
        <GameCard />
        <GameInventory />
      </DragDropContext>
    </StyledDiv>
  );
};

export default Home;
