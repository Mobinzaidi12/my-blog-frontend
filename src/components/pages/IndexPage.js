import { useState, useEffect } from "react";
import Post from "../Post";

export default function IndexPage() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPost();
    }, [])

    const getPost = async () => {

        const response = await fetch("http://localhost:4500/api/post/getPost", {
            method: "GET",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);

    };


    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}

        </>
    );
}