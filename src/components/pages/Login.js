import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        if (!userName || !password) {
            toast.info("Please provide complete information", { position: toast.POSITION.TOP_CENTER });
            return;
        }


        const response = await fetch("http://localhost:4500/api/user/login", {
            method: "POST",
            body: JSON.stringify({ userName, password }),
            headers: {
                "Content-Type": "application/json"
            },
        })

        let loginUser = await response.json();

        if (loginUser.status === false) {
            toast.error("Please enter your correct email and password", { position: toast.POSITION.TOP_CENTER });
            return;
        }

        localStorage.setItem('token', JSON.stringify(loginUser.auth))
        navigate('/')
    }



    return (

        <div>
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input type="text" placeholder="UserName" value={userName} onChange={e => setUserName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Login</button>
            </form>

        </div>

    );
}