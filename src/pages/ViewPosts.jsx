import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { supabase } from "../client";

const ViewPosts = () => {
    const [postsOrderedByCreation, setPostsOrderedByCreation] = useState([]);
    const [postsOrderedByUpvotes, setPostsOrderedByUpvotes] = useState([]);

    const [orderByCreation, setOrderByCreation] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const {data : creationData} = await supabase
            .from('Posts')
            .select()
            .order('created_at', {ascending: false});
            console.log(creationData);
            setPostsOrderedByCreation(creationData);
            const {data: upvoteData} = await supabase
            .from('Posts')
            .select()
            .order('upvotes', {ascending: false});
            console.log(upvoteData);
            setPostsOrderedByUpvotes(upvoteData);
        }
        fetchPosts();
     }, []);

    return (
        <div>
            <p>Order By:</p>
            <button onClick={()=>setOrderByCreation(true)}>Newest</button>
            <button onClick={()=>setOrderByCreation(false)}>Most Popular</button>
            {
                orderByCreation ?
                    postsOrderedByCreation && postsOrderedByCreation.length > 0 ?
                        postsOrderedByCreation.map((p,index) => 
                        <Card id={p.id} title={p.title} upvotes={p.upvotes} created_at={p.created_at.substring(0,10)}></Card>)
                    :
                        <h2>{'No Posts Yet 😞'}</h2>
                : 
                    postsOrderedByUpvotes && postsOrderedByUpvotes.length > 0 ?
                        postsOrderedByUpvotes.map((p,index) => 
                        <Card id={p.id} title={p.title} upvotes={p.upvotes} created_at={p.created_at.substring(0,10)}></Card>)
                    :
                        <h2>{'No Posts Yet 😞'}</h2>    
            }
        </div>
    );
}

export default ViewPosts;