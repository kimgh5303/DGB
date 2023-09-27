/* eslint-disable */
import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
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

          await dgbTransferBind(contract);
          //await printBalanceOf(contract);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { dgbArtifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  // esg 컨트랙트 초기화
  const esgInit = useCallback(
    async esgArtifact => {
      if (esgArtifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = esgArtifact;
        let address, contract;

        try {
          address = esgArtifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          //await printName(contract);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { esgArtifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  // dgb test 용 함수 - 토큰 총량 불러오기
  const printBalanceOf = async (instance) => {
    let dgbInstance;
    dgbInstance = instance;
    dgbInstance.methods.totalSupply().call().then(function (result) {
      document.getElementById("test").textContent = result;
    }).catch(function (err) {
      console.log(err.message);
    })
  };

  // esg test 용 함수 - esg 토큰 이름 불러오기
  const printName = async (instance) => {
    let esgInstance;
    esgInstance = instance;
    esgInstance.methods.name().call().then(function (result) {
      document.getElementById("test2").textContent = result;
    }).catch(function (err) {
      console.log(err.message);
    })
  };


  // dgb 함수 - transfer 송금 - company 페이지 - "기부하기" 버튼, "댓글 게시" 버튼 연결
  const dgbTransferBind = async (instance) => {
    try {
      // 변수 선언
      let dgbInstance, don, toAcc, fromAcc;
      dgbInstance = instance;
      fromAcc = window.web3.currentProvider.selectedAddress.toString();

      // 기부하기 (user -> company)
      const donationButton = document.getElementById("donation");
      donationButton.addEventListener("click", function () {
        don = document.getElementById("price").value;
        toAcc = document.getElementById("toAcc").textContent;
        dgbInstance.methods.transfer(toAcc, don).send({ from: fromAcc }).then(function (receipt) {
          console.log(receipt.transactionHash);
        }).catch(function (err) {
          console.log(err.message);
        })
      });

      // 댓글 게시 (dgb -> user)
      const commentButton = document.getElementById("comment");
      commentButton.addEventListener("click", function () {
        don = 1;
        dgbInstance.methods.reward(don).send({ from: fromAcc }).then(function (receipt) {
          console.log(receipt.transactionHash);
        }).catch(function (err) {
          console.log(err.message);
        })
      });


    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const tryInit = async () => {
      try {
        const dgbArtifact = require("../../contracts/DGB.json");
        const esgArtifact = require("../../contracts/ESG.json");
        dgbInit(dgbArtifact);
        esgInit(esgArtifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [dgbInit, esgInit]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      dgbInit(state.dgbArtifact);
      esgInit(state.esgArtifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [dgbInit, state.dgbArtifact, esgInit, state.esgArtifact]);


  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
