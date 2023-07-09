import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { createCard } from "../utils/api";

function CardForm({
  deckId,
  addHeader,
  addBreadcrumbHeader,
  handleSubmit,
  setFormData,
  formData,
}) {
  const [currentDeck, setCurrentDeck] = useState([]);

  // handleChange() function handles when the text is input into the form, and stores the data
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Makes API call to get current deck data
  useEffect(() => {
    readDeck(deckId).then((data) => setCurrentDeck(data));
  }, []);

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
              <li className="breadcrumb-item">{addBreadcrumbHeader}</li>
            </ol>
          </nav>
          {/* Main body of the page */}
          <div>
            <h2>{addHeader}</h2>
          </div>
          <div className="d-flex flex-column">
            {/* This is the form to create or edit a card */}
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="front">Front</label>
              </div>
              <div>
                <textarea
                  className="w-100"
                  id="front"
                  type="text"
                  name="front"
                  placeholder=" Front side of card"
                  value={formData.front}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="mt-2">
                <label htmlFor="back">Back</label>
              </div>
              <div>
                <textarea
                  className="w-100"
                  id="back"
                  type="text"
                  name="back"
                  placeholder=" Back side of card"
                  value={formData.back}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className=" d-flex flex-row mt-2">
                <div className="mr-2">
                  <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                    Done
                  </Link>
                </div>
                <div>
                  <button className="btn btn-primary" type="submit">
                    Save
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

export default CardForm;
