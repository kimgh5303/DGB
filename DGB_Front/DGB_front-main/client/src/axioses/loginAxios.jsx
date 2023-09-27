/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { serverIP } from "./config";

export const useLogin = (Path) => {
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const inputRef = useRef(null);

    const config = {
        "/companies/login": {
            idKey: "companyid",
            pwKey: "companypw",
            nameKey: "companyname",
            bcKey: "companybcid",
            permissionKey: "companypermission",
            redirectPath: () => `/cdetail`,
        },
        "/users/login": {
            idKey: "userid",
            pwKey: "userpw",
            nameKey: "username",
            bcKey: "userbcid",
            permissionKey: "userpermission",
            redirectPath: () => '/home',
        }
    };

    const { idKey, pwKey, nameKey, bcKey, permissionKey, redirectPath } = config[Path] || {};

    useEffect(() => {
        if (!ID && !PW) {
            inputRef.current.focus();
        }
        setIsButtonClicked(false);
    }, [isButtonClicked]);

    const handleInputId = (e) => {
        setID(e.target.value);
    }

    const handleInputPw = (e) => {
        setPW(e.target.value);
    }

    const onClickLogin = () => {
        setIsButtonClicked(true)
        if (!(ID && PW)) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        let data = {
            [idKey]: ID,
            [pwKey]: PW
        };

        axios.post(serverIP + Path, JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            }
        })
            .then(response => {
                const res = response.data
                if (res.success === true) {
                    alert(res.data[nameKey] + "님 환영합니다.")
                    localStorage.setItem(idKey, res.data[idKey]); // id를 localStorage에 저장
                    localStorage.setItem(nameKey, res.data[nameKey]);   // 닉네임을 localStorage에 저장
                    localStorage.setItem(bcKey, res.data["bcid"]);   // 닉네임을 localStorage에 저장
                    localStorage.setItem(permissionKey, res.data["permission"])
                    document.location.href = redirectPath(localStorage.getItem(idKey));
                }
            })
            .catch((error) => {
                console.log(error)
                alert("회원정보가 일치하지 않습니다.");
            })
        setID('');
        setPW('');
    }
    const Enter = (e) => {
        if (e.key === 'Enter') {
            onClickLogin()
        }
    }
    return { ID, PW, inputRef, handleInputId, handleInputPw, onClickLogin, Enter }
}