import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { serverIP } from "../axioses/config";
import { EthContext, EthProviderETH } from "../contexts/EthContext";

function CustomButton({ Text, onClickHandle = () => ({}), id }) {
    return (
        <button
            className="flex mx-3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onClickHandle}
            id={id}
        >
            {Text}
        </button>
    );
}

export default function NewUserList() {
    return (
        <EthProviderETH>
            <NewUserListForm />
        </EthProviderETH>
    )
}
function NewUserListForm() {
    const [NewUserData, SetUserData] = useState([]);
    const [checkboxItem, setCheckboxItem] = useState({});

    const { Code, setCode } = useContext(EthContext);

    useEffect(() => {
        onClickRefresh();
    }, []);

    const isAllSelected = () => {
        //console.log(Object.keys(checkboxItem).length)
        if (Object.keys(checkboxItem).length === 0) return false;
        for (let key in checkboxItem) {
            if (!checkboxItem[key]) {
                return false;
            }
        }
        return true;
    };

    const handleChange = (e) => {
        setCheckboxItem({ ...checkboxItem, [e.target.name]: e.target.checked });
    };

    const onClickRefresh = () => {
        axios
            .get(serverIP + "/admins/permissions")
            .then((response) => {
                const res = response.data;
                SetUserData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onClickSelectAll = () => {
        if (Array.isArray(NewUserData)) {
            const updatedCheckboxState = NewUserData.reduce((acc, cur) => {
                acc[cur] = !isAllSelected();
                return acc;
            }, {});

            setCheckboxItem(updatedCheckboxState);
        }
    };

    useEffect(()=>{
        onClickSendData();
    },[Code])

    const onClickSendData = () => {
        if (Code === 1) {
            const selectedItem = [];
            for (let key in checkboxItem) {
                if (checkboxItem[key]) {
                    selectedItem.push(key);
                }
            }
            if (selectedItem.length === 0) {
                alert("선택된 항목이 없습니다.");
                return;
            } else {
                axios
                    .post(serverIP + "/admins/update-permissions", selectedItem)
                    .then((response) => {
                        console.log(response);
                        onClickRefresh();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else if (Code === 0) {
            return;
        } else {
            alert(`트랜잭션 처리 실패\nError Code : ${Code}`);
            document.location.href = '/managemain';
            setCode(0);
        }
    };

    return (
        <div>
            <div className="d-flex justify-between">
                <h2 className="text-4xl font-bold tracking-tight">신규 회원 리스트</h2>
                <div className="grid grid-cols-3 place-content-center">
                    <CustomButton Text={"새로 고침"} onClickHandle={onClickRefresh} />
                    <CustomButton
                        Text={isAllSelected() ? "전체 해제" : "전체 선택"}
                        onClickHandle={onClickSelectAll}
                    />
                    <CustomButton id="send" Text={"ETH 전송"} />
                </div>
            </div>
            <div className="card overflow-hidden shadow rounded-4 border-0 mb-5">
                <div className="card-body p-0 h-60">
                    <div className="border-0 rounded-4 h-full w-full p-4 overflow-y-scroll">
                        {Array.isArray(NewUserData) &&
                            NewUserData.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex space-x-3 text-indigo-600 fw-bolder mb-2"
                                >
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={item}
                                            checked={checkboxItem[item]}
                                            onChange={handleChange}
                                            className="form-checkbox h-5 w-5  mr-3"
                                        />
                                        {item}
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}