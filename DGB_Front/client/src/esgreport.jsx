/* eslint-disable */
import Nav from "./navcompany";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EthProviderMint } from "./contexts/EthContext";
import { serverIP, S3URL } from "./axioses/config";
import ChartComponent from './ChartComponent';


export default function Esgreport() {
    const [companyId, setCompanyId] = useState("");
    const [url, setUrl] = useState("");
    const [chartData, setChartData] = useState(null);
    const [data, setData] = useState([]);

    const fetchReport = () => {
        axios.post(serverIP + "/reports/downloads", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                const splitData = res.data.data[0].split(',');
                setUrl("https://" + splitData[0] + S3URL + splitData[1]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const companyid = localStorage.getItem("companyid");

        setCompanyId(companyid);
        axios
            .get(serverIP + `/companies/${companyid}`)
            .then((res) => {
                setData(
                    {
                        "contractaddr": res.data.data.contractaddr,
                        "reportid": 0,
                    }
                );
            })
            .catch((e) => { console.log('error : ' + e) });
    }, []);

    useEffect(() => {
        if (data.contractaddr) {
            fetchReport();
        }
        const companyid = localStorage.getItem("chartcomId");
        axios.get(serverIP + `/reports/${companyid}`)
            .then((res) => {
                setChartData(res.data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [data]);

    const handleDownload = () => {
        const downbload = document.createElement('a');
        downbload.href = url;
        downbload.setAttribute('download', 'ESG경영_보고서');
        downbload.click();
    };

    return (
        <EthProviderMint>
            <div>
                <Nav />
                <div className="hidden" id="s3url">{url}</div>
                <div className="hidden" id="companyId">{companyId}</div>
                <div class="container px-5 my-5">
                    <div className="p-3 shadow rounded-4 border-solid border-2 border-indigo-600">
                        <h2>보고서 ESG 점수</h2>
                        {chartData != null && chartData.length > 0 && (() => {
                            let scores = chartData[0];
                            if (scores) {
                                let escores = scores[5];
                                let sscores = scores[6];
                                let gscores = scores[7];
                                return (
                                    <div key={0}>
                                        <ChartComponent escores={escores} sscores={sscores} gscores={gscores} />
                                    </div>
                                );
                            }
                        })()}
                    </div>
                    <button
                        onClick={handleDownload}
                        id="check"
                        className=" rounded-md relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-3">
                        보고서 다운로드
                    </button>
                    <button
                        id="mint"
                        className=" rounded-md relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-3 mr-3">
                        보고서 승인하기
                    </button>
                </div>
            </div>
        </EthProviderMint>
    );
}