import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams, useSearchParams } from "react-router";
import { supabase } from "../client";
import Post from "../components/Post";

const DetailedPostView = () => {
    const {id} = useParams();
    const [post, setPost] = useState({title: "", content: "", img_url: "", upvotes: 0, comments: [], created_at: ""});

    useEffect(() => {
        const getInfo = async () => {
            let {data} = await supabase
            .from("Posts")
            .select("*")
            .eq('id', id);

            //console.log(data[0].comments);
            setPost((prev) => {
                return {
                    ...prev,
                    title:data[0].title,
                    content: data[0].content,
                    img_url: data[0].img_url,
                    upvotes: data[0].upvotes,
                    comments: data[0].comments,
                    created_at: data[0].created_at
                }
            })
        };
        getInfo();
    }, []);

    return (
        <div>
            <Header></Header>
            <Post id={id} title={post.title} content={post.content} img_url={post.img_url} comments={post.comments} upvotes={post.upvotes} created_at={post.created_at.substring(0,10)}></Post>
        </div>
    );
}

export default DetailedPostView;