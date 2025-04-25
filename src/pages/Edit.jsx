import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { supabase } from "../client";
import { useParams } from "react-router";
import "./Edit.css"

const Edit = () => {
    const {id} = useParams();
    const [post, setPost] = useState({title: "", img_url: "", content: ""});

    useEffect(() => {
        const getInfo = async() => {
            let {data} = await supabase
            .from('Posts')
            .select("*")
            .eq('id', id);
            setPost((prev) => {
                return {
                    ...prev,
                    title:data[0].title,
                    img_url: data[0].img_url,
                    content: data[0].content,
                }
            })
        }
        getInfo();

    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        // console.log(value);
        setPost((prev) => {
            return({
                ...prev,
                [name]: value,
            })
        });
    }

    const edit = async (event) => {
        event.preventDefault();

        // console.log(post.title);
        // console.log(post.content);
        // console.log(post.img_url);

        await supabase
        .from('Posts')
        .update({title: post.title, img_url: post.img_url, content: post.content})
        .eq('id', id);
        
        window.location = "/";
    }

    return (
        <div>
            <Header></Header>
            <form onSubmit={edit}>
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} placeholder="Title (required)" required></input>
                <textarea rows="5" cols="50" id="content" name="content" value={post.content} onChange={handleChange} placeholder="Content (optional)"></textarea>
                <input type="text" id="img_url" name="img_url" value={post.img_url} onChange={handleChange} placeholder="Image URL (optional)"></input>
                <input type="submit" value="Edit Post"></input>
            </form>
        </div>
    );
}

export default Edit;