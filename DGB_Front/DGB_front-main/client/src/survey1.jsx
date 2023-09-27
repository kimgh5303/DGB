/* eslint-disable */
import Nav from "./navcompany";
import { ScrollRemote } from "./remote/remoteControll";
import { useState, useEffect } from "react";

export default function Survey1() {
    const handleOptionChange = (questionIndex, event) => {
        const value = event.target.value;
        setSelectedOption(questionIndex, value);
    };
    const numberOfQuestions = 30; // 질문의 총 개수

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
    const initialOptioncheckQ2 = [];
    const initialOptioncheckQ7 = [];
    const [selectedOptionsQ2, setSelectedOptionsQ2] = useState(Array(5).fill([...initialOptioncheckQ2]));
    const [selectedOptionsQ7, setSelectedOptionsQ7] = useState(Array(5).fill([...initialOptioncheckQ7]));


    useEffect(() => {
        setSelectedOptionsQ2(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);

    useEffect(() => {
        setSelectedOptionsQ7(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);

    const handleOptionChangecheck = (questionIndex, event, questionType) => {
        const value = event.target.value;

        if (questionType === "Q2") {
            setSelectedOptionsQ2((prevOptions) => {
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
        } else if (questionType === "Q7") {
            setSelectedOptionsQ7((prevOptions) => {
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
        E: {
            Q1: [selectedOptions[0]],
            Q2: selectedOptionsQ2.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q3: [selectedOptions[2], selectedOptions[3]],
            Q4: [selectedOptions[4], selectedOptions[5]],
            Q5: [selectedOptions[6], selectedOptions[7]],
            Q6: [selectedOptions[8], selectedOptions[9], selectedOptions[10]],
            Q7: selectedOptionsQ7.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q8: [selectedOptions[12], selectedOptions[13]],
            Q9: [selectedOptions[14], selectedOptions[15]],
            Q10: [selectedOptions[16], selectedOptions[17]],
            Q11: [selectedOptions[18], selectedOptions[19]],
            Q12: [selectedOptions[20], selectedOptions[21]],
            Q13: [selectedOptions[22], selectedOptions[23]],
            Q14: [selectedOptions[24], selectedOptions[25]],
            Q15: [selectedOptions[26], selectedOptions[27]],
            Q16: [selectedOptions[28]],
            Q17: [selectedOptions[29]],
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
    localStorage.setItem('jsonE', jsonString);
    return (

        <div>
            <Nav />
            <ScrollRemote/>
            <div class="container px-5 my-5">
                <div className="fw-bolder text-3xl mb-3">
                    ESG-E(Environment)
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q1.</h3>
                    <p>조직의 환경경영 방향성을 확인할 수 있는 구체적이고 정량적인 단기/중장기 목표가 설정되어 있는지, 해당 목표 달성을 위한 과제 및 이행점검을 위한 지표를 정의하고 있습니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="1" value="1" defaultChecked={selectedOptions[0] === "1"} onChange={(event) => handleOptionChange(0, event)} />단기/중장기 성과목표, 또는 조직의 환경경영 방향성을 나타내는 환경경영 미션/비전/지향점이 없다.</ui>
                        <ui><input type="radio" name="1" value="2" checked={selectedOptions[0] === "2"} onChange={(event) => handleOptionChange(0, event)} />단기/중장기 성과목표는 수립되지 않았으나, 조직의 환경경영 방향성을 나타내는 환경경영 미션/비전/지향점을 제시하고 있다.</ui>
                        <ui><input type="radio" name="1" value="3" checked={selectedOptions[0] === "3"} onChange={(event) => handleOptionChange(0, event)} />조직의 환경 분야 핵심이슈에 대한 단기 목표를 설정하고 있으나, 중장기 목표는 없다.</ui>
                        <ui><input type="radio" name="1" value="4" checked={selectedOptions[0] === "4"} onChange={(event) => handleOptionChange(0, event)} />조직의 환경 분야 핵심이슈에 대한 중장기 목표까지 수립하고 있다.</ui>
                        <ui><input type="radio" name="1" value="5" checked={selectedOptions[0] === "5"} onChange={(event) => handleOptionChange(0, event)} />조직의 환경 분야 핵심이슈에 대한 중장기 목표까지 설정하고 있으며, 중장기 목표 달성을 위한 과제와, 이행점검 지표를 마련했다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q2.</h3>
                    <p>조직이 환경경영을 체계적으로 추진하기 위한 ‘전사 거버넌스’, ‘전사 전담조직’, ‘자원 및 역량’, ‘이행현황 점검 시스템’, ‘구성원 성과평가 지표’ 구축을 하였습니까? ( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="2" value="1" checked={selectedOptionsQ2[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q2")} />환경경영 추진을 위한 전사 거버넌스 체계를 구축하고 있다.</ui>
                        <ui><input type="checkbox" name="2" value="2" checked={selectedOptionsQ2[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q2")} />환경경영 추진을 위한 전사 전담조직을 운영하고 있다.</ui>
                        <ui><input type="checkbox" name="2" value="3" checked={selectedOptionsQ2[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q2")} />환경경영 과제 실행에 필요한 자원을 투입하고 있다.</ui>
                        <ui><input type="checkbox" name="2" value="4" checked={selectedOptionsQ2[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q2")} />환경경영 추진 현황을 점검/분석/평가하는 시스템이 있다.</ui>
                        <ui><input type="checkbox" name="2" value="5" checked={selectedOptionsQ2[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q2")} />환경경영 과제 이행현황이 경영진 포함 관련 구성원의 성과평가지표(KPIs)에 반영되어 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q3.</h3>
                    <p>조직의 지난 5개년 간 원단위 원부자재 사용량이 감소 추세에 있는지, 지난 1개년의 원단위 원부자재 사용량이 산업평균 미만입니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="3" value="1" defaultChecked={selectedOptions[2] === "1"} onChange={(event) => handleOptionChange(2, event)} />직전 1개년 원단위 원부자재 사용량 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="3" value="2" checked={selectedOptions[2] === "2"} onChange={(event) => handleOptionChange(2, event)} />직전 1개년 원단위 원부자재 사용량 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="3" value="3" checked={selectedOptions[2] === "3"} onChange={(event) => handleOptionChange(2, event)} />직전 1개년 원단위 원부자재 사용량 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="3-1" value="1" defaultChecked={selectedOptions[3] === "1"} onChange={(event) => handleOptionChange(3, event)} />지난 5개년 원단위 원부자재 사용량 증가 추세</ui>
                        <ui><input type="radio" name="3-1" value="2" checked={selectedOptions[3] === "2"} onChange={(event) => handleOptionChange(3, event)} />지난 5개년 원단위 원부자재 사용량 변동 없음</ui>
                        <ui><input type="radio" name="3-1" value="3" checked={selectedOptions[3] === "3"} onChange={(event) => handleOptionChange(3, event)} />지난 5개년 원단위 원부자재 사용량 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q4.</h3>
                    <p>조직의 지난 5개년 간 재생 원부자재 사용 비율이 증가 추세에 있는지, 지난 1개년의 재생 원부자재 사용 비율이 산업평균을 초과합니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="4" value="1" defaultChecked={selectedOptions[4] === "1"} onChange={(event) => handleOptionChange(4, event)} />직전 1개년 재생 원부자재 사용 비율 당해년도 산업 평균 미만</ui>
                        <ui><input type="radio" name="4" value="2" checked={selectedOptions[4] === "2"} onChange={(event) => handleOptionChange(4, event)} />직전 1개년 재생 원부자재 사용 비율 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="4" value="3" checked={selectedOptions[4] === "3"} onChange={(event) => handleOptionChange(4, event)} />직전 1개년 재생 원부자재 사용 비율 당해년도 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="4-1" value="1" defaultChecked={selectedOptions[5] === "1"} onChange={(event) => handleOptionChange(5, event)} />지난 5개년 재생 원부자재 사용 비율 감소 추세</ui>
                        <ui><input type="radio" name="4-1" value="2" checked={selectedOptions[5] === "2"} onChange={(event) => handleOptionChange(5, event)} />지난 5개년 재생 원부자재 사용 비율 변동 없음</ui>
                        <ui><input type="radio" name="4-1" value="3" checked={selectedOptions[5] === "3"} onChange={(event) => handleOptionChange(5, event)} />지난 5개년 재생 원부자재 사용 비율 증가 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q5.</h3>
                    <p>조직의 지난 5개년 간 원단위 온실가스 배출량(Scope1 & Scope2)이 감축 추세에 있는지, 지난 1개년의 원단위 온실가스 배출량이 산업평균 미만입니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="5" value="1" defaultChecked={selectedOptions[6] === "1"} onChange={(event) => handleOptionChange(6, event)} />직전 1개년 원단위 온실가스 배출량 당해년도 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="5" value="2" checked={selectedOptions[6] === "2"} onChange={(event) => handleOptionChange(6, event)} />직전 1개년 원단위 온실가스 배출량 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="5" value="3" checked={selectedOptions[6] === "3"} onChange={(event) => handleOptionChange(6, event)} />직전 1개년 원단위 온실가스 배출량 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="5-1" value="1" defaultChecked={selectedOptions[7] === "1"} onChange={(event) => handleOptionChange(7, event)} />지난 5개년 원단위 온실가스 배출량 증가 추세</ui>
                        <ui><input type="radio" name="5-1" value="2" checked={selectedOptions[7] === "2"} onChange={(event) => handleOptionChange(7, event)} />지난 5개년 원단위 온실가스 배출량 변동 없음</ui>
                        <ui><input type="radio" name="5-1" value="3" checked={selectedOptions[7] === "3"} onChange={(event) => handleOptionChange(7, event)} />지난 5개년 원단위 온실가스 배출량 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q6.</h3>
                    <p>조직이 지난 1개년간 Scope3 온실가스 배출 범주를 인식, 배출량을 산정, 배출량 산정 결과를 검증하고 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="6" value="1" defaultChecked={selectedOptions[8] === "1"} onChange={(event) => handleOptionChange(8, event)} />조직의 Scope3 범주를 인식하고 있지 않다.</ui>
                        <ui><input type="radio" name="6" value="2" checked={selectedOptions[8] === "2"} onChange={(event) => handleOptionChange(8, event)} />조직의 가치사슬 관련 일부 Scope3 범주만 인식하고 있다.</ui>
                        <ui><input type="radio" name="6" value="3" checked={selectedOptions[8] === "3"} onChange={(event) => handleOptionChange(8, event)} />조직의 가치사슬 관련 모든 Scope3 범주를 인식하고 있다.</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2 mt-3">
                        <ui><input type="radio" name="6-1" value="1" defaultChecked={selectedOptions[9] === "1"} onChange={(event) => handleOptionChange(9, event)} />조직의 Scope3 배출량을 측정하고 있지 않는 경우</ui>
                        <ui><input type="radio" name="6-1" value="2" checked={selectedOptions[9] === "2"} onChange={(event) => handleOptionChange(9, event)} />국내 등 일부 사업장의Scope3 배출량만 측정하고 있다.</ui>
                        <ui><input type="radio" name="6-1" value="3" checked={selectedOptions[9] === "3"} onChange={(event) => handleOptionChange(9, event)} />조직의 모든 사업장의 Scope3 배출량을 측정하고 있다.</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="6-2" value="1" defaultChecked={selectedOptions[10] === "1"} onChange={(event) => handleOptionChange(10, event)} />Scope3 배출량에 대한 제3자 검증을 하지 않았다.</ui>
                        <ui><input type="radio" name="6-2" value="2" checked={selectedOptions[10] === "2"} onChange={(event) => handleOptionChange(10, event)} />일부 Scope3 범주 및 측정값에 대해서만 제3자 검증을 했다.</ui>
                        <ui><input type="radio" name="6-2" value="3" checked={selectedOptions[10] === "3"} onChange={(event) => handleOptionChange(10, event)} />모든 Scope3 범주 및 측정값에 대해 제3자 검증을 했다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q7.</h3>
                    <p>온실가스 배출량 데이터 검증의견서가 갖추어야 할 ‘검증기관의 적격성’, ‘검증기관과의 독립성’, ‘검증방법론의 합리성’, ‘검증수준의 명확성’, ‘검증지표의 구체성’ 요건이 충족되었습니까? ( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="7" value="1" checked={selectedOptionsQ7[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q7")} />검증의견서에 검증기관(또는 검증인)이 명시되어 있다.</ui>
                        <ui><input type="checkbox" name="7" value="2" checked={selectedOptionsQ7[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q7")} />검증의견서에 검증표준(방법론)이 제시되어 있다.</ui>
                        <ui><input type="checkbox" name="7" value="3" checked={selectedOptionsQ7[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q7")} />검증의견서에 ESG 정보 검증수준을 공개하고 있다.</ui>
                        <ui><input type="checkbox" name="7" value="4" checked={selectedOptionsQ7[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q7")} />제3자 검증기관이 검증한 온실가스 배출량 검증 범위가 적시되어 있다.</ui>
                        <ui><input type="checkbox" name="7" value="5" checked={selectedOptionsQ7[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q7")} />조직의 온실가스 관리에 관한 제3자 검증기관 의견이 명시되어 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q8.</h3>
                    <p>조직의 직전 1개년의 원단위 에너지 사용량이 산업평균 미만인지, 지난 5개년 간 원단위 에너지 사용량이 절감 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="8" value="1" defaultChecked={selectedOptions[12] === "1"} onChange={(event) => handleOptionChange(12, event)} />직전 1개년 원단위 에너지 사용량이 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="8" value="2" checked={selectedOptions[12] === "2"} onChange={(event) => handleOptionChange(12, event)} />직전 1개년 원단위 에너지 사용량이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="8" value="3" checked={selectedOptions[12] === "3"} onChange={(event) => handleOptionChange(12, event)} />직전 1개년 원단위 에너지 사용량이 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="8-1" value="1" defaultChecked={selectedOptions[13] === "1"} onChange={(event) => handleOptionChange(13, event)} />지난 5개년 원단위 에너지 사용량이 증가 추세</ui>
                        <ui><input type="radio" name="8-1" value="2" checked={selectedOptions[13] === "2"} onChange={(event) => handleOptionChange(13, event)} />지난 5개년 원단위 에너지 사용량이 변동 없음</ui>
                        <ui><input type="radio" name="8-1" value="3" checked={selectedOptions[13] === "3"} onChange={(event) => handleOptionChange(13, event)} />지난 5개년 원단위 에너지 사용량이 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q9.</h3>
                    <p>조직의 직전 1개년의 재생에너지 사용 비율이 산업평균을 초과하는지, 지난 5개년 간 재생에너지 사용 비율이 증가 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="9" value="1" defaultChecked={selectedOptions[14] === "1"} onChange={(event) => handleOptionChange(14, event)} />직전 1개년 재생에너지 사용비율이 당해년도 산업 평균 미만</ui>
                        <ui><input type="radio" name="9" value="2" checked={selectedOptions[14] === "2"} onChange={(event) => handleOptionChange(14, event)} />직전 1개년 재생에너지 사용비율이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="9" value="3" checked={selectedOptions[14] === "3"} onChange={(event) => handleOptionChange(14, event)} />직전 1개년 재생에너지 사용비율이 당해년도 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="9-1" value="1" defaultChecked={selectedOptions[15] === "1"} onChange={(event) => handleOptionChange(15, event)} />지난 5개년 재생에너지 사용비율이 감소 추세</ui>
                        <ui><input type="radio" name="9-1" value="2" checked={selectedOptions[15] === "2"} onChange={(event) => handleOptionChange(15, event)} />지난 5개년 재생에너지 사용비율이 변동 없음</ui>
                        <ui><input type="radio" name="9-1" value="3" checked={selectedOptions[15] === "3"} onChange={(event) => handleOptionChange(15, event)} />지난 5개년 재생에너지 사용비율이 증가 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q10.</h3>
                    <p>조직의 직전 1개년의 원단위 용수 사용량이 산업평균 미만인지, 지난 5개년 간 원단위 용수 사용량이 절감 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="10" value="1" defaultChecked={selectedOptions[16] === "1"} onChange={(event) => handleOptionChange(16, event)} />직전 1개년 원단위 용수 사용량이 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="10" value="2" checked={selectedOptions[16] === "2"} onChange={(event) => handleOptionChange(16, event)} />직전 1개년 원단위 용수 사용량이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="10" value="3" checked={selectedOptions[16] === "3"} onChange={(event) => handleOptionChange(16, event)} />직전 1개년 원단위 용수 사용량이 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="10-1" value="1" defaultChecked={selectedOptions[17] === "1"} onChange={(event) => handleOptionChange(17, event)} />지난 5개년 원단위 용수 사용량이 증가 추세</ui>
                        <ui><input type="radio" name="10-1" value="2" checked={selectedOptions[17] === "2"} onChange={(event) => handleOptionChange(17, event)} />지난 5개년 원단위 용수 사용량이 변동 없음</ui>
                        <ui><input type="radio" name="10-1" value="3" checked={selectedOptions[17] === "3"} onChange={(event) => handleOptionChange(17, event)} />지난 5개년 원단위 용수 사용량이 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q11.</h3>
                    <p>조직의 직전 1개년의 재사용 용수 비율이 산업평균 초과인지, 지난 5개년 간 재사용 용수 비율이 증가 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="11" value="1" defaultChecked={selectedOptions[18] === "1"} onChange={(event) => handleOptionChange(18, event)} />직전 1개년 재사용 용수 비율이 당해년도 산업 평균 미만</ui>
                        <ui><input type="radio" name="11" value="2" checked={selectedOptions[18] === "2"} onChange={(event) => handleOptionChange(18, event)} />직전 1개년 재사용 용수 비율이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="11" value="3" checked={selectedOptions[18] === "3"} onChange={(event) => handleOptionChange(18, event)} />직전 1개년 재사용 용수 비율이 당해년도 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="11-1" value="1" defaultChecked={selectedOptions[19] === "1"} onChange={(event) => handleOptionChange(19, event)} />지난 5개년 재사용 용수 비율이 감소 추세</ui>
                        <ui><input type="radio" name="11-1" value="2" checked={selectedOptions[19] === "2"} onChange={(event) => handleOptionChange(19, event)} />지난 5개년 재사용 용수 비율이 변동 없음</ui>
                        <ui><input type="radio" name="11-1" value="3" checked={selectedOptions[19] === "3"} onChange={(event) => handleOptionChange(19, event)} />지난 5개년 재사용 용수 비율이 증가 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q12.</h3>
                    <p>조직의 직전 1개년의 원단위 폐기물 배출량이 산업평균 미만인지, 지난 5개년 간 원단위 폐기물 배출량이 저감 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="12" value="1" defaultChecked={selectedOptions[20] === "1"} onChange={(event) => handleOptionChange(20, event)} />직전 1개년 원단위 폐기물이 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="12" value="2" checked={selectedOptions[20] === "2"} onChange={(event) => handleOptionChange(20, event)} />직전 1개년 원단위 폐기물이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="12" value="3" checked={selectedOptions[20] === "3"} onChange={(event) => handleOptionChange(20, event)} />직전 1개년 원단위 폐기물이 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="12-1" value="1" defaultChecked={selectedOptions[21] === "1"} onChange={(event) => handleOptionChange(21, event)} />지난 5개년 원단위 폐기물이 증가 추세</ui>
                        <ui><input type="radio" name="12-1" value="2" checked={selectedOptions[21] === "2"} onChange={(event) => handleOptionChange(21, event)} />지난 5개년 원단위 폐기물이 변동 없음</ui>
                        <ui><input type="radio" name="12-1" value="3" checked={selectedOptions[21] === "3"} onChange={(event) => handleOptionChange(21, event)} />지난 5개년 원단위 폐기물이 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q13.</h3>
                    <p>조직의 직전 1개년의 폐기물 재활용(재사용 포함) 비율이 산업평균 초과인지, 지난 5개년 간 폐기물 재활용(재사용 포함) 비율이 증가 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="13" value="1" defaultChecked={selectedOptions[22] === "1"} onChange={(event) => handleOptionChange(22, event)} />직전 1개년 폐기물 재활용 비율이 당해년도 산업 평균 미만</ui>
                        <ui><input type="radio" name="13" value="2" checked={selectedOptions[22] === "2"} onChange={(event) => handleOptionChange(22, event)} />직전 1개년 폐기물 재활용 비율이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="13" value="3" checked={selectedOptions[22] === "3"} onChange={(event) => handleOptionChange(22, event)} />직전 1개년 폐기물 재활용 비율이 당해년도 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="13-1" value="1" defaultChecked={selectedOptions[23] === "1"} onChange={(event) => handleOptionChange(23, event)} />지난 5개년 폐기물 재활용 비율이 감소 추세</ui>
                        <ui><input type="radio" name="13-1" value="2" checked={selectedOptions[23] === "2"} onChange={(event) => handleOptionChange(23, event)} />지난 5개년 폐기물 재활용 비율이 변동 없음</ui>
                        <ui><input type="radio" name="13-1" value="3" checked={selectedOptions[23] === "3"} onChange={(event) => handleOptionChange(23, event)} />지난 5개년 폐기물 재활용 비율이 증가 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q14.</h3>
                    <p>조직의 직전 1개년 질소산화물(NOx), 황산화물(SOx), 미세먼지(PM2.5) 평균 배출농도가 산업평균 미만인지, 지난 5개년 간 평균 배출농도가 저감 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="14" value="1" defaultChecked={selectedOptions[24] === "1"} onChange={(event) => handleOptionChange(24, event)} />직전 1개년 대기오염물질 평균 배출농도가 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="14" value="2" checked={selectedOptions[24] === "2"} onChange={(event) => handleOptionChange(24, event)} />직전 1개년 대기오염물질 평균 배출농도가 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="14" value="3" checked={selectedOptions[24] === "3"} onChange={(event) => handleOptionChange(24, event)} />직전 1개년 대기오염물질 평균 배출농도가 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="14-1" value="1" defaultChecked={selectedOptions[25] === "1"} onChange={(event) => handleOptionChange(25, event)} />지난 5개년 대기오염물질 평균 배출농도가 증가 추세</ui>
                        <ui><input type="radio" name="14-1" value="2" checked={selectedOptions[25] === "2"} onChange={(event) => handleOptionChange(25, event)} />지난 5개년 대기오염물질 평균 배출농도가 변동 없음</ui>
                        <ui><input type="radio" name="14-1" value="3" checked={selectedOptions[25] === "3"} onChange={(event) => handleOptionChange(25, event)} />지난 5개년 대기오염물질 평균 배출농도가 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q15.</h3>
                    <p>조직의 직전 1개년 간 최종 배출한 폐수 내 생물화학적 산소요구량(BOD), 화학적 산소요구량(COD), 부유물질량(SS)의 평균 배출농도가 산업평균 미만인지, 지난 5개년 간 평균 배출농도가 저감 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="15" value="1" defaultChecked={selectedOptions[26] === "1"} onChange={(event) => handleOptionChange(26, event)} />직전 1개년 수질오염물질 평균 배출농도가 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="15" value="2" checked={selectedOptions[26] === "2"} onChange={(event) => handleOptionChange(26, event)} />직전 1개년 수질오염물질 평균 배출농도가 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="15" value="3" checked={selectedOptions[26] === "3"} onChange={(event) => handleOptionChange(26, event)} />직전 1개년 수질오염물질 평균 배출농도가 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="15-1" value="1" defaultChecked={selectedOptions[27] === "1"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 수질오염물질 평균 배출농도가 증가 추세</ui>
                        <ui><input type="radio" name="15-1" value="2" checked={selectedOptions[27] === "2"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 수질오염물질 평균 배출농도가 변동 없음</ui>
                        <ui><input type="radio" name="15-1" value="3" checked={selectedOptions[27] === "3"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 수질오염물질 평균 배출농도가 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q16.</h3>
                    <p>조직의 지난 5개년 간 환경 법/규제 위반 건 수가 있습니까?</p>
                    <div className="grid gap-3 grid-rows-4 w-full">
                        <ui><input type="radio" name="16" value="1" defaultChecked={selectedOptions[28] === "1"} onChange={(event) => handleOptionChange(28, event)} />지난 5개년 간 환경 법/규제 위반 내역이 없다.</ui>
                        <ui><input type="radio" name="16" value="2" checked={selectedOptions[28] === "2"} onChange={(event) => handleOptionChange(28, event)} />지난 5개년 간 환경 법/규제 위반내역 중 판결이 확정된 건수에 대해, 처벌수위가 사법상 형벌, 벌금, 과료인 경우, 또는 국가나 지방자치단체를 당사자로 하는 계약에서 입찰참가자격을 제한당한 적이 있다.</ui>
                        <ui><input type="radio" name="16" value="3" checked={selectedOptions[28] === "3"} onChange={(event) => handleOptionChange(28, event)} />지난 5개년 간 환경 법/규제 위반내역 중 판결이 확정된 건수에 대해, 처벌수위가 행정상 처분 중 금전적 처분에 해당하는 과태료, 과징금, 이행강제금 등이 있다.</ui>
                        <ui><input type="radio" name="16" value="4" checked={selectedOptions[28] === "4"} onChange={(event) => handleOptionChange(28, event)} />지난 5개년 간 환경 법/규제 위반내역 중 판결이 확정된 건수에 대해, 처벌수위가 행정상 처분 중 비금전적 처분에 해당하는 시정명령, 시정권고, 경고 등이 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q17.</h3>
                    <p>조직의 지난 1개년 간 판매한 전체 제품 및 서비스 중 친환경 인증 제품 및 서비스 판매가 차지하는 비율을 산업평균과 상대 비교했을때, 비율은 얼마입니까? ( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="17" value="1" defaultChecked={selectedOptions[29] === "1"} onChange={(event) => handleOptionChange(29, event)} />친환경 인증을 획득한 제품 및 서비스, 또는 친환경 인증 원부자재 등이 포함된 제품군의 매출비율이 ‘산업평균 대비 20% 낮은 수준’이다.</ui>
                        <ui><input type="radio" name="17" value="2" checked={selectedOptions[29] === "2"} onChange={(event) => handleOptionChange(29, event)} />친환경 인증을 획득한 제품 및 서비스, 또는 친환경 인증 원부자재 등이 포함된 제품군의 매출비율이 ‘산업평균 대비 10% 낮은 수준’이다.</ui>
                        <ui><input type="radio" name="17" value="3" checked={selectedOptions[29] === "3"} onChange={(event) => handleOptionChange(29, event)} />친환경 인증을 획득한 제품 및 서비스, 또는 친환경 인증 원부자재 등이 포함된 제품군의 매출비율이 ‘산업평균 수준’이다. </ui>
                        <ui><input type="radio" name="17" value="4" checked={selectedOptions[29] === "4"} onChange={(event) => handleOptionChange(29, event)} />친환경 인증을 획득한 제품 및 서비스, 또는 친환경 인증 원부자재 등이 포함된 제품군의 매출비율이 ‘산업평균 대비 10% 높은 수준’이다. </ui>
                        <ui><input type="radio" name="17" value="5" checked={selectedOptions[29] === "5"} onChange={(event) => handleOptionChange(29, event)} />친환경 인증을 획득한 제품 및 서비스, 또는 친환경 인증 원부자재 등이 포함된 제품군의 매출비율이 ‘산업평균 대비 20% 높은 수준’이다. </ui>
                    </div>
                </div>
                <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            1
                        </a>
                        <a href="/survey2" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            2
                        </a>
                        <a href="/survey3" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            3
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
}