/* eslint-disable */
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { serverIP } from "./axioses/config";
import InputForm from "./formComponent/inputForm";
import { EthProviderSign, EthContext } from "./contexts/EthContext";


export default function SignUp_Company() {
    return (
        <EthProviderSign>
            <SignUpCompanyForm />
        </EthProviderSign>
    )
}

function SignUpCompanyForm() {
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [inputBCId, setInputBCId] = useState("");

    const { nowAddr } = useContext(EthContext);

    useEffect(() => {
        setInputBCId(nowAddr);
    }, [nowAddr]);

    let [mainImg, setMainImg] = useState("");
    const [file, setFile] = useState(null);
    const setPreviewImg = (event) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setMainImg(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }
    const handleInputName = (e) => {
        setInputName(e.target.value)
    }
    const handledesc = (e) => {
        setInputDesc(e.target.value)
    }
    const handleInputBCId = (e) => {
        setInputBCId(e.target.value);
    }

    const onClickSignUp = () => {
        if (!(inputId && inputPw && inputDesc && inputName)) {
            alert('모든 칸을 채워주세요.');
            return;
        } else if (!file) {
            alert("로고를 등록해 주세요");
            return;
        }
        const formdata = new FormData();
        formdata.append('companyid', inputId);
        formdata.append('companypw', inputPw);
        formdata.append('companyname', inputName);
        formdata.append('companydesc', inputDesc);
        formdata.append('bcid', inputBCId);
        formdata.append('tokenvalue', 0);
        formdata.append('permission', false);
        formdata.append('multipartFile', file)
        axios.post(serverIP + "/companies/join", formdata, {
            headers: {
                "Content-Type": `multipart/form-data`,
            }
        })
            .then(response => {
                const res = response.data
                alert('회원가입이 완료되었습니다.')
                localStorage.setItem('companyid', inputId);
                localStorage.setItem('companypw', inputPw);
                document.location.href = `/cdetail/${localStorage.getItem('companyid')}`;
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow">
                <div class="container px-5">
                    <a class="navbar-brand" href="/">
                        <span class="fw-bolder text-primary">ESGSE</span>
                    </a>
                </div>
            </nav>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 pt-4 pb-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div class="card shadow border-3 rounded-4 mb-5">
                        <div class="card-body p-5">
                            <div class="mb-0">
                                <div class="d-flex align-items-center mb-4">
                                    <div class="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3"><i class="bi bi-code-slash"></i></div>
                                    <h3 class="fw-bolder mb-0"><span class="text-gradient d-inline">기업 회원가입</span></h3>
                                </div>
                                <InputForm text="이메일" type={"email"} value={inputId} handle={handleInputId} />
                                <InputForm text="비밀번호" type={"password"} value={inputPw} handle={handleInputPw} />
                                <InputForm text="기업 이름" type={"name"} value={inputName} handle={handleInputName} />
                                <InputForm id="bcid" ph="메타마스크에 DGB 네트워크 계정을 연결하세요." text="블록체인 ID" type={"BCID"} value={inputBCId} handle={handleInputBCId} />
                                <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100 mb-3">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        placeholder="기업 소개"
                                        value={inputDesc}
                                        onChange={handledesc}
                                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sl sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>

                                <div className="d-flex align-items-center justify-between bg-light rounded-4 p-3 h-100">
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={setPreviewImg} />
                                        </label>
                                    </div>
                                    <div className=" float-right">
                                        <img src={mainImg} className="w-80"></img>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={onClickSignUp} className="relative z-10 inline-flex items-center rounded-3 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-3">
                                가입하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}