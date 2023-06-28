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
                    setTitle(dataPost.data.title);
                    setSummary(dataPost.data.summary);
                    setContent(dataPost.data.content);
                    setFile(dataPost.data.file);
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
        if (file?.[0]) {
            data.set("file", file?.[0]);
        }

        let response = await fetch(`http://localhost:4500/api/post/${id}`, {
            method: "PUT",
            body: data,
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


        if (response.status === 200) {

            toast.success("Post updated successfully.", { position: toast.POSITION.TOP_CENTER });
        } else {
            toast.error("Failed to update post.", { position: toast.POSITION.TOP_CENTER });
        }

        navigate("/");
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
