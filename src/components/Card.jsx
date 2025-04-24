import React from "react";
import { Link } from "react-router";
import './Card.css';
import more from './more.png'

const Card = (props) => {
    return (
        <div className="Card">
            <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
            <p>Posted {props.created_at}</p>
            <h3>{props.title}</h3>
            <p>{props.upvotes} upvotes</p>
        </div>
    );
}

export default Card;