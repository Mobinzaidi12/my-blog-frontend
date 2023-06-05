import { response } from "express";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header>
            <Link to={'/'} className="logo">My Blog</Link>
            <nav>

                <Link to={'/create'}>Create new Post</Link>

                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>

            </nav>
        </header>
    );
}
