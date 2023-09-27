import React from "react";

export default function Navuser() {
    const Logout = () =>{
        localStorage.clear()
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow">
            <div className="container px-5">
                <a className="navbar-brand" href="/">
                    <span className="fw-bolder text-primary">ESGSE</span>
                </a>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                    <li className="nav-item">
                        <a className="nav-link" href={"/home"}>기업 리스트</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={Logout}>로그 아웃</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
