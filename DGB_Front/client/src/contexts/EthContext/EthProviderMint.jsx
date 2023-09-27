/* eslint-disable */
import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
// 백 데이터 전송용
import { serverIP } from "../../axioses/config.jsx";
import axios, { formToJSON } from "axios";

function EthProviderMint({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

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
          address = await getCompanyBack();
          console.log(address);
          contract = new web3.eth.Contract(abi, address);
          await esgMintBind(contract);
          await esgMintCheckBind(contract);
          console.log();
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { esgArtifact, web3, accounts, networkID, contract }
        });
      }
    }, []);


  // esg 함수 - mint 보고서 NFT에 등록 - esgreport.jsx 보고서 등록하기 페이지
  // "승인하기" 버튼 연결
  const esgMintBind = async (instance) => {
    try {
      // 변수 선언
      let esgInstance, fromAcc, s3url, reportId;
      esgInstance = instance;
      fromAcc = window.web3.currentProvider.selectedAddress.toString();
      s3url = document.getElementById("s3url").textContent;
      // console.log(s3url);

      // 보고서 민팅
      const reportButton = document.getElementById("mint");
      reportButton.addEventListener("click", function () {
        esgInstance.methods.mint(s3url)
          .send({ from: fromAcc })
          .then(async function (result) {
            reportId = result.events.Mint.returnValues.tokenId;
            await dgbBackMint(esgInstance._address, reportId);
            console.log(result.events.Mint.returnValues.tokenURI);
          }).catch(function (err) {
            console.log(err.message);
          })
      });

    } catch (err) {
      console.error(err);
    }
  };

  // esg 함수 - minting된 보고서 확인
  const esgMintCheckBind = async (instance) => {
    try {
      // 변수 선언
      let esgInstance, tokenId;
      esgInstance = instance;
      // tokenId = 1;

      // 보고서 민팅
      const checkButton = document.getElementById("check");
      checkButton.addEventListener("click", function () {
        esgInstance.methods.owner().call().then(function (result) {
          console.log(result);
        }).catch(function (err) {
          console.log(err.message);
        })
      });
      // checkButton.addEventListener("click", function () {
      //   esgInstance.methods.tokenURI(tokenId).call().then(function (result) {
      //     console.log(result);
      //   }).catch(function (err) {
      //     console.log(err.message);
      //   })
      // });

    } catch (err) {
      console.error(err);
    }
  };


  // Back 서버에서 회사 정보 받아오기 - 소유한 컨트랙트 NFT 주소 반환
  const getCompanyBack = async () => {
    const companyId = document.getElementById("companyId").textContent;
    const request = await axios.get(serverIP + "/companies/" + companyId);

    let result;
    await axios.all([request])
      .then(axios.spread((response) => {
        result = response.data.data.contractaddr;
      }))
      .catch(error => {
        console.error(error);
      });

    return result;
  }

  // Back 서버로 데이터 넘기기 - 민팅 후 보고서 ID 넘기기
  const dgbBackMint = async (esgAddr, reportId) => {
    try {
      // 변수 선언
      const companyId = document.getElementById("companyId").textContent;
      let request;

      let data = {
        "contractaddr": esgAddr,
        "reportid": reportId
      };

      request = axios.post(serverIP + "/reports/indexes", JSON.stringify(data), {
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

      alert("민팅이 성공적으로 완료되었습니다.");
      document.location.href = `/cdetail/${companyId}`;

    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    const tryInit = async () => {
      try {
        const esgArtifact = require("../../contracts/ESG.json");
        esgInit(esgArtifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [esgInit]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      esgInit(state.esgArtifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [esgInit, state.esgArtifact]);


  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProviderMint;
