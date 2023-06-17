import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({ _id, title, summary, cover, content, createdAt, author }) {


    return (
        <div className="post">
            <div className="post_image">
                <Link to={`/post/${_id}`} >
                    <img src={"http://localhost:4500/" + cover} />
                </Link>
            </div>
            <div className="post_contant">
                <h1><Link to={`/post/${_id}`}>{title}</Link></h1>
                <div className="auth">
                    <p className="name">{author}</p>
                    <p>{formatISO9075(new Date(createdAt))}</p>
                </div>
                <p>{summary}</p>
            </div>
        </div>
    );
}
