import React from "react";
import Form from "./Form";

function CreateDeck({ setDecks, decks }) {
  return <Form decks={decks} setDecks={setDecks} />;
}

export default CreateDeck;
