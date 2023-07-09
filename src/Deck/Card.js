import React from "react";
import { Link } from "react-router-dom";
import { BsFillTrashFill, BsPencilFill } from "react-icons/bs";

function Card({ card, handleDelete, deckId }) {
  return (
    <>
      <div className="d-flex flex-column container border">
        {/* Displays the information for the front and back of each card */}
        <div className="d-flex flex-row">
          <div className="mt-3">
            <p>{card.front}</p>
          </div>
          <div className="mt-3">
            <p>{card.back}</p>
          </div>
        </div>
        {/* Displays the buttons to Edit or Delete each card */}
        <div className="d-flex flex-row-reverse mb-3">
          <div>
            <button
              onClick={() => handleDelete(card.id)}
              className="btn btn-danger"
            >
              <BsFillTrashFill className="text-light" />
            </button>
          </div>
          <div>
            <Link
              to={`/decks/${deckId}/cards/${card.id}/edit`}
              className="text-light mr-2 btn btn-secondary"
            >
              {" "}
              <BsPencilFill /> Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
