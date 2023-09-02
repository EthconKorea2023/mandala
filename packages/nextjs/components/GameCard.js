import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { ButtonBase, Paper, paperClasses, styled } from "@mui/material";
import { List } from "immutable";
import { Droppable } from "react-beautiful-dnd";
import useEnvStore from "~~/utils/store/envStore";
import { getTBAForEachCharacter, getTokenURIForEachCharacter, isOwnRing } from "~~/utils/mandala/utils";
import { SmartAccount } from "@biconomy/account";

// const Droppable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then(mod => {
//       return mod.Droppable;
//     }),
//   { ssr: false },
// );
const StyledCardGameWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: 240,
  display: "inline-flex",
  zIndex: 1,
  [`& > .${paperClasses.root}`]: {
    width: 180,
    margin: theme.spacing(0, 1),
    position: "relative",
  },
}));

export default function GameCard() {
  // const smartAccount = 
  const [selectedGame, setGame] = useEnvStore(state => [state.selectedGame, state.setGame]);
  const [gameList, setGameList] = useState([
    {
      name: "Gollum",
      description:
        'Gollum, also known as Sméagol, was a creature (originally a Stoorish Hobbit) who bore the One Ring. He lived in the Misty Mountains for most of his life. In T.A. 2941 he lost the Ring to Bilbo Baggins. For the rest of his life he sought to recover his "precious" "birthday present". In T.A. 3019 he followed the Fellowship of the Ring and met Frodo Baggins. After leading Frodo into Mordor and betraying him to Shelob he finally seized the Ring in Sammath Naur. In his euphoria he died and destroyed the Ring after falling into the fires of Mount Doom.',
      image: "https://nftstorage.link/ipfs/bafybeibhz6tq772eletyup6vwpcngcujpdpruz3cf5gntlrjqn54sq5qei",
      glb: "https://nftstorage.link/ipfs/bafybeihsqpvgmjbo24odnzrnusndhboz3ar2w35oherex2gwborvjtnfja",
    },
    {
      name: "Sample_Character",
      description: "Sample Game Character for ETHConKR, 2023",
      image: "https://nftstorage.link/ipfs/bafybeie6jknmoybc7l6n6djaznyp7eqjioj66dfosbyj6bcc7qhtrxvjli",
      glb: "https://nftstorage.link/ipfs/bafybeihuhdlshxzsubub7j2eokh23r6wzxmieu5qp4n7j77xirdbo2pbje",
    },
  ]);

  function handleClick(e) {
    const { item } = e.currentTarget.dataset ?? {};
    if (item === undefined) return;
    const result = Number(item);
    setGame(result);
  }



  useEffect(() => {

    async function getDatas() {
      const TBAarr = await getTBAForEachCharacter()
      console.log(TBAarr)

      const tokenURIarr = await getTokenURIForEachCharacter()
      console.log(tokenURIarr)

      const isGollumOwnTheRing = await isOwnRing(TBAarr[0])
      const isSampleCharacterOwnTheRing = await isOwnRing(TBAarr[1])

      console.log(isGollumOwnTheRing)
      console.log(isSampleCharacterOwnTheRing)

    }
    // // Fetching 'game&character list' from chain
    // setGameList()
    getDatas()

    // console.log(result)

  }, []);

  return (
    <StyledCardGameWrapper>
      {gameList.map((_game, _idx) => (
        <Droppable droppableId={_game.name} key={`gmae-${_idx}`}>
          {(provided, snapshot) => (
            <Paper
              component={_idx === selectedGame ? undefined : ButtonBase}
              data-item={_idx}
              onClick={handleClick}
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                backgroundImage: `url(${_game.image})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div style={{ background: "#00000033", position: "absolute", inset: 0 }} />
              {_game.name}
              {provided.placeholder}
            </Paper>
          )}
        </Droppable>
      ))}
    </StyledCardGameWrapper>
  );
}
