import React from "react";
import { useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function Study() {
  // Defines initial variables used to store the data for each deck, a variable for a boolean for when to flip from front to back, idex variable to keep track of the card at a specific index
  const [eachDeck, setEachDeck] = useState([]);
  const [flip, setFlip] = useState(true);
  const [index, setIndex] = useState(0);
  const { deckId } = useParams();
  const history = useHistory();

  // Makes a API call to get the data of the current deck and store it in the eachDeck variable, also sets the index to the beginning (0) to start at first card
  useEffect(() => {
    readDeck(deckId)
      .then((data) => setEachDeck(data))
      .then(setIndex(0));
  }, []);

  const allCards = eachDeck.cards;

  // Changes the flip variable to the opposite of what it currently is at (true -> false or false -> true) which determines if the front or back of card is displayed
  function handleFlipClick() {
    setFlip(!flip);
  }

  // handles when you click the next button, incrementing the index by one, which will go to the next card in the array, also sets flip back to true so it shows the front info
  // The if statement is triggered when the user gets to the last card and clicks next, which will propt a window that asks if they want to restart from the beginning or cancel and go to the home page
  function handleNextClick() {
    if (allCards && index >= allCards.length - 1) {
      return handleRestart();
    } else {
      setIndex((prevIndex) => {
        return prevIndex + 1;
      });
      setFlip(true);
    }
  }

  // handles when the user gets to the last card and gives them the option to start over from the beginning or press cancel and go back to the home page
  function handleRestart() {
    const confirm = window.confirm(
      "Restart cards? Click 'cancel' to return to the home page",
    );

    if (confirm) {
      setIndex(0);
      setFlip(true);
    } else {
      history.push("/");
    }
  }

  if (allCards && allCards.length >= 3) {
    const card = allCards && allCards[index];
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
              <li className="breadcrumb-item">
                {" "}
                <Link to={`/decks/${deckId}`}>{eachDeck.name}</Link>
              </li>
              <li className="breadcrumb-item">Study</li>
            </ol>
          </nav>
          <div>
            <h2>Study: {eachDeck.name}</h2>
          </div>
          {/* Displays the current card you are viewing */}
          <div className="container border">
            <div className="mt-3">
              <h3>{`Card ${index + 1} of ${allCards.length} `}</h3>
            </div>
            {/* If flip is set to true, displays the front info else if it is false, displays the back info */}
            {flip ? <p>Front: {card.front}</p> : <p> Back: {card.back}</p>}
            <div className="d-flex mb-3">
              <div className="mr-2">
                {/* The handleFlipClick() called by this button will triggle the true or false value of flip variable, changing what is displayed in the code above */}
                <button
                  className="text-light btn btn-secondary"
                  onClick={handleFlipClick}
                >
                  Flip
                </button>
              </div>
              <div>
                {/* If the opposite of flip (so false which means the user clicked the Flip button) it will then display the next button to go to next card, else display nothing until  Flip button is clicked */}
                {!flip ? (
                  <button
                    className="text-light btn-primary btn"
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );

    // this part of the conditional will display a certain message if there are 2 or fewer cards in the deck, telling the user to add more cards before you can study them
  } else if (allCards && allCards.length <= 2) {
    return (
      <>
        <div className="container">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                {" "}
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                {" "}
                <Link to={`/decks/${deckId}`}>{eachDeck.name}</Link>
              </li>
              <li className="breadcrumb-item">Study</li>
            </ol>
          </nav>
          <div>
            <h1>Study: {eachDeck.name}</h1>
          </div>
          <div>
            <h2>Not enough cards.</h2>
          </div>
          <div>
            <p>{`You need at least 3 cards to study. There are ${allCards.length} cards in this deck.`}</p>
          </div>
          <div className="btn btn-primary">
            <Link to={`/decks/${deckId}/cards/new`} className="text-light">
              <FaPlus /> Add Cards
            </Link>
          </div>
        </div>
      </>
    );
  }
  return <p>Loading...</p>;
}

export default Study;
