import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPost();
    }, []);

    const getPost = async () => {
        try {
            const response = await fetch(`http://localhost:4500/api/post/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const dataPost = await response.json();
                setPostInfo(dataPost);
            } else {
                throw new Error("Failed to fetch post.");
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="postPage">
            {postInfo && postInfo.data && (
                <>
                    <h1>{postInfo.data.title}</h1>
                    <div className="time">
                        <time>{formatISO9075(new Date(postInfo.data.createdAt))}</time>
                        <p>@{postInfo.data.author}</p>
                    </div>
                    <img src={`http://localhost:4500/${postInfo.data.cover}`} alt="Post Cover" />
                    <div dangerouslySetInnerHTML={{ __html: postInfo.data.content }} />

                </>
            )}
        </div>
    );
}
