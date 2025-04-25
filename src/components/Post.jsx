import React from "react";
import { Link } from "react-router";
import './Post.css';
import more from './more.png'
import { supabase } from "../client";
import { useState, useEffect } from "react";

const Post = (props) => {
    const [upvotes, setUpvotes] = useState(props.upvotes || 0);
    const[comments, setComments] = useState(props.comments || []);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        setUpvotes(props.upvotes);
    }, [props.upvotes]);

    useEffect(() => {
        if (Array.isArray(props.comments)) {
            setComments(props.comments);
        }
    }, [props.comments]);

    const updateUpvote = async () => {
        await supabase
        .from("Posts")
        .update({"upvotes": upvotes+1})
        .eq("id", props.id)

        setUpvotes(upvotes+1);
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
        .from("Posts")
        .delete()
        .eq('id', props.id);

        window.location = "http://localhost:5173/";
    }

    const handleChange = (event) => {
        //console.log(comments);
        const {value} = event.target;
        //console.log(value);
        setNewComment(value);
    }

    const addComment = async (event) => {
        event.preventDefault();

        const newArray = [...comments, newComment];
        setComments([...comments, newComment]);

        await supabase
        .from("Posts")
        .update({comments: newArray})
        .eq('id', props.id);

        setNewComment("");
    }

    return (
        <div className="Post">
            <Link to={'/edit/'+ props.id}><img className="moreButton" alt="more button" src={more} /></Link>
            <p>Posted {props.created_at}</p>
            <h3>{props.title}</h3>
            {props.content && <p>{props.content}</p>}
            {props.img_url && <img src={props.img_url}></img>}
            <p><span className="upvoteButton" onClick={updateUpvote}>👍</span>{upvotes} upvotes</p>
            {comments ? <div className="Comments"><p>Comments</p> <ul>
                {comments.map((c) => <li>{c}</li>)}
            </ul></div>
            : <p>No comments yet. Add the first one!</p>}
            <form onSubmit={addComment}>
                <input type="text" id="newComment" name="newComment" value={newComment} onChange={handleChange} required></input>
                <input type="submit" value="Add Comment"></input>
            </form>
            <button className="deleteButton" onClick={deletePost}>Delete</button>
        </div>
    );
}

export default Post;