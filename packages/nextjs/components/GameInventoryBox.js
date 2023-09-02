import { createRef, useEffect, useMemo, useState } from "react";
// import dynamic from "next/dynamic";
import { ListItemText, Paper, paperClasses, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { createPortal } from "react-dom";
import { isOwnRing } from "~~/utils/mandala/utils";

import useEnvStore from "~~/utils/store/envStore";

// const Droppable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then(mod => {
//       return mod.Droppable;
//     }),
//   { ssr: false },
// );
// const Draggable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then(mod => {
//       return mod.Draggable;
//     }),
//   { ssr: false },
// );
const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  height: 56,
  width: "100%",
  flex: 0,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1),
  "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))": {
    WebkitBackdropFilter: "blur(15px)",
    backdropFilter: "blur(15px)",
    backgroundColor: `${grey[900]}66`,
    // border: `1px solid ${grey[900]}`,
  },
}));
const StyledBox = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  padding: theme.spacing(0.5),
  height: 332,
  "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))": {
    WebkitBackdropFilter: "blur(15px)",
    backdropFilter: "blur(15px)",
    backgroundColor: `${grey[900]}4D`,
    // border: `1px solid ${grey[900]}`,
  },
  [`& > div.${paperClasses.root}`]: {
    width: 100,
    height: 100,
    // backgroundColor: grey[900],
    margin: theme.spacing(0.5),
    "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))": {
      WebkitBackdropFilter: "blur(15px)",
      backdropFilter: "blur(15px)",
      // backgroundColor: `${grey[900]}99`,
      backgroundColor: "transparent",
      border: `1px solid ${grey[900]}`,
    },
    overflow: "hidden",
    [`& > div`]: {
      width: "100%",
      height: "100%",
    },
  },
}));
const _portal = createRef();
function _optionalPortal(styles, element) {
  if (styles.position === "fixed") {
    return createPortal(element, _portal.current);
  }
  return element;
}

export default function GameInventoryBox() {
  const [selectedGame, setGame] = useEnvStore(state => [state.selectedGame, state.setGame]);
  const [characterTBAArr, setCharacterTBAArr] = useEnvStore(state => [state.characterTBAArr, state.setCharacterTBAArr]);
  const [rawItems, setItems] = useState([]);


  const items = useMemo(() => {
    if (rawItems.length >= 9) return rawItems;
    const minArray = new Array(9).fill(undefined);
    for (let i = 0; i < rawItems.length; i++) {
      minArray[i] = rawItems[i];
    }
    return minArray;
  }, [rawItems]);

  useEffect(() => {


    async function checkRing() {

      const currenSelectedTBA = characterTBAArr[selectedGame];
      console.log(currenSelectedTBA);

      const hasRing = await isOwnRing(currenSelectedTBA);
      console.log(hasRing)

      if (hasRing) {
        setItems([{
          name: "The One Ring",
          description:
            "Three Rings for the Elven-kings under the sky,Seven for the Dwarf-lords in their halls of stone,Nine for Mortal Men doomed to die,One for the Dark Lord on his dark throneIn the Land of Mordor where the Shadows lie.   One Ring to rule them all, One Ring to find them,   One Ring to bring them all, and in the darkness bind themIn the Land of Mordor where the Shadows lie.",
          image: "https://nftstorage.link/ipfs/bafybeid6bnsatz56fkgb4hldqtrhw3hqs7niyp5uvqcbwx6u5pre5uwzze",
          glb: "https://nftstorage.link/ipfs/bafybeib4wicygqdinah6kwnur65q5muekzlj7i7rtif4hkfx7oce6bfu3u",
        }])
      } else {
        setItems([])
      }
    }

    checkRing();

  }, [selectedGame])
  useEffect(() => {
    // // Fetching Items from chain by game
    // setItems()
    const _portalIn = document.createElement("div");
    _portalIn.style = "position: absolute; pointer-events: none; height: 100%; width: 100%";

    document.body.appendChild(_portalIn);

    _portal.current = _portalIn;



    return () => {
      document.body.removeChild(_portalIn);
    };
  }, []);
  return (
    <>
      <StyledListItemText primary="aaa" secondary="bbb" />
      <Droppable droppableId="inven" key={`gmae-in}`}>
        {(provided, snapshot) => (
          <StyledBox ref={provided.innerRef} elevation={10} {...provided.droppableProps}>
            {items.length > 0 ? items.map((_item, _idx) =>
              _item ? (
                <Draggable draggableId={_item.name} index={_idx} key={_item.name}>
                  {(provided, snapshot) =>
                    _optionalPortal(
                      provided.draggableProps.style,
                      <Paper ref={provided.innerRef} {...provided.draggableProps}>
                        <div
                          {...provided.dragHandleProps}
                          style={{
                            backgroundImage: `url(${_item.image})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {/* {_item.name} */}
                        </div>
                      </Paper>,
                    )
                  }
                </Draggable>
              ) : (
                <Paper key={_idx} />
              ),
            ) : (
              <div>Loading ...</div>
            )
            }
            {provided.placeholder}
          </StyledBox>
        )}
      </Droppable>
    </>
  );
}
