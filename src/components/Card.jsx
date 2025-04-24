import React from "react";
import { Link } from "react-router";
import './Card.css';


const Card = (props) => {
    return (
        <div className="Card">
            <p>Posted {props.created_at}</p>
            <Link to={'view/'+ props.id} className="title"><h3>{props.title}</h3></Link>
            <p>{props.upvotes} upvotes</p>
        </div>
    );
}

export default Card;