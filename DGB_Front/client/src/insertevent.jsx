/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { serverIP } from "./axioses/config"
import Nav from "./navcompany";

export default function Insertevent() {
    let [mainImg, setMainImg] = useState("");
    const [companyId, setCompanyId] = useState("");
    const [inputname, setInputname] = useState('')
    const [inputdesc, setInputdesc] = useState('')
    const [file, setFile] = useState(null);

    useEffect(() => {
        const companyId = localStorage.getItem("companyid");
        setCompanyId(companyId);
    }, []);

    const handleInputname = (e) => {
        setInputname(e.target.value)
    }

    const handleInputdesc = (e) => {
        setInputdesc(e.target.value)
    }

    const setPreviewImg = (event) => {

        var reader = new FileReader();

        reader.onload = function (event) {
            setMainImg(event.target.result);
        };

        reader.readAsDataURL(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    const onClickAddEvent = () => {

        const formData = new FormData();
        formData.append('eventname', inputname);
        formData.append('eventdesc', inputdesc);
        formData.append('companyid', companyId);
        if (file) {
            formData.append('multipartFile', file);
        } else {
            alert("사진을 선택해주세요");
            return; // 파일이 없으면 함수 실행 중단
        }

        axios.post(serverIP + "/events", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                alert("행사가 등록됐습니다")
                document.location.href = `/cdetail/${companyId}`
            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            <Nav />
            <div class="container px-5 my-5">
                <div className="col-span-full">
                    <div class="text-center mb-5">
                        <h1 class="display-5 fw-bolder mb-0"><span class="text-gradient d-inline">행사 추가하기</span></h1>
                    </div>
                    <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="행사 제목"
                                onChange={handleInputname}
                                className="w-full border-gray-900/25 border-solid border-2 rounded-4 pl-3 py-2 mb-3"/>
                            <textarea
                                id="about"
                                name="about"
                                placeholder="행사 상세 설명"
                                rows={3}
                                onChange={handleInputdesc}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}/>
                        </div>
                        <div className="text-center content-center float-right">
                            <div className=" d-flex justify-center">
                                <img src={mainImg} className="w-80"></img>
                            </div>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={setPreviewImg} />
                                </label>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                    <div>
                        <button
                            className="btn btn-primary px-4 py-3 mt-3 float-right"
                            onClick={onClickAddEvent}>
                            <div className="d-inline-block bi bi-download"></div>
                            등록하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}