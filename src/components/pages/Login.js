import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

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


        const loginUser = await fetch("http://localhost:4500/api/user/login", {
            method: "POST",
            body: JSON.stringify({ userName, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        loginUser = await loginUser.json();

        if (!loginUser) {
            toast.error("please enter your correct email and password", { position: toast.POSITION.TOP_CENTER })
            return;
        }

        localStorage.setItem('users', JSON.stringify(loginUser.user));
        localStorage.setItem('auth', JSON.stringify(loginUser.auth))
        navigate('/')
    }



    return (

        <div>
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input type="text" placeholder="UserName" value={userName} onChange={e => setUserName()} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword()} />
                <button>Login</button>
            </form>
            <ToastContainer />
        </div>

    );
}