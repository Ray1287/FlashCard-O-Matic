import React from "react";
import CardForm from "./CardForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";

function AddCard() {
  // Defines variables used to pass down as props to <CardForm/> and useState() variables to store the current deck data since <CardForm/> is used for both Edit and Add card.
  const { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState([]);
  const addHeader = `${currentDeck.name}: Add Card`;
  const addBreadcrumbHeader = "Add Card";
  const initialData = {
    front: "",
    back: "",
    deckId: deckId,
  };
  const [formData, setFormData] = useState(initialData);

  // handleSubmit() function creates new card and resets the form, passed down as prop to CardForm()
  function handleSubmit(event) {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData(initialData);
  }

  // Makes API call to get the data for the specific deck and sets currentDeck variable to that data
  useEffect(() => {
    readDeck(deckId).then((data) => setCurrentDeck(data));
  }, []);

  return (
    <CardForm
      deckId={deckId}
      addHeader={addHeader}
      addBreadcrumbHeader={addBreadcrumbHeader}
      handleSubmit={handleSubmit}
      setFormData={setFormData}
      formData={formData}
    />
  );
}

export default AddCard;
