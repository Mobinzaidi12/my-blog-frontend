import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        if (!userName || !password) {
            toast.info("Please provide complete information", { position: toast.POSITION.TOP_CENTER })
            return;
        }

        const registerUser = await fetch("http://localhost:4500/api/user/register", {
            method: "POST",
            body: JSON.stringify({ userName, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });


        if (registerUser.status === 200) {
            toast.success("Registration successfuly", { position: toast.POSITION.TOP_CENTER })
        } else if (registerUser.status === 400) {
            toast.warning("User already exist", { position: toast.POSITION.TOP_CENTER })
        } else {
            toast.error("registration failed", { position: toast.POSITION.TOP_CENTER })
        }


        setUserName('');
        setPassword('')
    }

    return (
        <div>
            <form className="register" onSubmit={register}>
                <h1>Register</h1>
                <input type="text" placeholder="UserName" value={userName} onChange={e => setUserName(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Register</button>
            </form>
            <ToastContainer />
        </div>
    );
}