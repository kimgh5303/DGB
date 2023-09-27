/* eslint-disable */
import '../App.css';
import '../comment.css';
import Nav from "../navuser";
import axios from "axios";
import CustomModal from '../formComponent/ModalForm';
import { ScrollRemote } from '../remote/remoteControll';
import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { serverIP, S3URL } from "../axioses/config";
import { EthContext, EthProviderCompany } from "../contexts/EthContext";

// 한국 시간 함수
function javaNow() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');

    var javaTimestamp = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return javaTimestamp;
}

export default function Company() {
    return (
        <EthProviderCompany>
            <CompanyForm />
        </EthProviderCompany>
    )
}

function CompanyForm() {
    const fetchData = (url, method = 'get', data = null) => {
        const config = {
            method,
            url: `${serverIP}/${url}`
        };

        if (data) {
            config.data = JSON.stringify(data);
            config.headers = {
                'Content-Type': 'application/json'
            };
        }

        return axios(config);
    };
    const { companyId } = useParams();
    const [state, setState] = useState({
        comment: '',
        companyData: '',
        tagData: '',
        eventData: [],
        commentArray: [],
        userId: '',
        userName: '',
        reportData: [],
        token: '',
        input: '',
        ModalOpen: false,
        isComment: false,
    });

    const { comment, companyData, tagData, eventData, commentArray, userId, userName, reportData, input, token, ModalOpen, isComment } = state;

    const onChange = useCallback(e => {
        setState(prevState => ({ ...prevState, comment: e.target.value, isComment: true }));
    }, []);

    const handlechange = useCallback(e => {
        setState(prevState => ({ ...prevState, input: e.target.value }));
    }, []);

    const { Code, setCode } = useContext(EthContext);

    useEffect(() => {
        onSubmit();
    }, [Code])

    const onSubmit = () => {
        if (isComment) {
            if (Code === 1) {
                if (!JSON.parse(localStorage.getItem('userpermission'))) {
                    alert('접근 권한이 없습니다.\n관리자에게 문의해주세요.')
                    return;
                }

                if (comment === '') {
                    return;
                }

                const newComment = [null, companyId, userId, comment, javaNow()];
                let DBComment = {
                    "companyid": companyId,
                    "userid": userId,
                    "commentdesc": comment,
                    "time": javaNow(),
                    "companyname": companyData.companyname,
                    "username": userName,
                };

                let data = {
                    "fromid": "test",
                    "toid": localStorage.getItem("userbcid"),
                    "value": 10,
                };

                const fetches = [
                    fetchData("comments", 'post', DBComment),
                    fetchData("transactions/comments", "post", data),
                ];

                Promise
                    .all(fetches)
                    .thne((res) => {
                        setCode(0);
                        document.location.href = `/home/company/${companyId}`
                    })
                    .catch(error => { console.error(error) });
                setState(prevState => ({
                    ...prevState,
                    commentArray: [newComment, ...prevState.commentArray],
                    comment: '',
                }));


            } else if (Code === 0) {
                return;
            } else {
                alert(`트랜잭션 처리 실패\nError Code : ${Code}`);
                document.location.href = document.location.href = `/home/company/${companyId}`;
            }
            setState(prevState => ({ ...prevState, ModalOpen: false, isComment: false }))
        } else {
            if (Code === 1) {
                setState(prevState => ({ ...prevState, ModalOpen: false }))
                if (!JSON.parse(localStorage.getItem('userpermission'))) {
                    alert('접근 권한이 없습니다.\n관리자에게 문의해주세요.');
                    return;
                }

                if (input <= 0) {
                    alert("값을 올바르게 적어주세요");
                }
                else if (token < input) {
                    alert("보유 토큰이 부족합니다.");
                };
                setCode(0);
            } else if (Code === 0) {
                return;
            } else {
                setState(prevState => ({ ...prevState, ModalOpen: false }))
                alert(`트랜잭션 처리 실패\nError Code : ${Code}`);
                document.location.href = document.location.href = `/home/company/${companyId}`;
            }
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("userid");
        const name = localStorage.getItem("username");

        setState(prevState => ({
            ...prevState,
            userId: id,
            userName: name,
        }));

        if (companyId && id) {
            const fetches = [
                fetchData(`companies/${companyId}`),
                fetchData(`tags/${companyId}`),
                fetchData(`events/${companyId}`),
                fetchData(`comments/${companyId}`),
                fetchData(`reports/${companyId}`),
                fetchData(`users/tokenvalues/${id}`)
            ];

            Promise
                .all(fetches)
                .then(axios.spread((companyDetailResponse, tagDetailResponse, eventListResopnse, commentListResponse, reportResponse, usertokenResponse) => {
                    setState(prevState => ({
                        ...prevState,
                        companyData: companyDetailResponse.data.data,
                        tagData: tagDetailResponse.data.data[0],
                        eventData: eventListResopnse.data.data,
                        commentArray: commentListResponse.data.data,
                        reportData: reportResponse.data.data,
                        token: usertokenResponse.data.data,
                    }));
                }))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [companyId]);

    const tagprint = (arr) => {
        if (!arr) {
            return [];
        }

        const tags = arr.split('/');

        return tags.map((tag, index) => (
            <span
                className="inline-flex w-full h-full items-center justify-center rounded-md bg-indigo-50 px-3 py-2 mx-1 text-2xl font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                key={index}
            >
                {tag}
            </span>
        ));
    };

    const handleDownload = (bname, filename) => {
        const url = "https://" + bname + S3URL + filename;
        const downbload = document.createElement('a');
        downbload.href = url;
        downbload.setAttribute('download', 'ESG경영_보고서');
        downbload.click();
    };

    return (
        <div>
            <Nav />
            <ScrollRemote />
            <CustomModal
                openHandle={ModalOpen}
                closeFunc={setState}
                Text={`블록체인 트랜잭션 처리중입니다.\n잠시만 기다려주세요.\n(5~10초 정도 소요됩니다)`} />
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">{companyData.companyname}</span></h1>
                    <div className="text-gray-400">
                        기업 블록체인 아이디 : <a id="toAcc">{companyData.bcid}</a>
                    </div>
                    <div className="hidden" id="companyId">{companyData.companyid}</div>
                </div>
                <div className="row gx-5 justify-content-center mb-4">
                    <div className="col-lg-11 col-xl-9 col-xxl-8">
                        <section>
                            <div className="card shadow border-0 rounded-4 mb-5">
                                <div className="card-body p-5">
                                    <div className="mb-5">
                                        <div className="d-flex align-items-center mb-4 d-flex">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                                                <i className="bi bi-tools"></i>
                                            </div>
                                            <h3 className="fw-bolder mb-0 mr-auto">
                                                <span className="text-gradient">기부금 현황</span>
                                            </h3>
                                            <input
                                                name="price"
                                                id="price"
                                                value={input}
                                                placeholder={`보유 코인 : ${token}`}
                                                onChange={handlechange}
                                                className="border-0 mr-3 w-1/8 pl-3 text-gray-900 ring-2 ring-inset ring-indigo-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 h-full rounded-md text-xl"
                                            />
                                            <div className="mr-3 text-xl">
                                                don
                                            </div>
                                            <a onClick={() => {
                                                if (input === '') {
                                                    alert('값을 입력해주세요');
                                                    return;
                                                }
                                                setState(prevState => ({ ...prevState, ModalOpen: true }));
                                            }}
                                                className="btn btn-primary px-4 py-3 ml-5"
                                                id="donation">
                                                기부하기
                                            </a>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex items-center bg-light rounded-4 p-3 h-100">
                                                <div className="relative w-full bg-gray-200 rounded overflow-hidden">
                                                    <div
                                                        className="h-full flex justify-center items-center text-white bg-indigo-600 rounded"
                                                        style={{ width: `${companyData.tokenvalue}%` }}
                                                    >
                                                        <div className="absolute right-0 mr-3 text-black">
                                                            {companyData.tokenvalue} / 100
                                                        </div>
                                                        <div>
                                                            {companyData && companyData.tokenvalue ? companyData.tokenvalue.toFixed(2) : "0.00"}%
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                                                <i className="bi bi-tools"></i>
                                            </div>
                                            <h3 className="fw-bolder mb-0">
                                                <span className="text-gradient d-inline">기업 키워드</span>
                                            </h3>
                                        </div>
                                        <div className="w-full h-full items-center">
                                            <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">{tagData && tagData[1] && tagprint(tagData[1])}</div>
                                        </div>
                                    </div>
                                    <div className="mb-0">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3"><i className="bi bi-code-slash"></i></div>
                                            <h3 className="fw-bolder mb-0"><span className="text-gradient d-inline">기업 소개</span></h3>
                                        </div>
                                        <div className="mb-4">
                                            <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">{companyData.companydesc}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h2 className="text-primary fw-bolder mb-0">ESG 경영 보고서</h2>
                                <div className="text-gray-400">
                                    기업 NFT ID : <a>{companyData.contractaddr}</a>
                                </div>
                            </div>
                            {reportData.map((data, index) => (
                                <div className="card shadow border-0 rounded-4 mb-5" key={index}>
                                    <div className="card-body p-5 flex justify-between">
                                        <div>
                                            <div className="text-primary fw-bolder mb-2">파일 생성 날짜 : {data[2]}</div>
                                            <div className="small fw-bolder">파일 이름 : {data[4]}</div>
                                        </div>
                                        <div>
                                            <a onClick={() => handleDownload(data[3], data[4])} className="btn btn-primary px-4 py-3 mt-3">
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </section>
                        <section>
                            <h2 className="text-secondary fw-bolder mb-4">기업 행사 목록</h2>
                            {eventData.length > 0 ? (
                                eventData.map((event, index) => (
                                    <div className="card shadow border-0 rounded-4 mb-5" key={index}>
                                        <div className="card-body">
                                            <div className="row align-items-center gx-5">
                                                <div className="col text-center text-lg-start mb-4 mb-lg-0">
                                                    <div className="card-body p-0 h-80">
                                                        <div className="d-flex justify-between w-full h-full">
                                                            <div className="p-5 grid grid-rows-3 w-full">
                                                                <h2 className="fw-bolder d-flex justify-start">{event[1]}</h2>
                                                                <p className="d-flex justify-start">{event[2]}</p>
                                                                <a className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder w-3/4" href={`/event/${companyId}/${event[0]}`}>리뷰 보러가기</a>
                                                            </div>
                                                            <img className="img-fluid w-80" src={"https://" + event[3] + S3URL + event[4]} alt="..." />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="card shadow border-0 rounded-4 mb-5">
                                    <p>기업 행사가 없습니다.</p>
                                </div>
                            )}
                        </section>
                        <div className="text-center">
                            <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">기업 응원 댓글</span></h1>
                        </div>
                        <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                            <div className="card-body p-0 h-80">
                                <div className="border-0 rounded-4 h-full w-full p-4">
                                    <div className="h-56 overflow-y-scroll">
                                        <ul>
                                            {commentArray.map((comment, index) => (
                                                <li key={index} className="commentText d-flex justify-between">
                                                    <div className="commentMargin">
                                                        <span className="commentLabel">{comment[2]}: </span>
                                                        <span className="commentLabel commentDescLeftAlign">{comment[3]}</span>
                                                    </div>
                                                    <div className="commentMargin" style={{ marginRight: '15px' }}>
                                                        <span className="commentLabel">{comment[4]}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="w-full d-flex justify-center pt-3 ">
                                        <div className="commentContainer w-full" >
                                            <form className="commentWrap d-flex justify-between"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    if (comment === '') {
                                                        alert('코멘트를 입력해주세요');
                                                        return;
                                                    }
                                                    setState(prevState => ({ ...prevState, ModalOpen: true }))
                                                }}>
                                                <input
                                                    id="commentValue"
                                                    type="text"
                                                    placeholder="댓글달기"
                                                    value={comment}
                                                    onChange={onChange}
                                                    className="w-3/4"
                                                />
                                                <button type='submit' className="commetBtn btn btn-primary px-4 py-2 ml-3" id="comment">게시</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}