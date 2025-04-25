import React, { useState } from "react";
import Header from "../components/Header";
import { supabase } from "../client";

const Create = () => {
    const [post, setPost] = useState({title: "", img_url: "", content: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        //console.log(name);
        //console.log(value);
        setPost((prev) => {
            return({
                ...prev,
                [name]: value,
            })
        });
    }

    const add = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .insert({title: post.title, img_url: post.img_url, content: post.content})
        .select();

        window.location = "/";
    }

    return (
        <div>
            <Header></Header>
            <form onSubmit={add}>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} placeholder="Title (required)" required></input>
                <textarea rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange} placeholder="Content (optional)"></textarea>
                <input type="text" id="img_url" name="img_url" value={post.img_url} onChange={handleChange} placeholder="Image URL (optional)"></input>
                <input type="submit" value="Create Post"></input>
            </form>
        </div>
    );
}

export default Create;