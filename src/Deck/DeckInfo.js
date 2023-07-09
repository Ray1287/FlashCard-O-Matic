import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";
import { useState } from "react";
import { BiBookBookmark } from "react-icons/bi";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import Card from "./Card";

function DeckInfo() {
  // Defines variables used to store data
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);

  // Makes API call to get the current deck data
  useEffect(() => {
    readDeck(deckId).then((data) => setDeck(data));
  }, []);

  // handleDelete() function makes a API call to delete the card, then makes another API call to get updated data of the deck
  function handleDelete(cardToDelete) {
    const confirm = window.confirm(
      "Delete this card? You will not be able to recover it.",
    );
    if (confirm) {
      deleteCard(cardToDelete)
        .then(() => readDeck(deckId))
        .then((data) => setDeck(data));
    }
  }

  if (deck && deck.cards) {
    return (
      <>
        <div className="container">
          {/* Breadcrumb navigation bar */}
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">{deck.name}</li>
            </ol>
          </nav>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          {/* Edit, Study, and Add Cards buttons for the current deck */}
          <div className="d-flex justify-content-between">
            <div>
              <div className="mr-2 btn btn-secondary">
                <Link className="text-light" to={`/decks/${deckId}/edit`}>
                  {" "}
                  <BsPencilFill /> Edit
                </Link>
              </div>
              <div className="btn btn-primary mr-2">
                <Link className="text-light" to={`/decks/${deckId}/study`}>
                  <BiBookBookmark /> Study
                </Link>
              </div>
              <div className="btn btn-primary">
                <Link className="text-light" to={`/decks/${deckId}/cards/new`}>
                  <FiPlus /> Add Cards
                </Link>
              </div>
            </div>
            <div>
              <button className="btn btn-danger">
                <BsFillTrashFill className="text-light" />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h2>Cards</h2>
          </div>
          {/* Loops through the array of cards and displays each card by using the <Card/> component */}
          <div>
            {deck.cards.map((card) => (
              <Card
                handleDelete={handleDelete}
                card={card}
                key={card.id}
                deckId={deckId}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return <p>Loading...</p>;
}

export default DeckInfo;
