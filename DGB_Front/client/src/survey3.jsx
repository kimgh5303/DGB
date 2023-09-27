import Nav from "./navcompany";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import CustomModal from "./formComponent/ModalForm";
import { ScrollRemote } from "./remote/remoteControll";

export default function Survey3() {
    const handleOptionChange = (questionIndex, event) => {
        const value = event.target.value;
        setSelectedOption(questionIndex, value);
    };

    const numberOfQuestions = 25; // 질문의 총 개수

    // 초기값 설정
    const initialOption = '1';

    const [selectedOptions, setSelectedOptions] = useState(
        Array(numberOfQuestions).fill(initialOption)
    );

    // 선택된 옵션들을 저장할 배열
    const setSelectedOption = (questionIndex, value) => {
        setSelectedOptions((prevOptions) => {
            const newOptions = [...prevOptions];
            newOptions[questionIndex] = value;
            return newOptions;
        });
    };
    // 선택된 옵션을 변경하는 함수
    //8,12,15
    const initialOptioncheckQ8 = [];
    const initialOptioncheckQ12 = [];
    const initialOptioncheckQ15 = [];

    const [selectedOptionsQ8, setSelectedOptionsQ8] = useState(Array(5).fill([...initialOptioncheckQ8]));
    const [selectedOptionsQ12, setSelectedOptionsQ12] = useState(Array(5).fill([...initialOptioncheckQ12]));
    const [selectedOptionsQ15, setSelectedOptionsQ15] = useState(Array(5).fill([...initialOptioncheckQ15]));


    useEffect(() => {
        setSelectedOptionsQ8(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
        setSelectedOptionsQ12(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
        setSelectedOptionsQ15(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);

    const handleOptionChangecheck = (questionIndex, event, questionType) => {
        const value = event.target.value;

        if (questionType === "Q8") {
            setSelectedOptionsQ8((prevOptions) => {
                const newOptions = [...prevOptions];
                const isChecked = event.target.checked;
                if (isChecked) {
                    // 선택된 값인 경우 추가
                    if (!newOptions[questionIndex].includes(value)) {
                        newOptions[questionIndex] = [...newOptions[questionIndex], value];
                    }
                } else {
                    // 선택 해제된 값인 경우 제거
                    newOptions[questionIndex] = newOptions[questionIndex].filter(
                        (option) => option !== value
                    );
                }

                // 최소 하나 이상의 체크 박스가 선택되었는지 확인
                const isAtLeastOneChecked = newOptions.some((options) => options.length > 0);

                // 모든 체크 박스가 체크 해제된 경우 선택된 체크 박스를 다시 체크
                if (!isAtLeastOneChecked) {
                    newOptions[questionIndex] = [value];
                }
                return newOptions;
            });
        }
        else if (questionType === "Q12") {
            setSelectedOptionsQ12((prevOptions) => {
                const newOptions = [...prevOptions];
                const isChecked = event.target.checked;
                if (isChecked) {
                    // 선택된 값인 경우 추가
                    if (!newOptions[questionIndex].includes(value)) {
                        newOptions[questionIndex] = [...newOptions[questionIndex], value];
                    }
                } else {
                    // 선택 해제된 값인 경우 제거
                    newOptions[questionIndex] = newOptions[questionIndex].filter(
                        (option) => option !== value
                    );
                }

                // 최소 하나 이상의 체크 박스가 선택되었는지 확인
                const isAtLeastOneChecked = newOptions.some((options) => options.length > 0);

                // 모든 체크 박스가 체크 해제된 경우 선택된 체크 박스를 다시 체크
                if (!isAtLeastOneChecked) {
                    newOptions[questionIndex] = [value];
                }
                return newOptions;
            });
        }
        else if (questionType === "Q15") {
            setSelectedOptionsQ15((prevOptions) => {
                const newOptions = [...prevOptions];
                const isChecked = event.target.checked;
                if (isChecked) {
                    // 선택된 값인 경우 추가
                    if (!newOptions[questionIndex].includes(value)) {
                        newOptions[questionIndex] = [...newOptions[questionIndex], value];
                    }
                } else {
                    // 선택 해제된 값인 경우 제거
                    newOptions[questionIndex] = newOptions[questionIndex].filter(
                        (option) => option !== value
                    );
                }

                // 최소 하나 이상의 체크 박스가 선택되었는지 확인
                const isAtLeastOneChecked = newOptions.some((options) => options.length > 0);

                // 모든 체크 박스가 체크 해제된 경우 선택된 체크 박스를 다시 체크
                if (!isAtLeastOneChecked) {
                    newOptions[questionIndex] = [value];
                }
                return newOptions;
            });
        }
    };

    const jsonData = {
        G: {
            Q1: [selectedOptions[0], selectedOptions[1]],
            Q2: [selectedOptions[2]],
            Q3: [selectedOptions[3]],
            Q4: [selectedOptions[4]],
            Q5: [selectedOptions[5]],
            Q6: [selectedOptions[6]],
            Q7: [selectedOptions[7]],
            Q8: selectedOptionsQ12.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q9: [selectedOptions[9]],
            Q10: [selectedOptions[10]],
            Q11: selectedOptionsQ12.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q12: [selectedOptions[13], selectedOptions[14], selectedOptions[15]],
            Q13: [selectedOptions[16]],
            Q14: selectedOptionsQ15.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q15: [selectedOptions[18]],
            Q16: [selectedOptions[19]],
            Q17: [selectedOptions[20]],
        },
    };
    const jsonString = JSON.stringify(jsonData, (key, value) => {
        if (Array.isArray(value)) {
            // 배열인 경우 null 값을 제거하고 값이 있는 요소만 필터링
            const filteredArray = value.filter((item) => item !== null && item.length > 0);
            if (filteredArray.length > 0) {
                return filteredArray;
            }
        }
        return value;
    });

    localStorage.setItem('jsonG', jsonString);

    const JsonE = localStorage.getItem('jsonE');
    const JsonS = localStorage.getItem('jsonS');
    const JsonG = localStorage.getItem('jsonG');
    const id = { ID: localStorage.getItem('companyid') };


    const result = JSON.stringify(Object.assign(id, JSON.parse(JsonE), JSON.parse(JsonS), JSON.parse(JsonG)));

    const [ModalOpen, SetModalOpen] = useState(false);
    const [state, setState] = useState({
        ModalOpen : false,
})
    
    const [res, SetRes] = useState(null);
    

    const onClickJson = () => {
        SetModalOpen(true);
        axios
            .post("http://121.151.97.86:5000/getPDF", result, {
                headers: {
                    "Content-Type": `application/json`,
                }
            })
            .then(response => {
                SetModalOpen(false);
                SetRes(response.data.code)
                if (response.data.code === true) {
                    document.location.href = '/esgreport'
                }
            })
            .catch((error) => {
                console.log(error);
                SetModalOpen(false);
            });

    }

    return (
        <div>
            <Nav />
            <ScrollRemote/>
            <div class="container px-5 my-5">
                <div className="fw-bolder text-3xl mb-3">
                    ESG-G(Governance)
                </div>
                <div className="border-b">
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q1.</h3>
                        <p>이사회 또는 산하 위원회 활동 내역 중 ESG 안건을 보고/심의/의결하였는지, 이사회 또는 산하 위원회 운영규정 상 ‘권한과 역할’에 ESG 관련 항목이 명시되어 있습니까?</p>
                        <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                            <ui><input type="radio" name="1" value="1" defaultChecked={selectedOptions[0] === "1"} onChange={(event) => handleOptionChange(0, event)} />이사회 또는 산하 위원회에서 ESG 관련 안건을 다루고 있지 않다.</ui>
                            <ui><input type="radio" name="1" value="2" checked={selectedOptions[0] === "2"} onChange={(event) => handleOptionChange(0, event)} />최근 1년간 ESG 관련 안건이 모두 ‘보고’ 사항이다.</ui>
                            <ui><input type="radio" name="1" value="3" checked={selectedOptions[0] === "3"} onChange={(event) => handleOptionChange(0, event)} />최근 1년간 ESG 관련 안건 중 ‘심의/의결’ 사항이 있다.</ui>
                        </div>
                        <div className="grid gap-3 grid-rows-3 w-full mt-3">
                            <ui><input type="radio" name="1-1" value="1" defaultChecked={selectedOptions[1] === "1"} onChange={(event) => handleOptionChange(1, event)} />이사회 또는 산하 위원회 운영규정에 ESG 관련 사항을 명시하지 않았다.</ui>
                            <ui><input type="radio" name="1-1" value="2" checked={selectedOptions[1] === "2"} onChange={(event) => handleOptionChange(1, event)} />이사회 또는 산하 위원회 운영규정에 ‘ESG’라는 단어만 기재하고 있다.</ui>
                            <ui><input type="radio" name="1-1" value="3" checked={selectedOptions[1] === "3"} onChange={(event) => handleOptionChange(1, event)} />이사회 또는 산하 위원회 운영규정에 ESG 이외에, 조직과 관련된 중요 ESG 이슈 또는 안건을 명시하고 있다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q2.</h3>
                        <p>조직과 독립적인 사외이사 비율은 어느정도 입니까?</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="2" value="1" defaultChecked={selectedOptions[2] === "1"} onChange={(event) => handleOptionChange(2, event)} />총원의 과반수로 구성되었으나, 사외이사가 3인 이하이다.</ui>
                            <ui><input type="radio" name="2" value="2" checked={selectedOptions[2] === "2"} onChange={(event) => handleOptionChange(2, event)} />3인 이상, 이사 총원의 과반수를 차지하고 있으나, 전체 이사 중 60% 미만이다.</ui>
                            <ui><input type="radio" name="2" value="3" checked={selectedOptions[2] === "3"} onChange={(event) => handleOptionChange(2, event)} />3인 이상, 이사 총원의 과반수를 차지, 전체 이사 중 60% 이상 ~ 70% 미만이다.</ui>
                            <ui><input type="radio" name="2" value="4" checked={selectedOptions[2] === "4"} onChange={(event) => handleOptionChange(2, event)} />3인 이상, 이사 총원의 과반수를 차지, 전체 이사 중 70% 이상 ~ 80% 미만이다.</ui>
                            <ui><input type="radio" name="2" value="5" checked={selectedOptions[2] === "5"} onChange={(event) => handleOptionChange(2, event)} />3인 이상, 이사 총원의 과반수를 차지, 전체 이사 중 80% 이상 이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q3.</h3>
                        <p>이사회 의장이 대표이사와 분리되어 있습니까?</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="3" value="1" defaultChecked={selectedOptions[3] === "1"} onChange={(event) => handleOptionChange(3, event)} />현재 대표이사와 이사회 의장이 동일하다.</ui>
                            <ui><input type="radio" name="3" value="2" checked={selectedOptions[3] === "2"} onChange={(event) => handleOptionChange(3, event)} />과거 대표이사 또는 이사회 의장을 역임했던 자가 현재 이사회 의장이다.</ui>
                            <ui><input type="radio" name="3" value="3" checked={selectedOptions[3] === "3"} onChange={(event) => handleOptionChange(3, event)} />현재 이사회 의장이 과거 또는 현재의 대표이사나 이사회 의장을 역임하지 않았으나, 모회사 또는 자회사의 임원 등 독립성이 결여된 자가 이사회 의장이다.</ui>
                            <ui><input type="radio" name="3" value="4" checked={selectedOptions[3] === "4"} onChange={(event) => handleOptionChange(3, event)} />과거 또는 현재 대표이사이거나, 이사회 의장을 역임하였거나, 독립성이 결여된 자가 현재 이사회 의장인 경우. 단, 이사회 의장과 이해관계 상충하는 안건 등에 있어, 이사회 의장 역할을 대신하는 ‘선임사외이사’를 임명하고 있다.</ui>
                            <ui><input type="radio" name="3" value="5" checked={selectedOptions[3] === "5"} onChange={(event) => handleOptionChange(3, event)} />과거 또는 현재 대표이사이거나, 이사회 의장을 역임한 적이 없으며, 회사로부터 독립성이 확보된 이사가 현재 이사회의 의장이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q4.</h3>
                        <p>이사회 구성원 전체 대비 여성 이사 비율이 충분히 높은 수준 입니까?</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="4" value="1" defaultChecked={selectedOptions[4] === "1"} onChange={(event) => handleOptionChange(4, event)} />이사회 내 여성 이사가 선임되어 있지 않다.</ui>
                            <ui><input type="radio" name="4" value="2" checked={selectedOptions[4] === "2"} onChange={(event) => handleOptionChange(4, event)} />이사회 내 여성 이사가 1명만 선임되어 있다.</ui>
                            <ui><input type="radio" name="4" value="3" checked={selectedOptions[4] === "3"} onChange={(event) => handleOptionChange(4, event)} />이사회 내 여성 이사가 2명 이상이며, 그 비율이 10% 이상 ~ 20% 미만이다.</ui>
                            <ui><input type="radio" name="4" value="4" checked={selectedOptions[4] === "4"} onChange={(event) => handleOptionChange(4, event)} />이사회 내 여성 이사가 2명 이상이며, 그 비율이 20% 이상 ~ 30% 미만이다.</ui>
                            <ui><input type="radio" name="4" value="5" checked={selectedOptions[4] === "5"} onChange={(event) => handleOptionChange(4, event)} />이사회 내 여성 이사가 2명 이상이며, 그 비율이 30% 이상이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q5.</h3>
                        <p>한국표준산업분류의 대분류(2자리 코드) 기준 동종산업에서 업무경험을 보유한 사외이사 비율은 어느정도 입니까?</p>
                        <div className="grid gap-3 grid-rows-3 w-full">
                            <ui><input type="radio" name="5" value="1" defaultChecked={selectedOptions[5] === "1"} onChange={(event) => handleOptionChange(5, event)} />동종산업 경력을 보유한 사외이사가 없다.</ui>
                            <ui><input type="radio" name="5" value="2" checked={selectedOptions[5] === "2"} onChange={(event) => handleOptionChange(5, event)} />동종산업 경력을 보유한 사외이사가 1명 이상이다.</ui>
                            <ui><input type="radio" name="5" value="3" checked={selectedOptions[5] === "3"} onChange={(event) => handleOptionChange(5, event)} />동종산업 경력을 보유한 사외이사가 50% 이상이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q6.</h3>
                        <p>직전 회계연도에 개최한 이사회에 대해, 개별 이사의 참석률은 평균적으로 어느정도 입니까?</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="6" value="1" defaultChecked={selectedOptions[6] === "1"} onChange={(event) => handleOptionChange(6, event)} />이사회 구성원 평균 출석률이 75% 미만이다.</ui>
                            <ui><input type="radio" name="6" value="2" checked={selectedOptions[6] === "2"} onChange={(event) => handleOptionChange(6, event)} />이사회 구성원 평균 출석률이 75% 이상 85% 미만이다.</ui>
                            <ui><input type="radio" name="6" value="3" checked={selectedOptions[6] === "3"} onChange={(event) => handleOptionChange(6, event)} />이사회 구성원 평균 출석률이 85% 이상 90% 미만이다.</ui>
                            <ui><input type="radio" name="6" value="4" checked={selectedOptions[6] === "4"} onChange={(event) => handleOptionChange(6, event)} />이사회 구성원 평균 출석률이 90% 이상 95% 미만이다.</ui>
                            <ui><input type="radio" name="6" value="5" checked={selectedOptions[6] === "5"} onChange={(event) => handleOptionChange(6, event)} />이사회 구성원 평균 출석률이 95% 이상이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q7.</h3>
                        <p>직전 회계연도에 개최한 이사회에 대해, 개별 사내이사의 참석률은 평균적으로 어느정도 입니까?</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="7" value="1" defaultChecked={selectedOptions[7] === "1"} onChange={(event) => handleOptionChange(7, event)} />사내이사 평균 출석률이 75% 미만이다.</ui>
                            <ui><input type="radio" name="7" value="2" checked={selectedOptions[7] === "2"} onChange={(event) => handleOptionChange(7, event)} />사내이사 평균 출석률이 75% 이상 85% 미만이다.</ui>
                            <ui><input type="radio" name="7" value="3" checked={selectedOptions[7] === "3"} onChange={(event) => handleOptionChange(7, event)} />사내이사 평균 출석률이 85% 이상 90% 미만이다.</ui>
                            <ui><input type="radio" name="7" value="4" checked={selectedOptions[7] === "4"} onChange={(event) => handleOptionChange(7, event)} />사내이사 평균 출석률이 90% 이상 95% 미만이다.</ui>
                            <ui><input type="radio" name="7" value="5" checked={selectedOptions[7] === "5"} onChange={(event) => handleOptionChange(7, event)} />사내이사 평균 출석률이 95% 이상이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q8.</h3>
                        <p>이사회 산하 위원회가 다음의 요건에 따라 체계적이고 효과적으로 운영되고 있습니까? <br></br> (예시 1) 위원회 운영규정 도입, 2) 위원회 구성원 중임, 3) 위원회 구성 독립성 4) 위원회 개최 횟수, 5) 위원회 상정 안건) ( 중복선택 가능 )</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="checkbox" name="8" value="1" checked={selectedOptionsQ8[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q8")} />이사회 산하 모든 위원회 설치는 정관에 근거하고 있으며, 모든 위원회에 대해 ‘운영규정’을 제정하고 있다.</ui>
                            <ui><input type="checkbox" name="8" value="2" checked={selectedOptionsQ8[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q8")} />특정 이사(사내이사, 사외이사, 기타비상임이사)가 이사회 산하 모든 위원회의 구성원으로 선임되어 있지 않다.</ui>
                            <ui><input type="checkbox" name="8" value="3" checked={selectedOptionsQ8[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q8")} />이사회 산하 모든 위원회가 구성원의 과반수 이상을 사외이사로 선임하고 있다.</ui>
                            <ui><input type="checkbox" name="8" value="4" checked={selectedOptionsQ8[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q8")} />직전 회계연도 중 이사회 산하 위원회 개최 횟수가 평균적으로 3회 이상이다.</ui>
                            <ui><input type="checkbox" name="8" value="5" checked={selectedOptionsQ8[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q8")} />직전 회계연도 중 이사회 산하 모든 위원회가 심의/의결 안건을 다룬적이 있다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q9.</h3>
                        <p>이사회 활동 내역 또는 이사회 의사록 등을 통해 전체 안건 중 수정, 보완 및 반대 의견이 나타난 안건의 비율은 어느정도 입니까?</p>
                        <div className="grid gap-3 grid-rows-3 w-full">
                            <ui><input type="radio" name="9" value="1" defaultChecked={selectedOptions[9] === "1"} onChange={(event) => handleOptionChange(9, event)} />안건에 대한 수정, 보완, 반대하는 의견이 한 건도 없다.</ui>
                            <ui><input type="radio" name="9" value="2" checked={selectedOptions[9] === "2"} onChange={(event) => handleOptionChange(9, event)} />안건에 대한 수정, 보완, 반대하는 의견이 한 건 이상 존재한다.</ui>
                            <ui><input type="radio" name="9" value="3" checked={selectedOptions[9] === "3"} onChange={(event) => handleOptionChange(9, event)} />안건에 대한 수정, 보완, 반대하는 의견이 5% 이상 존재한다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q10.</h3>
                        <p>주주총회 소집 공고는 어떤방법 입니까? <br></br>(예시  1) 조직의 사업장 게시판, 2) 조직의 온라인 홈페이지, 3) 명의개서대행사, 4) 일간지(신문), 5) 전자공시시스템, 6) 기타)</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="10" value="1" defaultChecked={selectedOptions[10] === "1"} onChange={(event) => handleOptionChange(10, event)} />주주총회 소집 공고를 서면으로만 통지하거나, 주주의 동의를 받아 전자문서로만 한다.</ui>
                            <ui><input type="radio" name="10" value="2" checked={selectedOptions[10] === "2"} onChange={(event) => handleOptionChange(10, event)} />서면 또는 전자문서로 통지하는 방식 外 1개의 추가 방식을 이용한다.</ui>
                            <ui><input type="radio" name="10" value="3" checked={selectedOptions[10] === "3"} onChange={(event) => handleOptionChange(10, event)} />서면 또는 전자문서로 통지하는 방식 外 2개의 추가 방식을 이용한다.</ui>
                            <ui><input type="radio" name="10" value="4" checked={selectedOptions[10] === "4"} onChange={(event) => handleOptionChange(10, event)} />서면 또는 전자문서로 통지하는 방식 外 3개의 추가 방식을 이용한다.</ui>
                            <ui><input type="radio" name="10" value="5" checked={selectedOptions[10] === "5"} onChange={(event) => handleOptionChange(10, event)} />서면 또는 전자문서로 통지하는 방식 外 4개 이상의 추가 방식을 이용한다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q11.</h3>
                        <p>주주총회 개최일을 지정하는데 있어, 조직이 고려한 요소에는 어떤것이 있습니까? (중복 선택 가능)</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="checkbox" name="12" value="1" checked={selectedOptionsQ12[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q12")} />주주총회 개최일을 지정하는데 있어, 재무결산 및 감사보고서 발행일을 고려함</ui>
                            <ui><input type="checkbox" name="12" value="2" checked={selectedOptionsQ12[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q12")} />주주총회 개최일을 지정하는데 있어, 조직의 연간 업무계획 및 경영진 등의 업무일정을 고려함</ui>
                            <ui><input type="checkbox" name="12" value="3" checked={selectedOptionsQ12[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q12")} />주주총회 개최일을 지정하는데 있어, 연기금, 기관투자자, 의결권자문사 등의 주요 시장 참여자 의견을 수렴함</ui>
                            <ui><input type="checkbox" name="12" value="4" checked={selectedOptionsQ12[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q12")} />주주총회 개최일을 지정하는데 있어, 소액주주 및 기타 이해관계자 등의 의견을 수렴함</ui>
                            <ui><input type="checkbox" name="12" value="5" checked={selectedOptionsQ12[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q12")} />주주총회 개최일을 지정하는데 있어, 주주총회 예상 집중일을 고려함</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q12.</h3>
                        <p>조직의 정관에 ‘서면투표제’, ‘전자투표제’, ‘집중투표제’를 도입하고 있는지, 특히 이사회가 결의하여 ‘전자투표제’를 장려하고 있습니까?</p>
                        <div className="grid gap-3 grid-rows-2 w-full pb-3 border-solid border-b-2">
                            <ui><input type="radio" name="13" value="1" defaultChecked={selectedOptions[13] === "1"} onChange={(event) => handleOptionChange(13, event)} />정관에서 집중투표제를 배제하고 있다.</ui>
                            <ui><input type="radio" name="13" value="2" checked={selectedOptions[13] === "2"} onChange={(event) => handleOptionChange(13, event)} />정관에서 집중투표제를 명시하고 있다.</ui>
                        </div>
                        <div className="grid gap-3 grid-rows-2 w-full pb-3 border-solid border-b-2">
                            <ui><input type="radio" name="13-1" value="1" defaultChecked={selectedOptions[14] === "1"} onChange={(event) => handleOptionChange(14, event)} />정관에서 서면투표제를 배제하고 있다.</ui>
                            <ui><input type="radio" name="13-1" value="2" checked={selectedOptions[14] === "2"} onChange={(event) => handleOptionChange(14, event)} />정관에서 서면투표제를 명시하고 있다.</ui>
                        </div>
                        <div className="grid gap-3 grid-rows-2 w-full">
                            <ui><input type="radio" name="13-2" value="1" defaultChecked={selectedOptions[15] === "1"} onChange={(event) => handleOptionChange(15, event)} />정관에서 전자투표제를 배제하고 있다.</ui>
                            <ui><input type="radio" name="13-2" value="2" checked={selectedOptions[15] === "2"} onChange={(event) => handleOptionChange(15, event)} />정관에서 전자투표제를 명시하거나, 이사회 결의로 도입하고 있다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q13.</h3>
                        <p>조직이 직전 회계연도에 주주를 대상으로 배당정책 및 배당계획을 충실히 통지하였는지, 또한 통지한 배당정책 및 배당계획에 따라 실제 배당을 집행 하였습니까?</p>
                        <div className="grid gap-3 grid-rows-3 w-full">
                            <ui><input type="radio" name="14" value="1" defaultChecked={selectedOptions[16] === "1"} onChange={(event) => handleOptionChange(16, event)} />주주에게 배당정책 및 배당계획을 통지하지 않았다.</ui>
                            <ui><input type="radio" name="14" value="2" checked={selectedOptions[16] === "2"} onChange={(event) => handleOptionChange(16, event)} />주주에게 배당정책 및 배당계획을 연 1회 이상 통지했다.</ui>
                            <ui><input type="radio" name="14" value="3" checked={selectedOptions[16] === "3"} onChange={(event) => handleOptionChange(16, event)} />주주에게 배당정책 및 배당계획을 연 1회 이상 통지하였으며, 배당정책 및 배당계획대로 배당을 집행했다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q14.</h3>
                        <p>조직이 직전 회계연도에 발생한 윤리규범 위반 건수 및 관련 구성원 수, 윤리규범 위반 내용, 위반에 따른 처벌 및 관련 구성원 처분, 재발방지를 위한 개선활동을 공시하고 있습니까? (중복 선택 가능)</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="checkbox" name="15" value="1" checked={selectedOptionsQ15[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q15")} />윤리규범 위반 건수를 공시하고 있다.</ui>
                            <ui><input type="checkbox" name="15" value="2" checked={selectedOptionsQ15[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q15")} />윤리규범 위반한 구성원 수를 공시하고 있다.</ui>
                            <ui><input type="checkbox" name="15" value="3" checked={selectedOptionsQ15[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q15")} />윤리규범 위반 건과 관련한 처벌내역(사법상, 행정상)을 공시하고 있다.</ui>
                            <ui><input type="checkbox" name="15" value="4" checked={selectedOptionsQ15[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q15")} />윤리규범 위반 건과 관련된 구성원 처분내역(인사상)을 공시하고 있다.</ui>
                            <ui><input type="checkbox" name="15" value="5" checked={selectedOptionsQ15[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q15")} />윤리규범 위반 사건 재발방지를 위한 개선활동 및 계획을 공시하고 있다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q15.</h3>
                        <p>조직의 감사위원회가 효율적인 역할을 수행할 수 있도록, 독립적인 내부 감사부서 설치, 감사위원회를 지원하는 부서 및 업무분장을 명확하게 지정하고 있습니까?</p>
                        <div className="grid gap-3 grid-rows-5 w-full">
                            <ui><input type="radio" name="16" value="1" defaultChecked={selectedOptions[18] === "1"} onChange={(event) => handleOptionChange(18, event)} />독립된 내부감사부서를 두고 있지 않거나, 감사 관련 업무를 수행하는 부서 또는 업무분장을 두고 있지 않다.</ui>
                            <ui><input type="radio" name="16" value="2" checked={selectedOptions[18] === "2"} onChange={(event) => handleOptionChange(18, event)} />독립된 내부감사부서를 두고 있지 않으나, 감사 관련 업무를 수행하는 기타 부서 및 업무분장이 있다.</ui>
                            <ui><input type="radio" name="16" value="3" checked={selectedOptions[18] === "3"} onChange={(event) => handleOptionChange(18, event)} />독립된 내부감사부서를 두고 있으나, 내부감사부서의 업무분장 등에 감사위원회 업무지원과 관련한 내용을 명시하지 않다.</ui>
                            <ui><input type="radio" name="16" value="4" checked={selectedOptions[18] === "4"} onChange={(event) => handleOptionChange(18, event)} />독립된 내부감사부서를 두고 있으며, 내부감사부서의 업무분장 등에 감사위원회 업무지원과 관련한 내용을 명시했다.</ui>
                            <ui><input type="radio" name="16" value="5" checked={selectedOptions[18] === "5"} onChange={(event) => handleOptionChange(18, event)} />내부감사부서를 두고 있으며, 또한 조직과 독립적으로 감사위원회 지원 역할을 수행하는 별도 전담부서(또는 업무분장)을 두고 있다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q16.</h3>
                        <p>조직의 직전 회계연도 감사위원회 구성원(감사위원회 위원장 및 감사위원) 중 「상법」 및 「금융회사의 지배구조에 관한 법률」 등에서 규정한 회계 및 재무 전문가가 차지하는 비율은 어느정도 입니까?</p>
                        <div className="grid gap-3 grid-rows-3 w-full">
                            <ui><input type="radio" name="17" value="1" defaultChecked={selectedOptions[19] === "1"} onChange={(event) => handleOptionChange(19, event)} />감사위원회 내 회계 및 재무 분야 전문성을 보유한 감사위원이 1명 이하 선임되어 있다.</ui>
                            <ui><input type="radio" name="17" value="2" checked={selectedOptions[19] === "2"} onChange={(event) => handleOptionChange(19, event)} />감사위원회 내 회계 및 재무 전문가가 1명 이상 선임되어 있으나, 전체 감사위원 중 50% 이하이다.</ui>
                            <ui><input type="radio" name="17" value="3" checked={selectedOptions[19] === "3"} onChange={(event) => handleOptionChange(19, event)} />감사위원회 내 회계 및 재무 전문가가 1명 이상 선임되어 있으며, 전체 감사위원 중 50% 초과이다.</ui>
                        </div>
                    </div>
                    <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                        <h3>Q17.</h3>
                        <p>조직의 지난 5개년 간 조직의 지배구조 관련 법/규제 위반한 적이 있습니까?</p>
                        <div className="grid gap-3 grid-rows-4 w-full">
                            <ui><input type="radio" name="18" value="1" defaultChecked={selectedOptions[20] === "1"} onChange={(event) => handleOptionChange(20, event)} />지난 5개년 간 지배구조 관련 법/규제를 위반한 적이 없다.</ui>
                            <ui><input type="radio" name="18" value="2" checked={selectedOptions[20] === "2"} onChange={(event) => handleOptionChange(20, event)} />지난 5개년 간 지배구조 법/규제 위반내역 중 처분이 확정된 건수에 대해, 지배구조 법/규제 위반의 처벌수위가 사법상 형벌, 벌금, 과료인 경우, 또는 지배구조 법/규제 위반으로 인해 국가나 지방자치 단체를 당사자로 하는 계약에서 입찰참가자격을 제한당한 적이 있다.</ui>
                            <ui><input type="radio" name="18" value="3" checked={selectedOptions[20] === "3"} onChange={(event) => handleOptionChange(20, event)} />지난 5개년 간 지배구조 법/규제 위반내역 중 처분이 확정된 건수에 대해, 지배구조 법/규제 위반의 처벌수위가 행정상 처분 중 금전적 처분에 해당하는 과태료, 과징금, 이행강제금을 받은적이 있다.</ui>
                            <ui><input type="radio" name="18" value="4" checked={selectedOptions[20] === "4"} onChange={(event) => handleOptionChange(20, event)} />지난 5개년 간 지배구조 법/규제 위반내역 중 처분이 확정된 건수에 대해, 지배구조 법/규제 위반의 처벌수위가 행정상 처분 중 비금전적 처분에 해당하는 시정명령, 시정권고, 경고를 받은적이 있다.</ui>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={onClickJson} className="relative z-5 inline-flex items-center rounded-3 bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 float-right mt-3">
                    설문 완료
                </button>
                <CustomModal
                    openHandle={ModalOpen}
                    closeFunc={setState}
                    Text={'보고서 생성 중 입니다.\n잠시만 기다려주세요.\n(15~20분 정도 소요됩니다)'}
                    type={1} />
                <div className="flex items-center justify-center border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a href="/survey1" aria-current="page" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            1
                        </a>
                        <a href="/survey2" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            2
                        </a>
                        <a className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            3
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}
