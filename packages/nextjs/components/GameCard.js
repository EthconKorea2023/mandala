import { Fragment, useEffect, useState } from "react";
import { SmartAccount } from "@biconomy/account";
// import dynamic from "next/dynamic";
import {
  ButtonBase,
  CircularProgress,
  Paper,
  Typography,
  paperClasses,
  styled,
  typographyClasses,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import clsx from "clsx";
import { motion as m } from "framer-motion";
import { List, set } from "immutable";
import { Droppable } from "react-beautiful-dnd";
import { getTBAForEachCharacter, getTokenURIForEachCharacter, isOwnRing } from "~~/utils/mandala/utils";
import useEnvStore from "~~/utils/store/envStore";

// const Droppable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then(mod => {
//       return mod.Droppable;
//     }),
//   { ssr: false },
// );
const StyledCardGameWrapper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: 240,
  display: "inline-flex",
  zIndex: 1,
  padding: theme.spacing(2, 0),
  backgroundImage: "unset",
  "@supports (backdrop-filter: blur(3px)) or (-webkit-backdrop-filter: blur(3px))": {
    WebkitBackdropFilter: "blur(15px)",
    backdropFilter: "blur(15px)",
    backgroundColor: `${grey[900]}4D`,
    // border: `1px solid ${grey[900]}`,
  },
  [`& > .${paperClasses.root}`]: {
    width: 160,
    margin: theme.spacing(0, 1),
    position: "relative",
    overflow: "hidden",
    [`& > .${typographyClasses.caption}`]: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      backgroundColor: grey[900],
      padding: theme.spacing(1),
    },
  },
  [`&.not-selected`]: {
    height: 240,
    position: "absolute",
    top: "calc(50vh - 120px)",
    padding: theme.spacing(2, 5),
    [`& > .${paperClasses.root}`]: {
      width: 160,
      [`&.typo`]: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
}));

export default function GameCard() {
  // const smartAccount =
  const [selectedGame, setGame] = useEnvStore(state => [state.selectedGame, state.setGame]);
  const [gameList, setGameList] = useState([
    {
      name: "Gollum",
      game: "The Lord of the Rings",
      description:
        'Gollum, also known as Sméagol, was a creature (originally a Stoorish Hobbit) who bore the One Ring. He lived in the Misty Mountains for most of his life. In T.A. 2941 he lost the Ring to Bilbo Baggins. For the rest of his life he sought to recover his "precious" "birthday present". In T.A. 3019 he followed the Fellowship of the Ring and met Frodo Baggins. After leading Frodo into Mordor and betraying him to Shelob he finally seized the Ring in Sammath Naur. In his euphoria he died and destroyed the Ring after falling into the fires of Mount Doom.',
      image: "https://nftstorage.link/ipfs/bafybeibhz6tq772eletyup6vwpcngcujpdpruz3cf5gntlrjqn54sq5qei",
      glb: "https://nftstorage.link/ipfs/bafybeibfg2lszfe2sj4wxv62z452kzbeqqthrww7jsjydzjuqtbbcul6bq",
    },
    {
      name: "Sample_Character",
      game: "Sample_Game",
      description: "Sample Game Character for ETHConKR, 2023",
      image: "https://nftstorage.link/ipfs/bafybeie6jknmoybc7l6n6djaznyp7eqjioj66dfosbyj6bcc7qhtrxvjli",
      glb: "https://nftstorage.link/ipfs/bafkreihnmcjunr4sp6onalveoj6ahhi4pcfmcaic5lovwvo2kxgauvjtom",
    },
  ]);

  // const [characterTBAArr, setCharacterTBAArr] = useState([])
  // const [characterTokenURIArr, setCharacterTokenURIArr] = useState([])

  const [characterTBAArr, setCharacterTBAArr] = useEnvStore(state => [state.characterTBAArr, state.setCharacterTBAArr]);
  const [characterTokenURIArr, setCharacterTokenURIArr] = useEnvStore(state => [
    state.characterTokenURIArr,
    state.setCharacterTokenURIArr,
  ]);

  function handleClick(e) {
    const { item } = e.currentTarget.dataset ?? {};
    if (item === undefined) return;
    const result = Number(item);
    setGame(result);
  }

  useEffect(() => {
    async function getDatas() {
      const TBAarr = await getTBAForEachCharacter();
      console.log(TBAarr);
      setCharacterTBAArr([...TBAarr]);

      const tokenURIarr = await getTokenURIForEachCharacter();
      console.log(tokenURIarr);
      setCharacterTokenURIArr([...tokenURIarr]);

      if (TBAarr.length === 0) return;

      const isGollumOwnTheRing = await isOwnRing(TBAarr[0]);
      const isSampleCharacterOwnTheRing = await isOwnRing(TBAarr[1]);

      console.log(isGollumOwnTheRing);
      console.log(isSampleCharacterOwnTheRing);
    }
    // // Fetching 'game&character list' from chain
    // setGameList()
    getDatas();

    // console.log(result)
  }, []);

  return (
    <>
      <Typography
        variant="h1"
        component={m.h1}
        layout
        layoutId="title"
        style={{ position: "absolute", top: "calc(50vh - 240px)", textAlign: "end" }}
      >
        Mandala
      </Typography>
      <StyledCardGameWrapper
        component={m.div}
        elevation={10}
        className={clsx(selectedGame === undefined && "not-selected")}
        layout
      >
        {selectedGame === undefined && (
          <Paper className="typo" elevation={0}>
            <Typography variant="h6" component={m.h6}>
              Games
            </Typography>
          </Paper>
        )}
        {Array.isArray(characterTBAArr) ? (
          <>
            {gameList.map((_game, _idx) =>
              _idx !== selectedGame ? (
                <Droppable droppableId={characterTBAArr[_idx]} key={`gmae-${_idx}`}>
                  {(provided, snapshot) => (
                    <Paper
                      component={ButtonBase}
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
                      <div
                        style={{
                          background: "#00000033",
                          position: "absolute",
                          inset: 0,
                        }}
                      />
                      <Typography variant="caption">{_game.name}</Typography>
                      {provided.placeholder}
                    </Paper>
                  )}
                </Droppable>
              ) : (
                <Fragment />
              ),
            )}
            <Paper component={ButtonBase} onClick={() => setGame(undefined)}>
              +
            </Paper>
          </>
        ) : (
          <Paper className="typo" elevation={0}>
            <CircularProgress />
          </Paper>
        )}
      </StyledCardGameWrapper>
    </>
  );
}
