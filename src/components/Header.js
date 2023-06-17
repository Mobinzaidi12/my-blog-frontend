import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {

    const auth = localStorage.getItem('token');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <header>
            <Link to={'/'} className="logo">My Blog</Link>
            <nav>
                {auth ?

                    <>
                        <Link to={'/create'}>Create new Post</Link>
                        <Link to={'/register'} onClick={logout}>Logout</Link>
                    </> :
                    <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Register</Link>
                    </>
                }


            </nav>
        </header>
    );
}
