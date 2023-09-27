package com.example.DGB.controller;

import com.example.DGB.dto.CompanyDto.CompanyDto;
import com.example.DGB.dto.CompanyDto.ContractAddrDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/companies") // 요청이 왔을 때 어떤 컨트롤러가 호출이 되어야 하는지 알려줌
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    // 기업 로그인
    @PostMapping("/login")
    public ResponseEntity<?> loginCompany(@RequestBody CompanyDto params){
        return companyService.loginCompany(params);
    }

    // 기업 회원가입
    @PostMapping("/join")
    public ResponseEntity<?> joinCompany(@ModelAttribute CompanyDto params, @RequestParam(required=false) MultipartFile multipartFile) throws IOException {
        return companyService.joinCompany(params, multipartFile);
    }

    // 기업 리스트(유저 페이지)
    @GetMapping
    public ResponseEntity<?> showCompanyList() throws IOException {
        return companyService.showCompanyList();
    }

    // 기업 상세정보(공통)
    @GetMapping("/{companyid}")
    public ResponseEntity<?> showCompanyDetail(@PathVariable("companyid") String companyid) {
        return companyService.showCompanyDetail(companyid);
    }

    // 보고서 컨트렉트 생성
    @PostMapping("/contractaddrs")
    public ResponseEntity<?> updateContractAddr(@RequestBody ContractAddrDto params) {
        return companyService.updateContractAddr(params);
    }

    //------------------------------------------------------------------------------------------------------------------
    //기업 회원 탈퇴(개발용)
    @DeleteMapping
    public ResponseEntity<AllResDto> deleteCompany(@RequestParam String companyid){
        return companyService.deleteCompany(companyid);
    }
}
