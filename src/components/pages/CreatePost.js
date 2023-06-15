import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFiles] = useState('');
    const navigate = useNavigate();

    const createPost = async (e) => {
        e.preventDefault();

        const author = JSON.parse(localStorage.getItem('users')).userName;

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', file);
        data.set('author', author)

        let response = await fetch("http://localhost:4500/api/post/create", {
            method: "POST",
            body: data,
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });

        if (response.status === 200) {
            toast.success("successfuly", { position: toast.POSITION.TOP_CENTER })
        } else {
            toast.error("failed", { position: toast.POSITION.TOP_CENTER })
        }

        navigate('/')

    }

    return (
        <>
            <form onSubmit={createPost}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <input type="text" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
                <input type="file" name="file" onChange={e => setFiles(e.target.files[0])} />
                <ReactQuill value={content} modules={modules} formats={formats} onChange={newValue => setContent(newValue)} />
                <button style={{ marginTop: "5px" }} >Craate Post</button>
            </form>
            <ToastContainer />
        </>
    );

}