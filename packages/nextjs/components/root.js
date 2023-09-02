"use client";

// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import BiconomyButton from "./BiconomyButton";
import { Typography, styled } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";
import GameCard from "~~/components/GameCard";
import GameInventory from "~~/components/GameInventory";
import { useMandalaStore } from "~~/utils/mandalaStore";

const StyledDiv = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  // position: "absolute",
  // top: 64,
}));

// const DragDropContext = dynamic(
//   () =>
//     import("react-beautiful-dnd").then(mod => {
//       return mod.DragDropContext;
//     }),
//   { ssr: false },
// );

export default function Root() {
  const [enabled, setEnabled] = useState(false);
  const isLogin = useMandalaStore(state => state.biconomySmartAccount);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  function handleDragEnd(result) {
    console.log(result);
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
      {isLogin ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <GameCard />
          <GameInventory />
        </DragDropContext>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h1">Mandala</Typography>
          <Typography variant="h5">the blablabla</Typography>
          <BiconomyButton />
        </div>
      )}
    </StyledDiv>
  );
}
