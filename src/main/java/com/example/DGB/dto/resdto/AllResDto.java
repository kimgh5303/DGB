package com.example.DGB.dto.resdto;

import lombok.AllArgsConstructor;
import lombok.Getter;

// 로그인 + 회원가입 response dto
@Getter
@AllArgsConstructor
public class AllResDto {

    private boolean success;
    private String message;
    private Object data;

    public AllResDto(boolean success, String message){
        this.success = success;
        this.message = message;
    }

    public AllResDto(Object data){
        this.data = data;
    }
}
