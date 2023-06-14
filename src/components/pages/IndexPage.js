import { useState, useEffect } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:4500/api/post/posts", {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </>
    );
}
