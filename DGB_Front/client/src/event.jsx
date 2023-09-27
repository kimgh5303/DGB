import Nav from "./navuser";
import axios from "axios";
import { useState, useEffect, useCallback, useContext, useId } from "react";
import { useParams } from "react-router-dom";
import { serverIP, S3URL } from "./axioses/config";
import { EthProviderEvent, EthContext } from "./contexts/EthContext";
import CustomModal from "./formComponent/ModalForm";

export default function Event() {
    return (
        <EthProviderEvent>
            <EventComponent />
        </EthProviderEvent>
    )
}

function EventComponent() {
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
    const { companyid, eventidx } = useParams();
    const [state, setState] = useState({
        mainImg: "",
        review: "",
        userId: "",
        userName: "",
        file: null,
        ModalOpen: false,
        eventData: [],
        reviewArray: [],
    });
    const { mainImg, review, userId, userName, file, ModalOpen, eventData, reviewArray } = state;

    const change = useCallback(e => {
        setState(prevState => ({ ...prevState, review: e.target.value }))
    });

    useEffect(() => {
        const id = localStorage.getItem("userid");
        const name = localStorage.getItem("username");
        setState(prevState => ({
            ...prevState,
            userId: id,
            userName: name,
        }));

        const fetches = [
            fetchData(`events/${companyid}/${eventidx}`),
            fetchData(`reviews/${eventidx}`),
        ]

        Promise
            .all(fetches)
            .then(axios.spread((eventListResopnse, reviewListResponse) => {
                setState(prevState => ({
                    ...prevState,
                    eventData: eventListResopnse.data.data[0],
                    reviewArray: reviewListResponse.data.data
                }));
            }))
            .catch((error) => { console.log(error); });
    }, [companyid, eventidx]);

    const setPreviewImg = (e) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            setState(prevState => ({
                ...prevState,
                mainImg: e.target.result,
            }));
        };
        reader.readAsDataURL(e.target.files[0]);
        setState(prevState => ({ ...prevState, file: e.target.files[0] }))
    }
    const { Code, setCode } = useContext(EthContext)

    useEffect(() => {
        Submit();
    }, [Code])

    const Submit = () => {
        if (Code === 1) {
            const formData = new FormData();
            formData.append('eventidx', eventidx);
            formData.append('userid', userId);
            formData.append('reviewdesc', review);
            formData.append('companyid', companyid);
            formData.append('multipartFile', file);
            formData.append('username', userName);

            axios
                .post(serverIP + "/reviews", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => {
                    setState(prevState => ({ ...prevState, review: '', ModalOpen: false }))
                    setCode(0);
                    document.location.href = `/event/${companyid}/${eventidx}`;
                })
                .catch(error => { console.error(error); alert(2); setCode(200) });
        } else if (Code === 0) {
            return;
        } else {
            setState(prevState => ({ ...prevState, review: '', ModalOpen: false }))
            alert(`트랜잭션 처리 실패\nError Code : ${Code}`);
            document.location.href = `/event/${companyid}/${eventidx}`;
            setCode(0);
        }
    };

    return (
        <div>
            <Nav />
            <section className="py-5 h-auto">
                <div className="container px-5 mb-5 text-center">
                    <div className="mb-5">
                        <h1 className="display-5 fw-bolder mb-0">
                            <span className="text-gradient d-inline">행사 소개</span>
                        </h1>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-11 col-xl-9 col-xxl-8">
                            <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                <div className="card-body p-0 h-80">
                                    <div className="d-flex justify-between w-full h-full">
                                        <div className="p-5 grid grid-rows-3 w-full">
                                            <h2 className="fw-bolder d-flex justify-start">{eventData[1]}</h2>
                                            <p className="d-flex justify-start">{eventData[2]}</p>
                                        </div>
                                        <img className="img-fluid w-80" src={"https://" + eventData[3] + S3URL + eventData[4]} alt="..." />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h1 className="display-5 fw-bolder mb-5">
                                    <span className="text-gradient d-inline">
                                        행사 리뷰
                                    </span>
                                </h1>
                            </div>
                            <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                <div className="card-body p-0 h-auto">
                                    <div className="border-0 rounded-4 h-auto w-full p-4">
                                        <div className="h-96 overflow-y-scroll">
                                            {reviewArray.map((review, id) => (
                                                <li key={id} className="reviewText d-flex justify-between bg-light rounded-4 p-3 mb-3 mr-3">
                                                    <div className="reviewMargin w-1/4">

                                                        <span className="reviewNameBold">{review[0]}: </span>
                                                        <span className="commentLabel commentDescLeftAlign">{review[1]}</span>
                                                    </div>
                                                    <div className="commentMargin">
                                                        <span className="commentLabel">{review[2]}</span>
                                                    </div>
                                                    <div className="reviewStart w-48">
                                                        <img src={"https://" + review[3] + S3URL + review[4]} className=" float-right"></img>
                                                    </div>
                                                </li>
                                            ))}
                                        </div>
                                        <div className="col-span-full">
                                            <div className="mt-2 flex justify-center rounded-lg border border-gray-900/25 w-1/2">
                                                <div className="text-center">
                                                    <img src={mainImg} className="w-80"></img>
                                                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span className="">파일 선택</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={setPreviewImg} />
                                                        </label>
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full d-flex justify-center pt-3 ">
                                            <div className="reviewContainer w-full">
                                                <form className="reviewWrap d-flex justify-between" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    console.log('data : ' + eventidx + ", " + userId + ", " + review + ',' + companyid + ', ' + userName)
                                                    if (!JSON.parse(localStorage.getItem('userpermission'))) {
                                                        alert('접근 권한이 없습니다.\n관리자에게 문의해주세요.')
                                                        return;
                                                    }

                                                    if (review === '') {
                                                        return;
                                                    }

                                                    if (!file) {
                                                        alert("사진을 선택해주세요.");
                                                        return;
                                                    }
                                                    setState(prevState => ({
                                                        ...prevState,
                                                        ModalOpen: true
                                                    }))
                                                }}>
                                                    <input
                                                        type="text"
                                                        placeholder="리뷰달기..."
                                                        value={review}
                                                        onChange={change}
                                                        className="w-3/4" />
                                                    <div className="hidden" id="companyId">{companyid}</div>
                                                    <div className="hidden" id="eventIdx">{eventidx}</div>
                                                    <button type="submit" className="commetBtn btn btn-primary px-4 py-2 ml-3" id="review">게시</button>
                                                    <CustomModal
                                                        openHandle={ModalOpen}
                                                        closeFunc={setState}
                                                        Text={`블록체인 트랜잭션 처리중입니다.\n잠시만 기다려주세요.\n(5~10초 정도 소요됩니다)`} />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
