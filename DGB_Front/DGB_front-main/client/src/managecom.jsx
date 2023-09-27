import './App.css';
import './comment.css';
import axios from "axios";
import moment from 'moment';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { serverIP, S3URL } from "./axioses/config";
import ChartComponent from './ChartComponent';
import { EthProviderInvest } from "./contexts/EthContext";

const links = [
    { name: 'ESG보고서 보러가기', href: '#report' },
    { name: '기업 행사 보러가기', href: '#event' },
    { name: '응원 댓글 보러가기', href: '#comment' },
]

export default function Managecom() {
    return (
        <EthProviderInvest>
            <ManagecomForm />
        </EthProviderInvest>
    )
}

function ManagecomForm() {
    const [companyData, setCompanyDetail] = useState("");
    const [tagData, setTagDetail] = useState("");
    const [eventData, seteventList] = useState([]);
    const [commentArray, setCommentArray] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [have, setHave] = useState(0);
    const [companyId, setCompanyId] = useState('');
    const [renderData, setRenderData] = useState([]);

    localStorage.setItem("companyId", useParams().companyId);
    const tagprint = (arr) => {
        if (!arr) {
            return [];
        }
        const tags = arr.split('/');
        const result = [];
        for (let i = 0; i < tags.length; i++) {
            result.push(
                <div>
                    {tags[i]}
                </div>
            );
        }
        return result;
    };

    useEffect(() => {
        setCompanyId(localStorage.getItem("companyId"));
        if (companyId) {
            // userId 값이 있을 때에만 API 호출
            const CompanyLDetail = axios.get(serverIP + `/companies/${companyId}`);
            const TagDetail = axios.get(serverIP + `/tags/${companyId}`);
            const EventList = axios.get(serverIP + `/events/${companyId}`);
            const CommentList = axios.get(serverIP + `/comments/${companyId}`);
            const report = axios.get(serverIP + `/reports/${companyId}`);
            Promise
                .all([CompanyLDetail, TagDetail, EventList, CommentList, report])
                .then((response) => {
                    const companyDeatilData = response[0].data.data;
                    const tagDetailData = response[1].data.data[0];
                    const eventListData = response[2].data.data;
                    const commentListData = response[3].data.data;
                    const reportData = response[4].data.data;
                    setCompanyDetail(companyDeatilData);
                    setTagDetail(tagDetailData);
                    seteventList(eventListData);
                    setCommentArray(commentListData);
                    setHave(companyDeatilData.tokenvalue);
                    setReportData(reportData);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [companyId]);

    useEffect(() => {
        if (reportData) {
            const newRenderData = reportData.map((data, index) => {
                let fileName = data[4];
                let splitName = fileName.split('_');
                fileName = splitName[0] + '_' + splitName[1] + '.pdf';

                let scores = reportData[index];
                let escores = scores[5];
                let sscores = scores[6];
                let gscores = scores[7];

                return (
                    <div className='grid grid-cols-2 gap-3'>
                        <div class="card shadow border-0 rounded-4">
                            <div class="card-body p-5 flex justify-between items-center">
                                <div>
                                    <div class="text-primary fw-bolder mb-2">파일 생성 날짜 : {moment(data[2]).format('YYYY-MM-DD HH:mm:ss')}</div>
                                    <div class="small fw-bolder">파일 이름 : {fileName}</div>
                                </div>
                                <div>
                                    <a onClick={() => { handleDownload(data[3], data[4]) }} class="btn btn-primary px-4 py-3 mt-3">
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ChartComponent escores={escores} sscores={sscores} gscores={gscores} />
                        </div>
                    </div>
                )
            });
            setRenderData(newRenderData);
        }
    }, [reportData]);

    const handleDownload = (bname, filename) => {
        const url = "https://" + bname + S3URL + filename;
        const downbload = document.createElement('a');
        downbload.href = url;
        downbload.setAttribute('download', 'test.pdf');
        downbload.setAttribute('type', 'application/json');
        downbload.click();
    };

    return (
        <EthProviderInvest>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 shadow z-10">
                    <div class="container px-5">
                        <a class="navbar-brand" href="/">
                            <span class="fw-bolder text-primary">ESGSE</span>
                        </a>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                            <li class="nav-item">
                                <a class="nav-link" href="/managemain">관리자 페이지</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center" />
                    <div
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                        aria-hidden="true">
                        <div
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }} />
                    </div>
                    <div
                        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                        aria-hidden="true">
                        <div
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }} />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="ml-0 max-w-2xl lg:mx-0">
                            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{companyData.companyname}</h2>
                            <div class="text-gray-400">
                                기업 블록체인 아이디 : <a id="companybcid">{companyData.bcid}</a>
                            </div>
                            <div className="hidden" id="companyId">{companyData.companyid}</div>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                {companyData.companydesc}
                            </p>
                        </div>
                        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                                {links.map((link) => (
                                    <a key={link.name} href={link.href} className="text-white">
                                        {link.name} <span aria-hidden="true">&rarr;</span>
                                    </a>
                                ))}
                            </div>
                            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 text-gray-300">현재 기부금</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white" id="priceD">{have}</dd>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <dt className="text-base leading-7 text-gray-300">목표 기부금</dt>
                                    <dd className="text-2xl font-bold leading-9 tracking-tight text-white">100</dd>
                                </div>
                                <div className="flex flex-col-reverse">
                                    <div className="text-base leading-7 text-gray-300">기업 키워드</div>
                                    <div className="text-2xl font-bold leading-9 tracking-tight text-white grid grid-cols-3">{tagprint(tagData[1])}</div>
                                </div>
                            </dl>
                        </div>
                        <button
                            type="button"
                            id="invest"
                            className="relative z-10 inline-flex items-center rounded-3 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">
                            투자 승인
                        </button>
                    </div>
                </div>
                <div id="page1">
                    <a id="report" class="smooth"></a>
                    <div className="relative isolate overflow-hidden py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl">ESG 보고서</h2>
                            <div className="overflow-hidden bg-white py-24 sm:py-32">
                                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                    <div className="mx-auto  max-w-2xl gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                                        <h2 className="text-base font-semibold leading-7 text-indigo-600">ESG</h2>
                                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">지속 가능 경영 보고서</p>
                                        <div class="text-gray-400">
                                            기업 NFT ID : <a>{companyData.contractaddr}</a>
                                        </div>
                                        <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                            {renderData}
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page2">
                    <a id="event" class="smooth"></a>
                    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                            <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)', }} />
                        </div>
                        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
                            <div ame="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)', }} />
                        </div>
                        <div className="relative isolate overflow-hidden py-24 sm:py-32">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">기업 행사</h2>
                                <div>
                                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                            {eventData.length > 0 ? (
                                                eventData.map((event, index) => (
                                                    <div className="group relative bg-white rounded-md">
                                                        <div className="aspect-h-1 aspect-w-1 w-full rounded-t-md overflow-hidden lg:aspect-none lg:h-80">
                                                            <img
                                                                src={"https://" + event[3] + S3URL + event[4]}
                                                                alt=".."
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                                                        </div>
                                                        <div className="flex justify-center mt-3">
                                                            <div>
                                                                <h3 className="text-sm text-gray-700">
                                                                    <a href={`/event/${companyId}/${event[0]}`}>
                                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                                        <div className='inline font-bold text-gray-900'>
                                                                            {event[1]}
                                                                        </div>
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div class="card shadow border-0 rounded-4 mb-5">
                                                    <p>기업 행사가 없습니다.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="page3">
                    <a id="comment" class="smooth"></a>
                    <div className="relative isolate overflow-hidden py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <h2 className="text-4xl font-bold tracking-tight text-black sm:text-6xl mb-5">응원 댓글</h2>
                            <ul role="list" className="divide-y  border-solid border-2 border-indigo-600 rounded-lg pr-6">
                                {commentArray.map((comment, id) => (
                                    <li key={id} className="commentText d-flex justify-between">
                                        <div className="commentMargin">
                                            <span className="commentLabel">{comment[2]}: </span>
                                            <span className="commentLabel commentDescLeftAlign">{comment[3]}</span>                        {/* css 적용 */}
                                        </div>
                                        <div className="commentMargin" style={{ marginRight: '15px' }}>
                                            <span className="commentLabel">{comment[4]}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </EthProviderInvest>
    )
};