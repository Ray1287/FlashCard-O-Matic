import React from "react";
import EditDeckForm from "./EditDeckForm";
import { useParams } from "react-router-dom";

function EditDeck() {
  const { deckId } = useParams();

  return <EditDeckForm deckId={deckId} />;
}

export default EditDeck;
