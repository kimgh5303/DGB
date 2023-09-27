import './index.css';
import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Modal from 'react-modal'
import Company from './company/company';
import Cdetail from './company/cdetail';
import Event from './event';
import Esgreport from './esgreport';
import Insertevent from './insertevent';
import Loginuser from './loginuser';
import Logincompany from './logincompany';
import Managecom from './managecom';
import Managemain from './managemain';
import Maincom from './maincom';
import Mypage from './mypage';
import Survey1 from './survey1';
import Survey2 from './survey2';
import Survey3 from './survey3';
import SignUp_User from './signUp_user';
import SignUp_Company from './signUp_company';

Modal.setAppElement('#root');

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            {/*user가 company 정보 확인할 때 경로*/}
            <Route path='/home/company/:companyId' element={<Company />} />
            <Route path='/event/:companyid/:eventidx' element={<Event />} />
            <Route path='/logincompany' element={<Logincompany />} />
            <Route path='/home' element={<Maincom />} />
            <Route path='/cdetail' element={<Cdetail />} />
            <Route path='/survey1' element={<Survey1 />} />
            <Route path='/survey2' element={<Survey2 />} />
            <Route path='/survey3' element={<Survey3 />} />
            <Route path='/esgreport' element={<Esgreport />} />
            <Route path='/home/MyPage' element={<Mypage />} />
            <Route path='/insertevent' element={<Insertevent />} />
            <Route path='/loginuser' element={<Loginuser />} />
            <Route path='/managemain' element={<Managemain />} />
            <Route path='/managemain/:companyId' element={<Managecom />} />
            <Route path='/signup_company' element={<SignUp_Company />} />
            <Route path='/signup_user' element={<SignUp_User />} />
            <Route path='/esgreport' element={<Esgreport />} />
        </Routes>
    </BrowserRouter>
);
