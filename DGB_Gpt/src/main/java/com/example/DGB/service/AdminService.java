package com.example.DGB.service;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.rep.AdminRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final UserService userService;
    private final CompanyService companyService;

    // DGB 토큰량 조회
    public ResponseEntity<AllResDto> showAdminToken(String adminid) {
        int results = adminRepository.findByAdminid(adminid);
        return new ResponseEntity<>(new AllResDto(true, "DGB 토큰 보유량", results), HttpStatus.OK);
    }

    // 전체 토큰량 조회
    public ResponseEntity<AllResDto> showAllToken() {
        // 전체 토큰량
        int results = adminRepository.showAlltoken();
        return new ResponseEntity<>(new AllResDto(true, "전체 토큰 보유량", results), HttpStatus.OK);
    }

    // DGB 토큰량 plus
    @Transactional
    public ResponseEntity<AllResDto> plusToken(String plusnum) {
        adminRepository.plusToken(Integer.parseInt(plusnum), "admin");
        return new ResponseEntity<>(new AllResDto(true, "DGB 토큰량 plus"), HttpStatus.OK);
    }

    // DGB 토큰량 minus
    @Transactional
    public ResponseEntity<AllResDto> minusToken(String minusnum) {
        adminRepository.minusToken(Integer.parseInt(minusnum), "admin");
        return new ResponseEntity<>(new AllResDto(true, "DGB 토큰량 minus"), HttpStatus.OK);
    }

    // 몰수한 토큰을 DGB 토큰에 plus
    @Transactional
    public ResponseEntity<AllResDto> seizureAdminToken(int tokenvalue) {
        adminRepository.seizureAdminToken(tokenvalue, "admin");
        return new ResponseEntity<>(new AllResDto(true, "DGB 토큰량 minus"), HttpStatus.OK);
    }

    // 이더리움 승인 대기 아이디
    public ResponseEntity<AllResDto> waitPermission() {
        List<Object[]> results = adminRepository.waitPermission();
        return new ResponseEntity<>(new AllResDto(true, "이더리움 승인 대기 아이디", results), HttpStatus.OK);
    }

    // 이더리움 대기 아이디 승인
    public ResponseEntity<AllResDto> givePermission(List<String> bcidList) {
        for (String bcid : bcidList) {
            // 사용자 테이블(user)에 블록체인 아이디가 있는지 확인 -> 있으면 승인, 없으면 그대로 둠
            if (userService.giveUserPermission(bcid)) {
                continue;
            }
            // 회사 테이블(company)에 블록체인 아이디가 있는지 확인 -> user 테이블에 없으면 company 테이블에서 승인
            else {
                companyService.giveCompanyPermission(bcid);
            }
        }
        return new ResponseEntity<>(new AllResDto(true, "이더리움 대기 아이디 승인"), HttpStatus.OK);
    }
}
