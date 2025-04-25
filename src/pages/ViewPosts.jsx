import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { supabase } from "../client";

const ViewPosts = () => {
    const [postsOrderedByCreation, setPostsOrderedByCreation] = useState([]);
    const [postsOrderedByUpvotes, setPostsOrderedByUpvotes] = useState([]);

    const [orderByCreation, setOrderByCreation] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [postsDisplayed, setPostsDisplayed] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const {data : creationData} = await supabase
            .from('Posts')
            .select()
            .order('created_at', {ascending: false});
            // console.log(creationData);
            setPostsOrderedByCreation(creationData);
            const {data: upvoteData} = await supabase
            .from('Posts')
            .select()
            .order('upvotes', {ascending: false});
            // console.log(upvoteData);
            setPostsOrderedByUpvotes(upvoteData);

            setPostsDisplayed(creationData);
        }
        fetchPosts();
    }, []);

    const searchPosts = (inputString) => {
        setSearchQuery(inputString);
        let filtered = [];
        if(inputString != ""){
            orderByCreation ?
                filtered = postsOrderedByCreation.filter((item) => 
                    item.title.toLowerCase().includes(inputString.toLowerCase())
                ) 
            :
                filtered = postsOrderedByUpvotes.filter((item) => 
                    item.title.toLowerCase().includes(inputString.toLowerCase())
                )
            setPostsDisplayed(filtered);
        }
        else {
            orderByCreation ? setPostsDisplayed(postsOrderedByCreation) : setPostsDisplayed(postsOrderedByUpvotes);
        }
    }

    useEffect(() => {
        let filtered = [];
        if(searchQuery != "") {
            orderByCreation ?
                filtered = postsOrderedByCreation.filter((item) => 
                    item.title.toLowerCase().includes(searchQuery.toLowerCase())
                ) 
            :
                filtered = postsOrderedByUpvotes.filter((item) => 
                    item.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
            setPostsDisplayed(filtered);
        }
        else {
            orderByCreation ? setPostsDisplayed(postsOrderedByCreation) : setPostsDisplayed(postsOrderedByUpvotes);
        }
    }, [orderByCreation]);

    return (
        <div>
            <p>Order By:</p>
            <button onClick={()=>setOrderByCreation(true)}>Newest</button>
            <button onClick={()=>setOrderByCreation(false)}>Most Popular</button>
            <p>Search for a specific post:</p>
            <input type='text' placeholder='Search...' onChange={(inputString) => searchPosts(inputString.target.value)}></input>
            {
                postsDisplayed.map((p,index) => 
                <Card id={p.id} title={p.title} upvotes={p.upvotes} created_at={p.created_at.substring(0,10)}></Card>)
            }
        </div>
    );
}

export default ViewPosts;