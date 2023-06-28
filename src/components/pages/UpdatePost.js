import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Editor from "./Editor";

export default function UpdatePost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/api/post/${id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.ok) {
                    const dataPost = await response.json();
                    console.log(dataPost);
                    setTitle(dataPost.title);
                    setSummary(dataPost.summary);
                    setContent(dataPost.content);
                    setFile(dataPost.file);
                } else {
                    throw new Error("Failed to fetch post.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    const updatePost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        if (file) {
            data.set("file", file);
        }

        try {
            const response = await fetch(`http://localhost:4500/api/post/${id}`, {
                method: "PUT",
                body: data,
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                toast.success("Post updated successfully", { position: toast.POSITION.TOP_CENTER });
                navigate("/");
            } else {
                toast.error("Failed to update post", { position: toast.POSITION.TOP_CENTER });
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while updating the post", { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <>
            <form onSubmit={updatePost}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
                <Editor onChange={setContent} value={content} />
                <button style={{ marginTop: "5px" }}>Update Post</button>
            </form>
            <ToastContainer />
        </>
    );
}
