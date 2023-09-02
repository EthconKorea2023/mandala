import { useEffect, useState } from "react";
import { Paper, styled } from "@mui/material";
import { List } from "immutable";
import { Droppable } from "react-beautiful-dnd";

const StyledCardGameWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  height: 240,
  display: "inline-flex",
  [`& > div`]: {
    width: 180,
    margin: theme.spacing(0, 1),
  },
}));

export default function GameCard() {
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

  useEffect(() => {
    // // Fetching 'game&character list' from chain
    // setGameList()
  }, []);

  return (
    <StyledCardGameWrapper>
      {gameList.map((_game, _idx) => (
        <Droppable droppableId={_game.name} key={`gmae-${_idx}`}>
          {(provided, snapshot) => (
            <Paper ref={provided.innerRef} {...provided.droppableProps}>
              {_game.name}
            </Paper>
          )}
        </Droppable>
      ))}
    </StyledCardGameWrapper>
  );
}
