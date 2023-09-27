/* eslint-disable */
import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
// 백 데이터 전송용
import { serverIP, dgbID } from "../../axioses/config.jsx";
import axios from "axios";

function EthProviderManage({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    // JSW 수정
    const [Code, setCode] = useState(0);
    // JSW 수정/

    // dgb 컨트랙트 초기화
    const dgbInit = useCallback(
        async dgbArtifact => {
            if (dgbArtifact) {
                const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
                const accounts = await web3.eth.requestAccounts();
                const networkID = await web3.eth.net.getId();
                const { abi } = dgbArtifact;
                let address, contract;

                try {
                    address = dgbArtifact.networks[networkID].address;
                    contract = new web3.eth.Contract(abi, address);
                    await printToken(contract);
                    await dgbManageBind(contract);
                } catch (err) {
                    console.error(err);
                }
                dispatch({
                    type: actions.init,
                    data: { dgbArtifact, web3, accounts, networkID, contract }
                });
            }
        }, []);


    // dgb 함수 - increase, decrease 토큰총량 증감 / confiscate 몰수하기 - managemain 페이지
    // "증가, 감소" 버튼, "몰수" 버튼 연결
    // confiscate 후 트랜잭션 DB에 저장
    const dgbManageBind = async (instance) => {
        try {
            // 변수 선언
            let dgbInstance, don, fromAcc, txid;
            dgbInstance = instance;

            // 증가 (dgb -> contract)
            const increaseButton = document.getElementById("increase");

            increaseButton.addEventListener("click", function () {
                // JSW 수정
                const value = document.getElementById("priceID").value
                if (value === '') {
                    return;
                }
                don = parseInt(value, 10);
                // JSW 수정/
                dgbInstance.methods.increase(don)
                    .send({ from: dgbID })
                    .then(async function () {
                        document.location.href = `/managemain`
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        setCode(err.code);
                    })
            });

            // 감소 (dgb -> contract)
            const decreaseButton = document.getElementById("decrease");

            decreaseButton.addEventListener("click", function () {
                // JSW 수정
                const value = document.getElementById("priceID").value
                if (value === '') {
                    return;
                }
                don = parseInt(value, 10);
                // JSW 수정/
                dgbInstance.methods.decrease(don)
                    .send({ from: dgbID })
                    .then(async function () {
                        document.location.href = `/managemain`
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        setCode(err.code);
                    })
            });

            // 몰수 (company, user -> dgb)
            const confiscateButton = document.getElementById("confiscate");

            confiscateButton.addEventListener("click", function () {
                // JSW 수정
                const value = document.getElementById("priceC").value
                if (value === '') {
                    return;
                }
                don = parseInt(value, 10);
                // JSW 수정/
                fromAcc = document.getElementById("companyId").value;
                dgbInstance.methods.confiscate(fromAcc, don)
                    .send({ from: dgbID })
                    .then(async function (receipt) {
                        txid = receipt.transactionHash;
                        await dgbBack(txid, dgbID, fromAcc, don, "seizures");
                        document.location.href = `/managemain`
                    })
                    .catch(function (err) {
                        console.log(err.message);
                        setCode(err.code);
                    })
            });
        } catch (err) {
            console.error(err);
        }
    };

    // dgb 함수 - totalSupply 토큰총량 / balanceOf 보유토큰 - managemain 페이지
    const printToken = async (instance) => {
        let dgbInstance;
        dgbInstance = instance;

        // 토큰 총량
        dgbInstance.methods.totalSupply().call().then(function (result) {
            document.getElementById("total").textContent = result + " don";
        }).catch(function (err) {
            console.log(err.message);
        })

        // 보유 토큰
        dgbInstance.methods.balanceOf(dgbID).call().then(function (result) {
            document.getElementById("balance").textContent = result + " don";
        }).catch(function (err) {
            console.log(err.message);
        })
    };



    // Back 서버로 데이터 넘기기
    const dgbBack = async (txid, to, from, value, _type) => {
        try {
            // 변수 선언
            let type, request, data

            type = _type;  // seizures

            data = {
                "transid": txid,
                "fromid": from,
                "toid": to,
                "value": value,
            };

            request = axios.post(serverIP + "/transactions/" + type, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            axios.all([request])
                .then(axios.spread((response) => {
                    console.log(response.data);
                }))
                .catch(error => {
                    console.error(error);
                });

            alert("트랜잭션이 성공적으로 기록되었습니다.");
            // JSW 수정
            setCode(1);
            // JSW 수정/
            document.location.href = `/managemain`

        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        const tryInit = async () => {
            try {
                const dgbArtifact = require("../../contracts/DGB.json");
                dgbInit(dgbArtifact);
            } catch (err) {
                console.error(err);
            }
        };

        tryInit();
    }, [dgbInit]);

    useEffect(() => {
        const events = ["chainChanged", "accountsChanged"];
        const handleChange = () => {
            dgbInit(state.dgbArtifact);
        };

        events.forEach(e => window.ethereum.on(e, handleChange));
        return () => {
            events.forEach(e => window.ethereum.removeListener(e, handleChange));
        };
    }, [dgbInit, state.dgbArtifact]);


    return (
        <EthContext.Provider value={{
            state,
            dispatch,
            // JSW 수정
            Code,
            setCode
            // JSW 수정/
        }}>
            {children}
        </EthContext.Provider>
    );
}

export default EthProviderManage;
