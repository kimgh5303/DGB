package com.example.DGB.controller;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    // DGB 토큰량 조회
    @GetMapping
    public ResponseEntity<AllResDto> showAdminToken() {
        return adminService.showAdminToken("admin");
    }

    // 전체 토큰량 조회
    @GetMapping("/totals")
    public ResponseEntity<AllResDto> showAllToken() {
        return adminService.showAllToken();
    }

    // DGB 토큰 증가
    @PostMapping("/plus")
    public ResponseEntity<AllResDto> plusToken(@RequestParam String plusnum) {
        return adminService.plusToken(plusnum);
    }

    // DGB 토큰 감소
    @PostMapping("/minus")
    public ResponseEntity<AllResDto> minusToken(@RequestParam String minusnum) {
        return adminService.minusToken(minusnum);
    }

    // 이더리움 승인 대기 아이디 -> 이걸 승인해야 거래를 할 수 있음
    @GetMapping("/permissions")
    public ResponseEntity<AllResDto> waitPermission() {
        return adminService.waitPermission();
    }

    // 이더리움 대기 아이디 승인
    @PostMapping("/update-permissions")
    public ResponseEntity<AllResDto> givePermission(@RequestBody List<String> bcidList) {
        return adminService.givePermission(bcidList);
    }
}
