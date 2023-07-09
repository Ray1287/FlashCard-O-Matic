import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function EditDeckForm({ deckId }) {
  // Defines initial variables to store data of current deck
  const initialData = {
    id: deckId,
    name: "",
    description: "",
  };
  const [currentDeck, setCurrentDeck] = useState(initialData);
  const history = useHistory();

  // Makes API call to get data of current deck and stores it in currentDeck variable
  useEffect(() => {
    readDeck(deckId).then((data) => setCurrentDeck(data));
  }, []);

  // handleChange() function handles the data when text is put into the form
  function handleChange(event) {
    setCurrentDeck({
      ...currentDeck,
      [event.target.name]: event.target.value,
    });
  }

  // handleSubmit() function will make a API call to update the deck with the info typed into the form, then send you back to the Deck page (DeckInfo)
  function handleSubmit(event) {
    event.preventDefault();
    updateDeck(currentDeck).then(() => history.push(`/decks/${deckId}`));
  }

  if (currentDeck) {
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
                <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
              </li>
              <li className="breadcrumb-item">Edit Deck</li>
            </ol>
          </nav>
          <div>
            <h2>Edit Deck</h2>
          </div>
          <div className="d-flex flex-column">
            {/* Main body for the form */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
              </div>
              <div>
                <input
                  className="w-100"
                  id="name"
                  type="text"
                  name="name"
                  placeholder={` ${currentDeck.name}`}
                  value={currentDeck.name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="mt-2">
                <label htmlFor="description">Description</label>
              </div>
              <div>
                <textarea
                  className="w-100"
                  id="description"
                  type="text"
                  name="description"
                  placeholder={` ${currentDeck.description}`}
                  value={currentDeck.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className=" d-flex flex-row mt-2">
                <div className="mr-2">
                  <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                    Cancel
                  </Link>
                </div>
                <div>
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default EditDeckForm;
