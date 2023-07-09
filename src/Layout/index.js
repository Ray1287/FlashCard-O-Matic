import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Home from "../Home/Home";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import Study from "../Study/Study";
import CreateDeck from "../CreateDeck/CreateDeck";
import DeckInfo from "../Deck/DeckInfo";
import { deleteDeck } from "../utils/api";
import EditDeck from "../EditDeck/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

function Layout() {
  // Define useState() variables to store listDecks()
  const [decks, setDecks] = useState([]);

  // Makes API call to get list of decks
  useEffect(() => {
    listDecks().then((data) => setDecks(data));
  }, []);

  // handleDelete() function that gets passed down to <Home/> component to delete decks
  function handleDelete(deckToDelete) {
    const confirm = window.confirm(
      "Delete this deck? You will not be able to recover it.",
    );
    if (confirm) {
      deleteDeck(deckToDelete)
        .then(() => listDecks())
        .then((data) => setDecks(data));
    }
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact={true}>
          <Home decks={decks} handleDelete={handleDelete} />
        </Route>
        <Route path="/decks/new" exact={true}>
          <CreateDeck decks={decks} setDecks={setDecks} />
        </Route>
        <Route path="/decks/:deckId" exact={true}>
          <DeckInfo />
        </Route>
        <Route path="/decks/:deckId/edit" exact={true}>
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards/new" exact={true}>
          <AddCard />
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit" exact={true}>
          <EditCard />
        </Route>
        <Route path="/decks/:deckId/study" exact={true}>
          <Study decks={decks} />
        </Route>
        <Route path="/*" exact>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
