import axios from "axios";
import CustomModal from "./formComponent/ModalForm";
import NewUserList from "./formComponent/newUserList";
import React, { useCallback, useEffect, useState } from "react";
import { serverIP, S3URL } from "./axioses/config";
import { EthProviderManage, EthContext } from "./contexts/EthContext";
import { useContext } from "react";


export default function Managemain() {
    return (
        <EthProviderManage>
            <ManagemainForm />
        </EthProviderManage>
    )
}

function ManagemainForm() {
    const {Code, setCode} = useContext(EthContext);
    const [state, setState] = useState({
        searchTerm: '',
        value1: '',
        value2: '',
        havedon: 50,
        totaldon: 100,
        FeedData: [],
        imageList: [],
        ModalOpen: false,
    })
    const { imageList, FeedData, searchTerm, totaldon, havedon, value1, value2, ModalOpen } = state;

    const handleCustom = useCallback((e) => {
        setState(prevState => ({ ...prevState, value1: e.target.value }));
    }, []);
    
    const handleValue = useCallback((e) => {
        setState(prevState => ({ ...prevState, value2 : e.target.value}))
    }, []);

    const handleHavedon = (event, value) => {
        if (value === ''){
            alert('값을 입력 해주세요.');
            return;
        }
        value = parseInt(value, 10);

        if (value > havedon) {
            value = havedon;
            alert("현재 보유 코인양 보다 감소시킬 수 없습니다.")
            return;
        }

        const config = {
            0 : {
                path : "/admins/plus",
                name : 'plusnum'
            },
            1 : {
                path : "/admins/minus",
                name : 'minusnum'
            }
        }

        const formData = new FormData();
        formData.append(config[event].name, value);

        setState(prevState => ({
            ...prevState,
            havedon: prevState.havedon + value,
            totaldon: prevState.totaldon + value,
            value1: ''
        }))
        axios
            .post(serverIP + config[event].path, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .catch(error => { console.error(error); });
    };

    const handleSearch = () => {
        if (searchTerm === "") {
            return imageList;
        } else {
            return imageList.filter((product) => {
                const includesName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                const includesTag = product.tagArray.some((tag) =>
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                );
                return includesName || includesTag;
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const [companyListResponse, tagListResponse, feedListResponse, adminDataResponse, totalTokenResponse] =
                await axios.all([
                    axios.get(serverIP + '/companies'),
                    axios.get(serverIP + '/tags'),
                    axios.get(serverIP + '/feeds/admins'),
                    axios.get(serverIP + '/admins'),
                    axios.get(serverIP + '/admins/totals'),
                ]);

            setState(prevState => ({
                ...prevState,
                FeedData: feedListResponse.data.data,
                havedon: adminDataResponse.data.data,
                totaldon: totalTokenResponse.data.data
            }));

            const companyListData = companyListResponse.data.data;
            const tagListData = tagListResponse.data.data;

            if (Array.isArray(companyListData) && Array.isArray(tagListData)) {
                const updatedImageList = companyListData.map((data, index) => {
                    const imageInfo = {
                        id: data[0],
                        name: data[1],
                        bucketName: data[2],
                        imageName: data[3],
                        tagArray: tagListData[index] && tagListData[index][1] ? tagListData[index][1].split('/') : [],
                        tokenvalue: data[4],
                        href: `managemain/${data[0]}`
                    };

                    return imageInfo;
                });

                setState(prevState => ({
                    ...prevState,
                    imageList: updatedImageList
                }));
            };
        };

        fetchData();
        handleSearch();
    }, [searchTerm, imageList]);

    const tagprint = (arr) => {
        return arr.map((tag, index) => (
            <span
                className="inline-flex w-full h-full items-center d-flex justify-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                key={index}
            >
                {tag}
            </span>
        ));
    };

    useEffect(() => {
        Submit();
    }, [Code])

    const Submit = () =>{
        if (Code === 1){
            
            setCode(0);
        } else if (Code === 0) {
            return;
        } else {
            alert(`트랜잭션 처리 실패\nError Code : ${Code}`);
            document.location.href = '/managemain';
        }
        setState(prevState => ({ ...prevState, review: '', ModalOpen : false }))
    }

    return (
        <div>
            <CustomModal
                openHandle={ModalOpen}
                closeFunc={setState}
                Text={`블록체인 트랜잭션 처리중입니다.\n잠시만 기다려주세요.\n(5~10초 정도 소요됩니다)`} />
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow z-10">
                <div className="container px-5">
                    <a className="navbar-brand" href="/">
                        <span className="fw-bolder text-primary">ESGSE</span>
                    </a>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                        <li className="nav-item">
                            <a className="nav-link" href="/managemain">관리자 페이지</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="bg-white">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl px-4 pt-4 pb-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="mb-3 grid grid-cols-2">
                            <div>
                                <div className="d-flex justify-between">
                                    <h2 className="text-4xl font-bold tracking-tight">보유 코인</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-1 mr-3">
                                    <div>
                                        보유 코인
                                        <div className="card p-3 mb-3">
                                            <p className="text-indigo-600 fw-bolder m-0" id="balance">{havedon} don</p>
                                        </div>
                                    </div>
                                    <div>
                                        전체 코인
                                        <div className="card p-3 mb-3">
                                            <p className="text-indigo-600 fw-bolder m-0" id="total">{totaldon} don</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex justify-between">
                                    <h2 className="text-4xl font-bold tracking-tight">전체 코인양 조절</h2>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setState(prevState => ({
                                        ...prevState,
                                        ModalOpen: true
                                        }))
                                    }}>
                                    <div className="grid grid-cols-3 mb-3 place-content-center">
                                        <input
                                            name="price"
                                            value={value1}
                                            id="priceID"
                                            onChange={handleCustom}
                                            className="border-0 mx-3 w-1/8 pl-3 text-gray-900 ring-2 ring-inset ring-indigo-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 h-full rounded-md text-xl"
                                            placeholder="0" />
                                        <button
                                            onClick={() => {handleHavedon(0, value1)}}
                                            className="flex mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            id="increase">
                                            증가
                                        </button>
                                        <button
                                            onClick={() => {handleHavedon(1, value1);}}
                                            className="flex mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            id="decrease">
                                            감소
                                        </button>
                                    </div>
                                    <div className="d-flex justify-between">
                                        <h2 className="text-4xl font-bold tracking-tight">악용 고객 코인 회수</h2>
                                    </div>
                                    <div className="grid grid-cols-3 place-content-center">
                                        <input
                                            type="number"
                                            name="price"
                                            value={value2}
                                            onChange={handleValue}
                                            id="priceC"
                                            className="border-0 mx-3 w-1/8 pl-3 text-gray-900 ring-2 ring-inset ring-indigo-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 h-full rounded-md text-xl"
                                            placeholder="0" />
                                        <input
                                            type="text"
                                            name="bcid"
                                            id="companyId"
                                            className="border-0 mx-3 w-1/8 pl-3 text-gray-900 ring-2 ring-inset ring-indigo-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 h-full rounded-md text-xl"
                                            placeholder="블록체인 ID" />
                                        <button
                                            type="submit"
                                            className="flex mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            id="confiscate">
                                            몰수
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div>
                                <div className="d-flex justify-between">
                                    <h2 className="text-4xl font-bold tracking-tight">관리자 피드</h2>
                                </div>
                                <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                                    <div className="card-body p-0 h-80">
                                        <div className="border-0 rounded-4 h-full w-full p-4 overflow-y-scroll">
                                            {FeedData.map((feed) => (
                                                <div
                                                    className="flex justify-between border-solid border-2 border-indigo-600 px-3 py-3 mb-2 rounded-md"
                                                    key={feed.time}
                                                >
                                                    <div className="w-3/5">
                                                        <p className="text-secondary fw-bolder m-0">{
                                                            feed.content.slice(0, -7)
                                                        }</p>
                                                        <p className="text-secondary fw-bolder m-0">
                                                            {feed.content.slice(-7)}
                                                        </p>
                                                    </div>
                                                    <div className="commentMargin" style={{ marginRight: '15px' }}>
                                                        <span className="commentLabel">{feed.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NewUserList />
                        <div className="d-flex justify-between">
                            <h2 className="text-4xl font-bold tracking-tight">기업 리스트</h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="검색어를 입력하세요"
                                    className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-600"
                                    value={searchTerm}
                                    onChange={(e) => setState(prevState => ({ ...prevState, searchTerm: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {handleSearch().map((product, index) => (
                                <a href={product.href} key={index}>
                                    <div key={product.id} className="group relative">
                                        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img
                                                src={"https://" + product.bucketName + S3URL + product.imageName}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between w-auto">
                                            <div className="w-full">
                                                <h3 className="text-sm text-gray-700">

                                                    <div className="flex justify-between">
                                                        <div>
                                                            {product.name}
                                                        </div>
                                                        <div className="text-indigo-600 fw-bolder">
                                                            금액 달성률 : {product.tokenvalue}%
                                                        </div>
                                                    </div>
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
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
