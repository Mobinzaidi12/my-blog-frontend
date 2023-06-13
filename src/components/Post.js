import { formatISO9075 } from "date-fns"
export default function Post({ title, summary, cover, content, createdAt }) {
    return (
        <div className="post">
            <div className="post_image">
                <img src={"http://localhost:4500" + cover} alt="Post Cover" />
            </div>
            <div className="post_contant">
                <h1>{title}</h1>
                <div className="auth">
                    <p className="name">Mobin Zaidi</p>
                    <p>{formatISO9075(new Date(createdAt))}</p>
                </div>
                <p>{summary}</p>
            </div>
        </div>
    );
}