import React from "react";
import Deck from "./Deck";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Switch, Route } from "react-router-dom";

function Home({ decks, handleDelete }) {
  return (
    <>
      <Switch>
        <Route path="/">
          <div className="mb-2 container">
            <Link to="/decks/new" className="btn btn-secondary">
              <FiPlus /> Create Deck
            </Link>
          </div>
          {/* Loops through the deck array to display each deck on the home page using the <Deck/> component */}
          <div>
            {decks.map((deck) => (
              <Deck handleDelete={handleDelete} deck={deck} key={deck.id} />
            ))}
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default Home;
