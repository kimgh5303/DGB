package com.example.DGB.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice   // 전역 예외 컨트롤러 -> rest가 붙어 json으로 내려줌
public class GlobalExceptionHandler{ // 추상 클래스 상속

    // * ResponseEntity -> httpentity를 상속받는, 결과 데이터와 HTTP 상태 코드를 직접 제어할 수 있는 클래스
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> validException(MethodArgumentNotValidException ex) {
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    // 예외처리를 custom하게 처리 -> IllegalArgumentException
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> CustomException(CustomException ex) {
        return ErrorResponse.toResponseEntity(ex);
    }
}
