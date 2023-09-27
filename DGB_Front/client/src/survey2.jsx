/* eslint-disable */
import Nav from "./navcompany";
import { useState, useEffect } from "react";
import { ScrollRemote } from "./remote/remoteControll";

export default function Survey2() {


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
    //12,17,18,19,21
    const initialOptioncheckQ12 = [];
    const initialOptioncheckQ17 = [];
    const initialOptioncheckQ18 = [];
    const initialOptioncheckQ19 = [];
    const initialOptioncheckQ21 = [];
    const [selectedOptionsQ12, setSelectedOptionsQ12] = useState(Array(5).fill([...initialOptioncheckQ12]));
    const [selectedOptionsQ17, setSelectedOptionsQ17] = useState(Array(5).fill([...initialOptioncheckQ17]));
    const [selectedOptionsQ18, setSelectedOptionsQ18] = useState(Array(5).fill([...initialOptioncheckQ18]));
    const [selectedOptionsQ19, setSelectedOptionsQ19] = useState(Array(5).fill([...initialOptioncheckQ19]));
    const [selectedOptionsQ21, setSelectedOptionsQ21] = useState(Array(5).fill([...initialOptioncheckQ21]));


    useEffect(() => {
        setSelectedOptionsQ12(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);
    useEffect(() => {
        setSelectedOptionsQ17(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);
    useEffect(() => {
        setSelectedOptionsQ18(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);
    useEffect(() => {
        setSelectedOptionsQ19(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);
    useEffect(() => {
        setSelectedOptionsQ21(prevOptions => {
            const newOptions = [...prevOptions];
            newOptions[0] = ['1']; // 첫 번째 체크 박스 선택
            return newOptions;
        });
    }, []);

    const handleOptionChangecheck = (questionIndex, event, questionType) => {
        const value = event.target.value;

        if (questionType === "Q12") {
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
        else if (questionType === "Q17") {
            setSelectedOptionsQ17((prevOptions) => {
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
        else if (questionType === "Q18") {
            setSelectedOptionsQ18((prevOptions) => {
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
        else if (questionType === "Q19") {
            setSelectedOptionsQ19((prevOptions) => {
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
        else if (questionType === "Q21") {
            setSelectedOptionsQ21((prevOptions) => {
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
        S: {
            Q1: [selectedOptions[0]],
            Q2: [selectedOptions[1], selectedOptions[2]],
            Q3: [selectedOptions[3]],
            Q4: [selectedOptions[4], selectedOptions[5]],
            Q5: [selectedOptions[6], selectedOptions[7]],
            Q6: [selectedOptions[8], selectedOptions[9]],
            Q7: [selectedOptions[10]],
            Q8: [selectedOptions[11]],
            Q9: [selectedOptions[12]],
            Q10: [selectedOptions[13]],
            Q11: selectedOptionsQ12.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q12: [selectedOptions[16], selectedOptions[17]],
            Q13: [selectedOptions[18]],
            Q14: [selectedOptions[14]],//교체 [14]
            Q15: [selectedOptions[15]],//교체[15]
            Q16: selectedOptionsQ17.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q17: selectedOptionsQ18.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q18: selectedOptionsQ19.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q19: [selectedOptions[24]],
            Q20: selectedOptionsQ21.map((options) => options.filter((value) => value.length > 0)).flat(),
            Q21: [selectedOptions[26]],
            Q22: [selectedOptions[27]],
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
    localStorage.setItem('jsonS', jsonString);

    return (

        <div>
            <Nav />
            <ScrollRemote/>
            <div class="container px-5 my-5">
                <div className="fw-bolder text-3xl mb-3">
                    ESG-S(Social)
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q1.</h3>
                    <p>ESG(지속가능경영)보고서를 통해 사회분야 핵심토픽에 대한 목표 및 성과 관리현황은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="1" value="1" defaultChecked={selectedOptions[0] === "1"} onChange={(event) => handleOptionChange(0, event)} />단기/중장기 성과목표 또는 조직의 사회 분야 추진 방향성을 나타내는 사회분야경영 미션/비전/지향점이 없다.</ui>
                        <ui><input type="radio" name="1" value="2" checked={selectedOptions[0] === "2"} onChange={(event) => handleOptionChange(0, event)} />단기/중장기 성과목표는 수립되지 않았으나, 조직의 사회 분야 추진 방향성을 나타내는 사회분야 미션/비전/지향점을 제시하고 있다.</ui>
                        <ui><input type="radio" name="1" value="3" checked={selectedOptions[0] === "3"} onChange={(event) => handleOptionChange(0, event)} />조직의 사회분야 핵심이슈에 대한 단기 목표를 설정하고 있다.</ui>
                        <ui><input type="radio" name="1" value="4" checked={selectedOptions[0] === "4"} onChange={(event) => handleOptionChange(0, event)} />조직의 사회분야 핵심이슈에 대한 중장기 목표를 설정하고 있으나, 모든 중장기 목표가 정성적 형태로 되어 있다.</ui>
                        <ui><input type="radio" name="1" value="5" checked={selectedOptions[0] === "5"} onChange={(event) => handleOptionChange(0, event)} />조직의 사회분야 핵심이슈에 대한 중장기 목표를 설정하고 있으며, 중장기 목표에는 정성 外 정량적 목표를 포함하고 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q2.</h3>
                    <p>조직의 직전 1개년 신규 채용 지수 및 고용 규모가 산업 평균 초과인지, 지난 5개년 간 부가가치 증감률 대비 신규 채용률이 증가 추세에 있습니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="2" value="1" defaultChecked={selectedOptions[1] === "1"} onChange={(event) => handleOptionChange(1, event)} />직전 1개년 ‘신규 채용 지수’가 산업 평균 미만</ui>
                        <ui><input type="radio" name="2" value="2" checked={selectedOptions[1] === "2"} onChange={(event) => handleOptionChange(1, event)} />직전 1개년 ‘신규 채용 지수’가 산업 평균 동일</ui>
                        <ui><input type="radio" name="2" value="3" checked={selectedOptions[1] === "3"} onChange={(event) => handleOptionChange(1, event)} />직전 1개년 ‘신규 채용 지수’가 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="2-1" value="1" defaultChecked={selectedOptions[2] === "1"} onChange={(event) => handleOptionChange(2, event)} />직전 5개년 연평균(CAGR)적으로 ‘고용 규모’가 감소</ui>
                        <ui><input type="radio" name="2-1" value="2" checked={selectedOptions[2] === "2"} onChange={(event) => handleOptionChange(2, event)} />직전 5개년 연평균(CAGR)적으로 ‘고용 규모’가 유지</ui>
                        <ui><input type="radio" name="2-1" value="3" checked={selectedOptions[2] === "3"} onChange={(event) => handleOptionChange(2, event)} />직전 5개년 연평균(CAGR)적으로 ‘고용 규모’가 증가</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q3.</h3>
                    <p>국내외 모든 사업장을 기준으로 정규직 비율은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="3" value="1" defaultChecked={selectedOptions[3] === "1"} onChange={(event) => handleOptionChange(3, event)} />한시적 근로자, 기간제 근로자, 단시간 근로자, 파견·용역·호출 등의 형태로 종사하는 근로자 현황이 관리되지 않는다.</ui>
                        <ui><input type="radio" name="3" value="2" checked={selectedOptions[3] === "2"} onChange={(event) => handleOptionChange(3, event)} />조직의 정규직 비율이 40%인 이하다.</ui>
                        <ui><input type="radio" name="3" value="3" checked={selectedOptions[3] === "3"} onChange={(event) => handleOptionChange(3, event)} />조직의 정규직 비율이 40% 초과 60% 이하다.</ui>
                        <ui><input type="radio" name="3" value="4" checked={selectedOptions[3] === "4"} onChange={(event) => handleOptionChange(3, event)} />조직의 정규직 비율이 60% 초과 80% 이하다.</ui>
                        <ui><input type="radio" name="3" value="5" checked={selectedOptions[3] === "5"} onChange={(event) => handleOptionChange(3, event)} />조직의 정규직 비율이 80%를 초과다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q4.</h3>
                    <p>국내외 모든 직원에 대하여 자발적 이직률 증감 추이를 분석하며, 동종산업 평균과 비교하여 자발적 이직률의 상대적 수준은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="4" value="1" defaultChecked={selectedOptions[4] === "1"} onChange={(event) => handleOptionChange(4, event)} />직전 1개년 자발적 이직률이 당해년도 산업 평균 초과</ui>
                        <ui><input type="radio" name="4" value="2" checked={selectedOptions[4] === "2"} onChange={(event) => handleOptionChange(4, event)} />직전 1개년 자발적 이직률이 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="4" value="3" checked={selectedOptions[4] === "3"} onChange={(event) => handleOptionChange(4, event)} />직전 1개년 자발적 이직률이 당해년도 산업 평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="4-1" value="1" defaultChecked={selectedOptions[5] === "1"} onChange={(event) => handleOptionChange(5, event)} />지난 5개년 자발적 이직률이 증가 추세</ui>
                        <ui><input type="radio" name="4-1" value="2" checked={selectedOptions[5] === "2"} onChange={(event) => handleOptionChange(5, event)} />지난 5개년 자발적 이직률이 변동 없음</ui>
                        <ui><input type="radio" name="4-1" value="3" checked={selectedOptions[5] === "3"} onChange={(event) => handleOptionChange(5, event)} />지난 5개년 자발적 이직률이 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q5.</h3>
                    <p>조직이 과거 5개년의 1인당 교육훈련비 데이터를 관리하고 있는지, 동종산업 평균과 비교하여 1인당 교육훈련비 지출의 상대적 수준은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="5" value="1" defaultChecked={selectedOptions[6] === "1"} onChange={(event) => handleOptionChange(6, event)} />직전 1개년 교육훈련비 당해년도 산업 평균 미만</ui>
                        <ui><input type="radio" name="5" value="2" checked={selectedOptions[6] === "2"} onChange={(event) => handleOptionChange(6, event)} />직전 1개년 교육훈련비 당해년도 산업 평균 동일</ui>
                        <ui><input type="radio" name="5" value="3" checked={selectedOptions[6] === "3"} onChange={(event) => handleOptionChange(6, event)} />직전 1개년 교육훈련비 당해년도 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="5-1" value="1" defaultChecked={selectedOptions[7] === "1"} onChange={(event) => handleOptionChange(7, event)} />지난 5개년 교육훈련비 감소 추세</ui>
                        <ui><input type="radio" name="5-1" value="2" checked={selectedOptions[7] === "2"} onChange={(event) => handleOptionChange(7, event)} />지난 5개년 교육훈련비 변동 없음</ui>
                        <ui><input type="radio" name="5-1" value="3" checked={selectedOptions[7] === "3"} onChange={(event) => handleOptionChange(7, event)} />지난 5개년 교육훈련비 증가 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q6.</h3>
                    <p>조직의 과거 5개년 간 1인당 복리후생비가 증가 추세에 있는지, 동종산업 평균과 비교하여 1인당 복리후생비 지출의 상대적 수준은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="6" value="1" defaultChecked={selectedOptions[8] === "1"} onChange={(event) => handleOptionChange(8, event)} />직전 1개년 1인당 복리후생비가 산업 평균 미만</ui>
                        <ui><input type="radio" name="6" value="2" checked={selectedOptions[8] === "2"} onChange={(event) => handleOptionChange(8, event)} />직전 1개년 1인당 복리후생비가 산업 평균 동일</ui>
                        <ui><input type="radio" name="6" value="3" checked={selectedOptions[8] === "3"} onChange={(event) => handleOptionChange(8, event)} />직전 1개년 1인당 복리후생비가 산업 평균 초과</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="6-1" value="1" defaultChecked={selectedOptions[9] === "1"} onChange={(event) => handleOptionChange(9, event)} />지난 5개년 1인당 복리후생비가 감소 추세</ui>
                        <ui><input type="radio" name="6-1" value="2" checked={selectedOptions[9] === "2"} onChange={(event) => handleOptionChange(9, event)} />지난 5개년 1인당 복리후생비가 변동 없음</ui>
                        <ui><input type="radio" name="6-1" value="3" checked={selectedOptions[9] === "3"} onChange={(event) => handleOptionChange(9, event)} />지난 5개년 1인당 복리후생비가 증가 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q7.</h3>
                    <p>결사의 자유 보장 수준을 확인하기 위해 노동조합 조직, 단체협약 체결, 체결된 단체협약의 성실한 이행 등을 측정하고, 이와 병행하여 노사협력 수준을 측정하기 위해 노사협의회가 설치되어 관리되고 있는지, 정기회의 개최 등 실질적인 운영 수준은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="7" value="1" defaultChecked={selectedOptions[10] === "1"} onChange={(event) => handleOptionChange(10, event)} />노동조합 가입‧설립, 노사협의회 설치 관련 정보가 모두 없다.</ui>
                        <ui><input type="radio" name="7" value="2" checked={selectedOptions[10] === "2"} onChange={(event) => handleOptionChange(10, event)} />노동조합 가입‧설립 또는 상시근로자 30인 이상인 경우 노사협의회 설치</ui>
                        <ui><input type="radio" name="7" value="3" checked={selectedOptions[10] === "3"} onChange={(event) => handleOptionChange(10, event)} />2단계 + 과거 또는 현재 적법한 교섭당사자로서의 노동조합과 단체교섭 진행 + 3개월마다 노사협의회 정기회의 개최</ui>
                        <ui><input type="radio" name="7" value="4" checked={selectedOptions[10] === "4"} onChange={(event) => handleOptionChange(10, event)} />3단계 + 노동조합과 단체협약(임금협약 포함) 체결 + 노사협의회 정기회의 외 추가 임시회의(노사 실무협의 포함) 개최</ui>
                        <ui><input type="radio" name="7" value="5" checked={selectedOptions[10] === "5"} onChange={(event) => handleOptionChange(10, event)} />4단계 + 체결된 단체협약의 성실한 이행(단체협약 위반 시 불이행으로 간주) + 노사협의회 의결(합의) 여부 </ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q8.</h3>
                    <p>조직의 전체 구성원 중 여성 비율과, 미등기임원 중 여성 비율은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="8" value="1" defaultChecked={selectedOptions[11] === "1"} onChange={(event) => handleOptionChange(11, event)} />조직의 전체 구성원 중 여성이 차지하는 비율과, 미등기임원 중 여성이 차지하는 비율의 차이가 80%를 초과</ui>
                        <ui><input type="radio" name="8" value="2" checked={selectedOptions[11] === "2"} onChange={(event) => handleOptionChange(11, event)} />조직의 전체 구성원 중 여성이 차지하는 비율과, 미등기임원 중 여성이 차지하는 비율의 차이가 60% 초과 ~ 80% 이하</ui>
                        <ui><input type="radio" name="8" value="3" checked={selectedOptions[11] === "3"} onChange={(event) => handleOptionChange(11, event)} />조직의 전체 구성원 중 여성이 차지하는 비율과, 미등기임원 중 여성이 차지하는 비율의 차이가 40% 초과 ~ 60% 이하</ui>
                        <ui><input type="radio" name="8" value="4" checked={selectedOptions[11] === "4"} onChange={(event) => handleOptionChange(11, event)} />조직의 전체 구성원 중 여성이 차지하는 비율과, 미등기임원 중 여성이 차지하는 비율의 차이가 20% 초과 ~ 40% 이하</ui>
                        <ui><input type="radio" name="8" value="5" checked={selectedOptions[11] === "5"} onChange={(event) => handleOptionChange(11, event)} />조직의 전체 구성원 중 여성이 차지하는 비율과, 미등기임원 중 여성이 차지하는 비율의 차이가 20% 이하</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q9.</h3>
                    <p>조직의 1인 평균 급여액 대비 여성(또는 남성) 1인 평균 급여액 차이는 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="9" value="1" defaultChecked={selectedOptions[12] === "1"} onChange={(event) => handleOptionChange(12, event)} />조직의 1인 평균 급여액 대비 ‘여성(또는 남성) 1인 평균 급여액’ 비율이 60% 이하</ui>
                        <ui><input type="radio" name="9" value="2" checked={selectedOptions[12] === "2"} onChange={(event) => handleOptionChange(12, event)} />조직의 1인 평균 급여액 대비 ‘여성(또는 남성) 1인 평균 급여액’ 비율이 60% 초과 ~ 70% 이하</ui>
                        <ui><input type="radio" name="9" value="3" checked={selectedOptions[12] === "3"} onChange={(event) => handleOptionChange(12, event)} />조직의 1인 평균 급여액 대비 ‘여성(또는 남성) 1인 평균 급여액’ 비율이 70% 초과 ~ 80% 이하</ui>
                        <ui><input type="radio" name="9" value="4" checked={selectedOptions[12] === "4"} onChange={(event) => handleOptionChange(12, event)} />조직의 1인 평균 급여액 대비 ‘여성(또는 남성) 1인 평균 급여액’ 비율이 80% 초과 ~ 90% 이하</ui>
                        <ui><input type="radio" name="9" value="5" checked={selectedOptions[12] === "5"} onChange={(event) => handleOptionChange(12, event)} />조직의 1인 평균 급여액 대비 ‘여성(또는 남성) 1인 평균 급여액’ 비율이 90%를 초과</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q10.</h3>
                    <p>조직의 직전 1개 회계연도 장애인 고용률을 법적 의무고용률은 어느정도 입니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="10" value="1" defaultChecked={selectedOptions[13] === "1"} onChange={(event) => handleOptionChange(13, event)} />직전 1개년 장애인 의무고용률의 60% 미만</ui>
                        <ui><input type="radio" name="10" value="2" checked={selectedOptions[13] === "2"} onChange={(event) => handleOptionChange(13, event)} />직전 1개년 장애인 고용률이 법적 의무고용률의 60% 이상 80% 미만</ui>
                        <ui><input type="radio" name="10" value="3" checked={selectedOptions[13] === "3"} onChange={(event) => handleOptionChange(13, event)} />직전 1개년 장애인 고용률이 법적 의무고용률의 80% 이상 100% 미만</ui>
                        <ui><input type="radio" name="10" value="4" checked={selectedOptions[13] === "4"} onChange={(event) => handleOptionChange(13, event)} />직전 1개년 장애인 고용률이 법적 의무고용률의 100% 이상 120% 미만</ui>
                        <ui><input type="radio" name="10" value="5" checked={selectedOptions[13] === "5"} onChange={(event) => handleOptionChange(13, event)} />직전 1개년 장애인 고용률이 법적 의무고용률의 120% 이상</ui>
                    </div>
                </div>

                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q11.</h3>
                    <p>조직의 안전보건 관리가 체계적으로 추진되고 있는지 점검하기 위해 ①경영자 리더십, ②근로자 참여,③위험요인 파악 및 제거·대체·통제, ④비상조치 계획의 수립, ⑤평가 및 개선을 하였습니까? ( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="12" value="1" checked={selectedOptionsQ12[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q12")} />경영자가 확고한 리더십으로 비전을 제시하고 필요한 자원을 배정했다.</ui>
                        <ui><input type="checkbox" name="12" value="2" checked={selectedOptionsQ12[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q12")} />안전보건관리체계 구축을 위해 근로자의 참여 및 협의를 보장했다.</ui>
                        <ui><input type="checkbox" name="12" value="3" checked={selectedOptionsQ12[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q12")} />조직의 위험요인 파악과 이에 대한 제거·대체·통제 조치했다.</ui>
                        <ui><input type="checkbox" name="12" value="4" checked={selectedOptionsQ12[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q12")} />중대한 위험요인에 대처할 수 있는 비상 조치계획을 수립했다.</ui>
                        <ui><input type="checkbox" name="12" value="5" checked={selectedOptionsQ12[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q12")} />안전보건 과제 및 목표의 이행현황을 평가하고 개선했다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q12.</h3>
                    <p>조직의 지난 5개년 간 산업재해율이 감소 추세에 있는지, 지난 1개년 산업재해율이 미만입니까?</p>
                    <div className="grid gap-3 grid-rows-3 w-full pb-3 border-solid border-b-2">
                        <ui><input type="radio" name="13" value="1" defaultChecked={selectedOptions[16] === "1"} onChange={(event) => handleOptionChange(16, event)} />직전 1개년 산업재해율 당해년도 산업평균 초과</ui>
                        <ui><input type="radio" name="13" value="2" checked={selectedOptions[16] === "2"} onChange={(event) => handleOptionChange(16, event)} />직전 1개년 산업재해율 당해년도 산업평균 동일</ui>
                        <ui><input type="radio" name="13" value="3" checked={selectedOptions[16] === "3"} onChange={(event) => handleOptionChange(16, event)} />직전 1개년 산업재해율 당해년도 산업평균 미만</ui>
                    </div>
                    <div className="grid gap-3 grid-rows-3 w-full mt-3">
                        <ui><input type="radio" name="13-1" value="1" defaultChecked={selectedOptions[17] === "1"} onChange={(event) => handleOptionChange(17, event)} />지난 5개년 산업재해율 증가 추세</ui>
                        <ui><input type="radio" name="13-1" value="2" checked={selectedOptions[17] === "2"} onChange={(event) => handleOptionChange(17, event)} />지난 5개년 산업재해율 변동 없음</ui>
                        <ui><input type="radio" name="13-1" value="3" checked={selectedOptions[17] === "3"} onChange={(event) => handleOptionChange(17, event)} />지난 5개년 산업재해율 감소 추세</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q13.</h3>
                    <p>조직의 인권정책 내 아래의 이슈 중 어떠한 이슈가 다루어지고 있습니까? <br></br>(예시 1) 차별금지, 2) 근로조건 준수, 3) 인도적 대우, 4) 강제근로 금지, 5) 아동노동 착취 금지, 6) 결사 및 단체교섭의 자유, 7) 산업안전 보장, 8) 지역주민 인권 보호, 9) 고객의 인권 보호, 10)기타 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="14" value="1" defaultChecked={selectedOptions[18] === "1"} onChange={(event) => handleOptionChange(18, event)} />조직의 대외공식적 인권정책이 수립되지 않은 경우. 또는, 인권정책이 있으나, 상기의 이슈 중 1~2개에 대한 조직의 정책적 접근방향이 설명되어 있다.</ui>
                        <ui><input type="radio" name="14" value="2" checked={selectedOptions[18] === "2"} onChange={(event) => handleOptionChange(18, event)} />상기의 이슈 중 3~4개에 대한 조직의 정책적 접근방향이 설명되어 있다.</ui>
                        <ui><input type="radio" name="14" value="3" checked={selectedOptions[18] === "3"} onChange={(event) => handleOptionChange(18, event)} />상기의 이슈 중 5~6개에 대한 조직의 정책적 접근방향이 설명되어 있다.</ui>
                        <ui><input type="radio" name="14" value="4" checked={selectedOptions[18] === "4"} onChange={(event) => handleOptionChange(18, event)} />상기의 이슈 중 7~8개에 대한 조직의 정책적 접근방향이 설명되어 있다.</ui>
                        <ui><input type="radio" name="14" value="5" checked={selectedOptions[18] === "5"} onChange={(event) => handleOptionChange(18, event)} />상기의 이슈 중 9개 이상에 대한 조직의 정책적 접근방향이 설명되어 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q14.</h3>
                    <p>조직의 인권 리스크 평가 체계의 구체성 및 실제 기능을 구축하였습니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="15" value="1" defaultChecked={selectedOptions[14] === "1"} onChange={(event) => handleOptionChange(14, event)} />인권 리스크 평가 지표, 평가 기준, 평가 일정 등의 체계가 구축되지 않았다.</ui>
                        <ui><input type="radio" name="15" value="2" checked={selectedOptions[14] === "2"} onChange={(event) => handleOptionChange(14, event)} />인권 리스크 평가 지표, 평가 기준, 평가 일정 등의 체계가 구축되어 있다. 단, 해당 인권 리스크 평가 체계를 운용하지 않았다.</ui>
                        <ui><input type="radio" name="15" value="3" checked={selectedOptions[14] === "3"} onChange={(event) => handleOptionChange(14, event)} />인권 리스크 평가 체계를 구축하고 있으나, 온라인/서면 등 비대면 방식으로 인권 리스크 진단 행위만 실시했다.</ui>
                        <ui><input type="radio" name="15" value="4" checked={selectedOptions[14] === "4"} onChange={(event) => handleOptionChange(14, event)} />인권 리스크 평가 체계를 구축하고 있으며, 온라인/서면 등 비대면 방식의 진단과 함께, 고위험 인권 리스크에 대해서는 현장실사까지 실시했다.</ui>
                        <ui><input type="radio" name="15" value="5" checked={selectedOptions[14] === "5"} onChange={(event) => handleOptionChange(14, event)} />인권 리스크 평가 체계를 구축하고 있으며, 비대면 진단 및 현장실사 행위를 실시한 경우. 또한, 확인된 인권 리스크에 대한 개선계획/개선활동을 추진했다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q15.</h3>
                    <p>조직의 협력사 ESG 리스크 관리 체계가 구체화되어 있으며, 실제 기능하고 있습니까?</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="16" value="1" defaultChecked={selectedOptions[15] === "1"} onChange={(event) => handleOptionChange(15, event)} />협력사 ESG 리스크 평가 지표, 평가 기준, 평가 일정 등의 관리 체계가 구축되지 않았다.</ui>
                        <ui><input type="radio" name="16" value="2" checked={selectedOptions[15] === "2"} onChange={(event) => handleOptionChange(15, event)} />협력사 ESG 리스크 평가 지표, 평가 기준, 평가 일정 등의 관리 체계를 구축하고 있으나, 해당 협력사 ESG 리스크 관리 체계를 운용하지 않았다.</ui>
                        <ui><input type="radio" name="16" value="3" checked={selectedOptions[15] === "3"} onChange={(event) => handleOptionChange(15, event)} />협력사 ESG 리스크 관리 체계를 구축하고 있으나, 온라인/서면 등 비대면 방식으로 리스크 진단 행위만 실시했다.</ui>
                        <ui><input type="radio" name="16" value="4" checked={selectedOptions[15] === "4"} onChange={(event) => handleOptionChange(15, event)} />협력사 ESG 리스크 관리 체계를 구축하고 있으며, 온라인/서면 등 비대면 방식의 진단과 함께, 고위험 ESG 리스크에 대해서는 현장실사까지 실시했다.</ui>
                        <ui><input type="radio" name="16" value="5" checked={selectedOptions[15] === "5"} onChange={(event) => handleOptionChange(15, event)} />협력사 ESG 리스크 관리 체계를 구축하고 있으며, 비대면 진단 및 현장실사 행위를 실시한 경우. 또한, 확인된 리스크에 대한 개선계획/개선활동을 추진했다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q16.</h3>
                    <p>협력사의 ESG 지원을 구체적이고 체계적으로 추진하는 조직의 노력 수준은 어느정도 입니까?( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="17" value="1" checked={selectedOptionsQ17[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q17")} />협력사 ESG 지원에 관한 공식적 선언을 하고 있다.</ui>
                        <ui><input type="checkbox" name="17" value="2" checked={selectedOptionsQ17[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q17")} />협력사 ESG 지원 전략방향, 추진영역을 제시하고 있다.</ui>
                        <ui><input type="checkbox" name="17" value="3" checked={selectedOptionsQ17[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q17")} />협력사 ESG 지원 전략방향 및 추진영역별 세부 실행과제를 제시하고 있다.</ui>
                        <ui><input type="checkbox" name="17" value="4" checked={selectedOptionsQ17[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q17")} />협력사 ESG 지원에 관한 성과관리 지표(KPIs)를 제시하고 있다.</ui>
                        <ui><input type="checkbox" name="17" value="5" checked={selectedOptionsQ17[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q17")} />협력사 ESG 지원에 관한 성과관리 지표(KPIs) 달성을 위해 투자재원(예산), 역량투입(인력) 방안을 마련했다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q17.</h3>
                    <p>협력사와 협약을 통해 ESG 지원을 다각적 방식으로 추진하고 있습니까?( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="18" value="1" checked={selectedOptionsQ18[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q18")} />협력사의 ESG 추진에 필요한 교육 운영 지원 협약 체결</ui>
                        <ui><input type="checkbox" name="18" value="2" checked={selectedOptionsQ18[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q18")} />협력사의 ESG 추진에 필요한 기술 및 R&D 지원 협약 체결</ui>
                        <ui><input type="checkbox" name="18" value="3" checked={selectedOptionsQ18[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q18")} />협력사의 ESG 추진에 필요한 금융 및 자금 지원 협약 체결</ui>
                        <ui><input type="checkbox" name="18" value="4" checked={selectedOptionsQ18[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q18")} />협력사의 ESG 추진에 필요한 인허가 획득 지원 협약 체결</ui>
                        <ui><input type="checkbox" name="18" value="5" checked={selectedOptionsQ18[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q18")} />협력사의 ESG 추진에 필요한 설비/장치 도입 지원 협약 체결</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q18.</h3>
                    <p>전략적이고 체계적으로 사회공헌을 추진하려는 조직의 노력 수준은 어느정도 입니까?( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="19" value="1" checked={selectedOptionsQ19[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q19")} />조직의 사회공헌을 대표할 수 있으며, 대사회적 메시지로써 활용되는 사회공헌 미션, 비전, 또는 슬로건이 있다.</ui>
                        <ui><input type="checkbox" name="19" value="2" checked={selectedOptionsQ19[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q19")} />조직의 사회공헌 미션, 비전, 또는 슬로건을 달성하기 위한 사회공헌추진 분야/영역을 제시하고 있다.</ui>
                        <ui><input type="checkbox" name="19" value="3" checked={selectedOptionsQ19[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q19")} />조직의 사회공헌 추진 분야/영역별 대표 프로그램을 제시하고 있다.</ui>
                        <ui><input type="checkbox" name="19" value="4" checked={selectedOptionsQ19[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q19")} />조직의 사회공헌 대표 프로그램별 중장기 실행계획을 마련하고 있다.</ui>
                        <ui><input type="checkbox" name="19" value="5" checked={selectedOptionsQ19[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q19")} />조직의 대표 사회공헌 프로그램이 사업적 또는 사회적으로 기여하는 성과를 측정할 수 있는 성과관리 지표(KPIs)가 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q19.</h3>
                    <p>봉사활동 참여 인센티브 제도를 다각적으로 운영하고 있습니까? <br></br>(예시 1) 구성원 KPIs 내 봉사활동 반영, 2) 봉사활동 참여 유급휴가, 3) 봉사활동 참여 비용 지원, 4) 우수 봉사활동 참여자 금전적 포상, 5) 우수 봉사활동 참여자 표창, 6) 자율봉사자 대상 네트워킹 모임 지원, 7) 자원봉사처 연계, 8) 기타 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="radio" name="20" value="1" defaultChecked={selectedOptions[24] === "1"} onChange={(event) => handleOptionChange(24, event)} />봉사활동 참여 인센티브 제도가 없다.</ui>
                        <ui><input type="radio" name="20" value="2" checked={selectedOptions[24] === "2"} onChange={(event) => handleOptionChange(24, event)} />현재, 봉사활동 참여자에 대한 인센티브 제도가 없으나, 향후, 봉사활동 참여 인센티브 제도 도입계획이 있다.</ui>
                        <ui><input type="radio" name="20" value="3" checked={selectedOptions[24] === "3"} onChange={(event) => handleOptionChange(24, event)} />상기 봉사활동 참여 인센티브 제도 중 1개를 도입하고 있다.</ui>
                        <ui><input type="radio" name="20" value="4" checked={selectedOptions[24] === "4"} onChange={(event) => handleOptionChange(24, event)} />상기 봉사활동 참여 인센티브 제도 중 2개를 도입하고 있다.</ui>
                        <ui><input type="radio" name="20" value="5" checked={selectedOptions[24] === "5"} onChange={(event) => handleOptionChange(24, event)} />상기 봉사활동 참여 인센티브 제도 중 3개 이상을 도입하고 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q20.</h3>
                    <p>정보통신망 및 기타 정보자산 등을 체계적으로 관리하려는 조직의 노력 수준은 어느정도 입니까?( 중복선택 가능 )</p>
                    <div className="grid gap-3 grid-rows-5 w-full">
                        <ui><input type="checkbox" name="21" value="1" checked={selectedOptionsQ21[0].includes("1")} onChange={(event) => handleOptionChangecheck(0, event, "Q21")} />등기임원이나 미등기임원(또는 이에 준하는 관리자급 구성원)을 정보보호 최고책임자(CISO)로 선임하고 있다.</ui>
                        <ui><input type="checkbox" name="21" value="2" checked={selectedOptionsQ21[1].includes("2")} onChange={(event) => handleOptionChangecheck(1, event, "Q21")} />정보보호 시스템의 안정성에 대해 제3자(또는 규제기관)의 인증을 획득하고 있다.</ui>
                        <ui><input type="checkbox" name="21" value="3" checked={selectedOptionsQ21[2].includes("3")} onChange={(event) => handleOptionChangecheck(2, event, "Q21")} />모의해킹 등 외부공격에 대한 취약성 분석을 실시하고 있다.</ui>
                        <ui><input type="checkbox" name="21" value="4" checked={selectedOptionsQ21[3].includes("4")} onChange={(event) => handleOptionChangecheck(3, event, "Q21")} />정보보호 공시(의무 또는 자율)사항을 이행하고 있다.</ui>
                        <ui><input type="checkbox" name="21" value="5" checked={selectedOptionsQ21[4].includes("5")} onChange={(event) => handleOptionChangecheck(4, event, "Q21")} />정보보호 시스템의 손상 또는 외부공격 등 정보보안 관련 사고에 대비하기 위한 보험에 가입하고 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q21.</h3>
                    <p>조직의 지난 5개년 간 개인정보 보호 관련 법/규제 위반 한적이 있습니까?</p>
                    <div className="grid gap-3 grid-rows-4 w-full">
                        <ui><input type="radio" name="22" value="1" defaultChecked={selectedOptions[26] === "1"} onChange={(event) => handleOptionChange(26, event)} />지난 5개년 간 개인정보 보호 관련 법/규제 위반 한적이 없다.</ui>
                        <ui><input type="radio" name="22" value="2" checked={selectedOptions[26] === "2"} onChange={(event) => handleOptionChange(26, event)} />지난 5개년 간 개인정보 보호 관련 법/규제 위반내역 중 처분이 확정된 건수에 대해, 처벌수위가 사법상 형벌, 벌금, 과료인 경우, 또는 국가나 지방자치단체를 당사자로 하는 계약에서 입찰참가자격을 제한당한적이 있다.</ui>
                        <ui><input type="radio" name="22" value="3" checked={selectedOptions[26] === "3"} onChange={(event) => handleOptionChange(26, event)} />지난 5개년 간 개인정보 보호 관련 법/규제 위반내역 중 처분이 확정된 건수에 대해, 처벌수위가 행정상 처분 중 금전적 처분에 해당하는 과태료, 과징금, 이행강제금을 받은적이 있다.</ui>
                        <ui><input type="radio" name="22" value="4" checked={selectedOptions[26] === "4"} onChange={(event) => handleOptionChange(26, event)} />지난 5개년 간 개인정보 보호 관련 법/규제 위반내역 중 처분이 확정된 건수에 대해, 처벌수위가 행정상 처분 중 비금전적 처분에 해당하는 시정명령, 시정권고, 경고를 받은적이 있다.</ui>
                    </div>
                </div>
                <div className="shadow p-3 rounded-4 border-solid border-2 border-indigo-600 mb-3">
                    <h3>Q22.</h3>
                    <p>조직의 지난 5개년 간 사회 법/규제위반 한적이 있습니까?</p>
                    <div className="grid gap-3 grid-rows-4 w-full">
                        <ui><input type="radio" name="23" value="1" defaultChecked={selectedOptions[27] === "1"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 간 사회 관련 법/규제 위반 한적이 없다.</ui>
                        <ui><input type="radio" name="23" value="2" checked={selectedOptions[27] === "2"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 간 사회 관련 법/규제 위반내역 중 처분이 확정된 건수에 대해, 처벌수위가 사법상 형벌, 벌금, 과료인 경우, 또는 국가나 지방자치단체를 당사자로 하는 계약에서 입찰참가자격을 제한당한적이 있다.</ui>
                        <ui><input type="radio" name="23" value="3" checked={selectedOptions[27] === "3"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 간 사회 관련 법/규제 위반내역 중 처분이 확정된 건수에 대해, 처벌수위가 행정상 처분 중 금전적 처분에 해당하는 과태료, 과징금, 이행강제금을 받은적이 있다.</ui>
                        <ui><input type="radio" name="23" value="4" checked={selectedOptions[27] === "4"} onChange={(event) => handleOptionChange(27, event)} />지난 5개년 간 사회 관련 법/규제 위반내역 중 처분이 확정된 건수에 대해, 처벌수위가 행정상 처분 중 비금전적 처분에 해당하는 시정명령, 시정권고, 경고를 받은적이 있다.</ui>
                    </div>
                </div>
                <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a href="/survey1" aria-current="page" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            1
                        </a>
                        <a className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
