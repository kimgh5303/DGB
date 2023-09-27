package com.example.DGB.controller;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.UserDto;
import com.example.DGB.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController     // json 으로 데이터를 주고받음을 선언
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // 개인 로그인
    @PostMapping("/login")
    public ResponseEntity<AllResDto> findUser(@RequestBody UserDto params) { //
        return userService.loginUser(params);
    }

    // 개인 회원가입
    @PostMapping("/join")
    public ResponseEntity<AllResDto> joinUser(@RequestBody UserDto params) {
        return userService.joinUser(params);
    }

    // 개인 페이지
    @GetMapping("/{userid}")
    public ResponseEntity<AllResDto> getUserInfo(@PathVariable("userid") String userid) {
        return userService.getUserInfo(userid);
    }

    // 개인 토근 보유량
    @GetMapping("/tokenvalues/{userid}")
    public ResponseEntity<AllResDto> getUserToken(@PathVariable("userid") String userid) {
        return userService.getUserToken(userid);
    }
}

