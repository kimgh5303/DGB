import Nav from "../navcompany";
import axios from "axios";
import { serverIP, S3URL } from "../axioses/config"
import { useEffect, useState } from "react";
import { EthProviderDeploy } from "../contexts/EthContext";
import { ScrollRemote } from '../remote/remoteControll';

export default function Cdetail() {
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
    }

    if ((localStorage.getItem('companyid') === null)) {
        alert('로그인이 필요합니다.');
        window.location.href = "/";
    }
    const [state, setState] = useState({
        companyId: '',
        companyData: '',
        tagData: '',
        eventData: [],
        FeedData: [],
        reportData: [],
        commentArray: [],
        showWriteButton: null,
    });

    const { companyId, companyData, tagData, eventData, FeedData, reportData, showWriteButton, commentArray } = state;

    const handleReportRequest = () => {
        if (!JSON.parse(localStorage.getItem('companypermission'))) {
            alert('접근 권한이 없습니다.\n관리자에게 문의해주세요.')
            return;
        }
        setState(prevState => ({ ...prevState, showWriteButton: true }))
    };

    useEffect(() => {
        setState(prevState => ({ ...prevState, companyId: localStorage.getItem('companyid') }))

        if (companyId) {
            const fetches = [
                fetchData(`companies/${companyId}`),
                fetchData(`tags/${companyId}`),
                fetchData(`events/${companyId}`),
                fetchData(`feeds/companies/${companyId}`),
                fetchData(`reports/${companyId}`),
                fetchData(`comments/${companyId}`)
            ];

            Promise
                .all(fetches)
                .then(axios.spread((companyDetailResponse, tagDetailResponse, eventListResopnse, FeedListResponse, reportResponse, commentListResponse) => {
                    setState(prevState => ({
                        ...prevState,
                        companyData: companyDetailResponse.data.data,
                        tagData: tagDetailResponse.data.data[0],
                        eventData: eventListResopnse.data.data,
                        FeedData: FeedListResponse.data.data,
                        reportData: reportResponse.data.data,
                        showWriteButton: companyDetailResponse.data.data.contractaddr,
                        commentArray: commentListResponse.data.data,
                    }));
                }))
                .catch((error) => { console.log(error) });
        }
    }, [companyId]);

    const tagprint = (arr) => {
        if (!arr) {
            return [];
        }

        const tags = arr.split('/');

        return tags.map((tag, index) => (
            <span className="inline-flex w-full h-full items-center d-flex justify-center rounded-md bg-indigo-50 px-3 py-2 mx-1 text-2xl font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10" key={index}>
                {tag}
            </span>
        ));
    };

    const onClickDelete = (index) => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
        if (confirmDelete) {
            let data = {
                "eventidx": parseInt(eventData[index][0]),
                "filename": eventData[index][4],
            }
            fetchData("events", 'delete', data)
                .then((response) => {
                    alert("행사가 삭제됐습니다")
                    document.location.href = `/cdetail/${companyId}`
                })
                .catch((error) => console.log(error));
        }
    }
    const handleDownload = (bname, filename) => {
        const url = "https://" + bname + S3URL + filename;
        const downbload = document.createElement('a');
        downbload.href = url;
        downbload.setAttribute('download', 'test.pdf');
        downbload.setAttribute('type', 'application/json');
        downbload.click();
    };
    return (
        <EthProviderDeploy>
            <div>
                <Nav />
                <ScrollRemote />
                <div className="container px-5 my-5">
                    <div className="text-center mb-5">
                        <h1 className="display-5 fw-bolder mb-0">
                            {companyData && companyData.companyname && (
                                <span className="text-gradient d-inline">{companyData.companyname}</span>
                            )}
                        </h1>
                        <div className="text-gray-400">
                            기업 블록체인 아이디 : {companyData.bcid}
                        </div>
                    </div>

                    <div className="row gx-5 justify-content-center mb-4">
                        <div className="col-lg-11 col-xl-9 col-xxl-8">
                            <section>
                                <div className="card shadow border-0 rounded-4 mb-5">
                                    <div className="card-body p-5">
                                        <div className="mb-5">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3">
                                                    <i className="bi bi-tools"></i>
                                                </div>
                                                <h3 className="fw-bolder mb-0">
                                                    <span className="text-gradient d-inline">기부금 현황</span>
                                                </h3>
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
                                                <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">{tagprint(tagData && tagData[1])}</div>
                                            </div>
                                        </div>
                                        <div className="mb-0">
                                            <div className="d-flex align-items-center mb-4">
                                                <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3"></div>
                                                <h3 className="fw-bolder mb-0"><span className="text-gradient d-inline">기업 소개</span></h3>
                                            </div>
                                            <div className="mb-4">
                                                <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
                                                    {companyData && companyData.companydesc && (
                                                        <div>{companyData.companydesc}</div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <div className="hidden" id="companyId">{companyId}</div>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="grid grid-row">
                                        <h2 className="text-primary fw-bolder mb-0">ESG 경영 보고서</h2>
                                        <p class="text-gray-400">
                                            기업 NFT ID : <a>{companyData.contractaddr}</a>
                                        </p>
                                    </div>
                                    {showWriteButton === null ? (
                                        <button
                                            id="deploy"
                                            className=" rounded-md bg-gradient-primary-to-secondary text-white px-4 py-3 mt-3"
                                            onClick={handleReportRequest}
                                        >
                                            보고서 신청
                                        </button>
                                    ) : (
                                        <a className="btn btn-primary px-4 py-3 mt-3" href="/survey1">
                                            보고서 쓰기
                                        </a>
                                    )}
                                </div>
                                {reportData.map((data, index) => (
                                    <div className="card shadow border-0 rounded-4 mb-5" key={index}>
                                        <div className="card-body p-5 flex justify-between">
                                            <div>
                                                <div className="text-primary fw-bolder mb-2">파일 생성 날짜 : {data[2]}</div>
                                                <div className="small fw-bolder">파일 이름 : {data[4]}</div>

                                            </div>
                                            <div>
                                                <a onClick={() => { handleDownload(data[3], data[4]) }} className="btn btn-primary px-4 py-3 mt-3">
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                            <section>
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h2 className="text-secondary fw-bolder d-flex">기업 행사 목록</h2>
                                    <a className="btn btn-primary px-4 py-3" href="/insertevent">
                                        <div className="d-inline-block bi bi-download"></div>
                                        행사 추가하기
                                    </a>
                                </div>
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
                                                                    <div className="grid grid-cols-2">
                                                                        <button
                                                                            type="button">
                                                                            <a className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder w-auto " href={`/event/${companyId}/${event[0]}`}>리뷰 보러가기</a>
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => onClickDelete(index)}>
                                                                            <a className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder w-auto">행사 삭제하기</a>
                                                                        </button>
                                                                    </div>
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
                                        <p>기업 행사 목록이 비어 있습니다.</p>
                                    </div>
                                )}
                            </section>
                            <div className="text-center">
                                <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">실시간 피드</span></h1>
                            </div>
                            <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                <div className="card-body p-0 h-80">
                                    <div className="border-0 rounded-4 h-full w-full p-4 overflow-y-scroll">
                                        {FeedData.map((feed, index) => (
                                            <div className="flex justify-between border-solid border-2 border-indigo-600 px-3 py-3 mb-2 rounded-md" key={index}>
                                                <div className="">
                                                    <p className=" text-secondary fw-bolder m-0">{feed.content}</p>
                                                </div>
                                                <div className="commentMargin" style={{ marginRight: '15px' }}>
                                                    <span className="commentLabel">{feed.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="relative isolate overflow-hidden">
                                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                                    <h1 className="display-5 fw-bolder mb-3"><span className="text-gradient d-inline">응원 댓글</span></h1>
                                    <ul role="list" className="divide-y  border-solid border-2 border-indigo-600 rounded-lg pr-6">
                                        {commentArray.map((comment, index) => (
                                            <li key={index} className="commentText d-flex justify-between">
                                                <div className="commentMargin">
                                                    <span className=" fw-bolder m-0">{comment[2]}: </span>
                                                    <span className=" fw-bolder m-0">{comment[3]} </span>
                                                </div>
                                                <div className="commentMargin" style={{ marginRight: '15px' }}>
                                                    <span className=" fw-bolder m-0">{comment[4]}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </EthProviderDeploy>
    );
}