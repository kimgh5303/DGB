import Nav from "./navhome";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverIP, S3URL } from "./axioses/config"
import { ScrollRemote } from './remote/remoteControll';

export default function Mypage() {
    if ((localStorage.getItem('userid') === null)) {
        alert('로그인이 필요합니다.');
        window.location.href = "/";
    }
    const [userData, setUserData] = useState("");
    const [FeedData, setFeedList] = useState([]);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("userid");
        const bcid = localStorage.getItem("userbcid");

        if (id) {
            const UserDetail = axios.get(serverIP + `/users/${id}`);
            const FeedList = axios.get(serverIP + `/feeds/users/${id}`);

            axios
                .all([UserDetail, FeedList])
                .then(axios.spread((userDetailResponse, FeedListResponse) => {
                    const userDeatilData = userDetailResponse.data.data;
                    const FeedListData = FeedListResponse.data.data;
                    setUserData(userDeatilData);
                    setFeedList(FeedListData);
                }))
                .catch((error) => {
                    console.log(error);
                });
        }

        if (bcid) {
            const donComList = axios.get(serverIP + `/transactions/donations/${bcid}`);
            axios
                .all([donComList])
                .then(axios.spread((donComListResponse) => {
                    const doncomList = donComListResponse.data.data;
                    if (Array.isArray(doncomList)) {
                        const updatedImageList = doncomList.map((data) => {
                            const imageInfo = {
                                id: data[0],
                                name: data[1],
                                bucketName: data[2],
                                imageName: data[3],
                                tagArray: data[4] && data[4] ? data[4].split('/') : [],
                                href: `company/${data[0]}`
                            };
                            return imageInfo;
                        });
                        setImageList(updatedImageList);
                    }
                }))
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, []);

    const link = (data) => {
        document.location.href = `/home/${data}`
    }

    const tagprint = (arr) => {
        return arr.map((tag, i) => (
            <span
                className="inline-flex w-full h-full items-center d-flex justify-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                key={i}
            >
                {tag}
            </span>
        ));
    }

    return (
        <div>
            <Nav />
            <ScrollRemote />
            <div className="container px-5 my-5">
                <div className="text-center mb-5">
                    <h1 className="display-5 fw-bolder mb-0"><span className="text-gradient d-inline">마이 페이지</span></h1>
                    <div className="text-gray-400">
                        유저 블록체인 아이디 : {userData && userData.bcid}
                    </div>
                </div>

                <div className="row gx-5 justify-content-center mb-4">
                    <div className="col-lg-11 col-xl-9 col-xxl-8">
                        <section>
                            <div className="card shadow border-0 rounded-4 mb-5">
                                <div className="card-body p-5">
                                    <div className="mb-0">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3"><i className="bi bi-code-slash"></i></div>
                                            <h3 className="fw-bolder mb-0"><span className="text-gradient d-inline">내 정보</span></h3>
                                        </div>
                                        <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100 mb-3">
                                            <h5>이름 : {userData && userData.username} </h5>
                                        </div>
                                        <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
                                            <h5>이메일 : {userData && userData.userid} </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bolder mb-"><span className="text-gradient d-inline">내 코인</span></h1>
                            </div>
                            <div className="card shadow border-0 rounded-4 mb-5">
                                <div className="card-body p-5">
                                    <div className="mb-0">
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 me-3"><i className="bi bi-code-slash"></i></div>
                                            <h3 className="fw-bolder mb-0"><span className="text-gradient d-inline">기부금 현황</span></h3>
                                        </div>
                                        <div className="d-flex align-items-center bg-light rounded-4 p-3 h-100">
                                            <h5>보유 기부금 : {userData.tokenvalue} don </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bolder mb-"><span className="text-gradient d-inline">기부한 기업 리스트</span></h1>
                            </div>
                            <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                <div className="card-body p-0 h-1/2">
                                    <div className="border-0 rounded-4 h-full w-full p-4 overflow-y-scroll">
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {imageList.map((product, index) => (
                                                <a onClick={e => link(product.href)} key={index}>
                                                    <div key={product.id}
                                                        className="group relative"
                                                    >
                                                        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                            <img
                                                                src={"https://" + product.bucketName + S3URL + product.imageName}
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                            />
                                                        </div>
                                                        <div className="mt-4 flex justify-between">
                                                            <div>
                                                                <h3 className="text-sm text-gray-700">

                                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                                    {product.name}

                                                                </h3>
                                                                <div className="grid gap-x-1 gap-y-4 grid-cols-3 w-full h-1/2 items-center">
                                                                    {tagprint(product.tagArray)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}