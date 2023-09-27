import './App.css';
import { useEffect } from 'react';
import {GifComponent} from './gifcomponent';
import earthGif from './imgfile/earth.gif';

export default function App() {
    const isMetaMaskInstalled = () => typeof window.ethereum !== 'undefined';

    useEffect(() => {
        localStorage.clear();
    })

    if (!isMetaMaskInstalled()) {
        return (
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <div className="mx-auto max-w-xl  text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                메타마스크 설치가 필요합니다.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                아래 버튼을 통해 메타마스크를 설치해 주세요.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-center">
                                <div className='text-white'>→</div>
                                <a
                                    href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    다운로드
                                </a>
                                <div className='text-white'>←</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    } else {
        return (
            <div id="App">
                <div className='overflow-y-hidden'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow">
                        <div className="container px-5">
                            <a className="navbar-brand" href="">
                                <span className="fw-bolder text-primary">ESGSE</span>
                            </a>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                                <li className="nav-item">
                                    <a className="nav-link" href="/managemain">관리자 페이지</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <header className="py-5">
                        <div className="container px-5 pb-5">
                            <div className="row gx-5 align-items-center">
                                <div className="col-xxl-5">
                                    <div className="text-center text-xxl-start ml-5">
                                        <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                                            <div className="text-uppercase">환경 (Environment) &middot; 사회 (Social) &middot; 지배구조 (Governance)</div>
                                        </div>
                                        <div className="fs-3 fw-light text-muted">ESG를 알고 실천하자!</div>
                                        <h1 className="display-3 fw-bolder mb-5">
                                            <span className="text-gradient d-inline">너, 나, 우리 <br />다함께 ESG</span>
                                        </h1>
                                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                            <a className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" href="/logincompany">기업 로그인 하기</a>
                                            <a className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" href="/loginuser">개인 로그인 하기</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 w-auto">
                                    <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                                        <div className="profile  flex justify-center items-center">
                                            <GifComponent gif={earthGif} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}