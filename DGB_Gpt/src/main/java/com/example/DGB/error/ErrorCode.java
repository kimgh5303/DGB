package com.example.DGB.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

// enum class를 이용해 Gender라는 새로운 상수들의 타입을 정의
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    NEED_TO_LOGIN(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다"),
    USER_NOT_FIND(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다"),
    COMPANY_NOT_FIND(HttpStatus.NOT_FOUND, "기업을 찾을 수 없습니다"),
    USER_EXIST(HttpStatus.CONFLICT, "회원이 존재합니다"),
    COMPANY_EXIST(HttpStatus.CONFLICT, "기업이 존재합니다"),
    TRANS_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "실패하였습니다");           // 500 error
//    REPORT_EXIST(HttpStatus.INTERNAL_SERVER_ERROR, "보고서가 컨트렉트가 존재하지 않습니다");

    private final HttpStatus httpStatus;
    private final String message;
}
