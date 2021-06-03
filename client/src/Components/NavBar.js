import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div
            style={{
                backgroundColor: "tomato",
                color: "white",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
            <h1 style={{ paddingLeft: "20px" }}>Shopping List</h1>
            <Link to="#" style={{
                textDecoration: "none",
                float: "right",
                padding: "20px",
                color: "#fff",
            }}> Login </Link>
        </div>
    )
}

export default NavBar
