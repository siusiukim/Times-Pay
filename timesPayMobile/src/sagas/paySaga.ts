import { call, put, takeEvery } from "redux-saga/effects";
import {
  PAY_START_REQUEST,
  PAY_ESTIMATE
} from '../actions/actionTypes';

import {
  payStart,
  paySuccess,
  payFailed,
  payEstimateSuccess
} from '../actions/payAction';

import {
  transfer,
  estimateTransfer
} from '../api/contract'

export function* watchPay() {
  yield takeEvery(PAY_START_REQUEST, payFlow);
}

export function* watchEstimate() {
  yield takeEvery(PAY_ESTIMATE, payEstimateFlow);
}
function* payFlow(action) {
  console.log("payFlow", action);
  try{
    const { destAddress, contract, amount } = action.payload;
    let newDestAddress = destAddress ;
    if(destAddress[0] != "0"){
      newDestAddress = destAddress.slice(9)
    }
    yield put(payStart({
      destAddress: newDestAddress
    }));
    // let response = yield call(sendTransaction,{
    //   destAddress: newDestAddress,
    //   wallet: wallet,
    //   amount: "0.1"
    // });
    let response = yield call(transfer,{
      contract: contract,
      destAddress: newDestAddress,
      amount: amount
  })
    console.log("pay response", response);
    yield put(paySuccess({
      info: "Paid"
    }));
  } catch (e) {
    console.log(e);
    yield put(payFailed({
      errCode: "insufficient fund"
    }));
  }
}

function* payEstimateFlow(action) {
  try{
    const { destAddress, contract, amount } = action.payload;
    let newDestAddress = destAddress ;
    if(destAddress[0] != "0"){
      newDestAddress = destAddress.slice(9)
    }
    yield put(payStart({
      destAddress: newDestAddress
    }));
    let response = yield call(estimateTransfer,{
      contract: contract,
      destAddress: newDestAddress,
      amount: amount
  })
    console.log("payEstimate response", response);
    yield put(payEstimateSuccess({
      estimatedCost: parseInt(response._hex.slice(2), 16)
    }));
  } catch (e) {
    console.log(e);
    yield put(payFailed({
      errCode: "insufficient fund"
    }));
  }
}
