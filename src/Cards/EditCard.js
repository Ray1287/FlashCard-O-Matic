import React from "react";
import CardForm from "./CardForm";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { readDeck, updateCard } from "../utils/api";
import { readCard } from "../utils/api";
import { useState } from "react";

function EditCard() {
  // Defines variables used to pass down as props to <CardForm/> and useState() variables to store the current deck data since <CardForm/> is used for both Edit and Add card.
  const history = useHistory();
  const initialData = {
    front: "",
    back: "",
  };
  const { deckId, cardId } = useParams();
  const addHeader = "Edit Card";
  const addBreadcrumbHeader = `Edit Card ${cardId}`;
  const [currentDeck, setCurrentDeck] = useState([]);
  const [formData, setFormData] = useState(initialData);

  // handleSubmit() function updates the card and then takes you back to the Deck page (DeckInfo)
  function handleSubmit(event) {
    event.preventDefault();
    updateCard(formData).then(() => history.push(`/decks/${deckId}`));
  }

  // Makes API call to first get the data of the current deck, then store that data in the currentDeck variable, then makes another API call to get data of current card, and then stores that data
  useEffect(() => {
    readDeck(deckId)
      .then((data) => setCurrentDeck(data))
      .then(() => readCard(cardId))
      .then((data) => setFormData(data));
  }, []);

  if (formData) {
    return (
      <CardForm
        deckId={deckId}
        addHeader={addHeader}
        addBreadcrumbHeader={addBreadcrumbHeader}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    );
  }
}

export default EditCard;
