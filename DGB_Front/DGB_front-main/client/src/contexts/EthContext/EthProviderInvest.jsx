/* eslint-disable */
import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
// 백 데이터 전송용
import { serverIP, dgbID } from "../../axioses/config.jsx";
import axios from "axios";

function EthProviderInvest({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

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
					await dgbInvestBind(contract);
				} catch (err) {
					console.error(err);
				}
				dispatch({
					type: actions.init,
					data: { dgbArtifact, web3, accounts, networkID, contract }
				});
			}
		}, []);


	// dgb 함수 - invest 투자하기 - managecom 페이지
	// "투자 승인" 버튼 연결
	// 투자 승인 후 트랜잭션 DB에 저장
	const dgbInvestBind = async (instance) => {
		try {
			// 변수 선언
			let dgbInstance, don, fromAcc, txid;
			dgbInstance = instance;

			fromAcc = document.getElementById("companybcid").textContent;

			// 투자 (company -> dgb)
			const investButton = document.getElementById("invest");
			investButton.addEventListener("click", function () {
				don = parseInt(document.getElementById("priceD").textContent);

				dgbInstance.methods.invest(fromAcc, don)
					.send({ from: dgbID })
					.then(async function (receipt) {
						txid = receipt.transactionHash;
						await dgbBack(txid, dgbID, fromAcc, don, "investments");
					}).catch(function (err) {
						console.log(err.message);
					})
			});
		} catch (err) {
			console.error(err);
		}
	};



	// Back 서버로 데이터 넘기기
	const dgbBack = async (txid, to, from, value, _type) => {
		try {
			// 변수 선언
			let type, request, data
			const companyId = document.getElementById("companyId").textContent;

			type = _type;

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
			document.location.href = `/managemain/${companyId}`;

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
			dispatch
		}}>
			{children}
		</EthContext.Provider>
	);
}

export default EthProviderInvest;
