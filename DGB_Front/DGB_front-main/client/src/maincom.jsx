import React, { useEffect, useState } from "react";
import Nav from "./navuser";
import axios from "axios";
import { serverIP, S3URL } from "./axioses/config";

export default function Maincom() {
    if (localStorage.getItem('userid') === null){
        alert('로그인이 필요합니다.');
        window.location.href="/";
    }
    const [imageList, setImageList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const CompanyList = axios.get(serverIP + "/companies");
        const TagList = axios.get(serverIP + "/tags");

        axios
            .all([CompanyList, TagList])
            .then(axios.spread((companyListResponse, tagListResponse) => {
                const companyListData = companyListResponse.data.data;
                const tagListData = tagListResponse.data.data;

                if (Array.isArray(companyListData) && Array.isArray(tagListData)) {
                    const updatedImageList = companyListData.map((data, index) => {
                        const imageInfo = {
                            id: data[0],
                            name: data[1],
                            bucketName: data[2],
                            imageName: data[3],
                            tagArray: tagListData[index] && tagListData[index][1] ? tagListData[index][1].split("/") : [],
                            href: `home/company/${data[0]}`,
                        };
                        return imageInfo;
                    });

                    setImageList(updatedImageList);
                }
            }))
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const tagprint = (arr) => {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(
                <span className="inline-flex w-full h-full items-center d-flex justify-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10" key={i}>
                    {arr[i]}
                </span>
            );
        }
        return result;
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
    return (
        <div>
            <Nav />
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 pt-4 pb-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">기업 리스트</h2>
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {handleSearch().map((product) => (
                            <div key={product.id} className="group relative">
                                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={"https://" + product.bucketName + S3URL + product.imageName}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        alt={product.name}
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <a href={product.href}>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.name}
                                            </a>
                                        </h3>
                                        <div className="grid gap-x-1 gap-y-4 grid-cols-3 w-full h-1/2 items-center">
                                            {tagprint(product.tagArray)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};