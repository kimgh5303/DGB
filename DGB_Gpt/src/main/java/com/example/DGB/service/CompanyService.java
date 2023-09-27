package com.example.DGB.service;

import com.example.DGB.dto.CompanyDto.ContractAddrDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.CompanyDto.CompanyDto;
import com.example.DGB.entity.Company;
import com.example.DGB.entity.Trans;
import com.example.DGB.error.CustomException;
import com.example.DGB.error.ErrorCode;
import com.example.DGB.rep.CompanyRepository;
import com.example.DGB.service.FeedService.CFeedService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CompanyService {

    @Value("${aws.s3.bucketCompany}")
    private String bucketCompany;

    private final CompanyRepository companyRepository;
    private final FileService fileService;
    private final TagService tagService;
    private final CommentService commentService;
    private final EventService eventService;
    private final CFeedService cFeedService;

    // 기업 로그인
    public ResponseEntity<AllResDto> loginCompany(final CompanyDto params){
        Company results = companyRepository.findByCompanyidAndCompanypw(params.getCompanyid(), params.getCompanypw());
        if(results==null){throw new CustomException(ErrorCode.COMPANY_NOT_FIND);}
        return new ResponseEntity<>(new AllResDto(true, "기업정보 일치", results), HttpStatus.OK);
    }

    // 기업 회원가입
    public ResponseEntity<AllResDto> joinCompany(final CompanyDto params, MultipartFile multipartFile) throws IOException {
        Company company = params.toEntity();
        if(companyRepository.findByCompanyid(company.getCompanyid())!=null) {
            throw new CustomException(ErrorCode.COMPANY_EXIST);
        }                                                                                                               // 기업 ID가 존재할 경우
        String fileName = fileService.saveAttachment(multipartFile, bucketCompany).getFilename();
        company.setFilename(fileName);                                                                                  // 만든 파일 이름을 company 객체에 담음
        companyRepository.save(company);                                                                                // 파일 이름을 얻어와야하기 때문에 나중에 작성
        return new ResponseEntity<>(new AllResDto(true, "기업 등록 성공"), HttpStatus.OK);
    }

    // 기업 리스트
    public ResponseEntity<AllResDto> showCompanyList() throws IOException {
        List<Object[]> results = companyRepository.showCompanyList();
        return new ResponseEntity<>(new AllResDto(true, "기업 리스트", results), HttpStatus.OK);
    }

    // 기업 상세정보(수정)
    public ResponseEntity<AllResDto> showCompanyDetail(String companyid) {
        Optional<Company> results = companyRepository.findById(companyid);
        return new ResponseEntity<>(new AllResDto(true, "기업 리스트(수정)", results), HttpStatus.OK);
    }
    
    // 보고서 컨트렉트 생성
    @Transactional
    public ResponseEntity<AllResDto> updateContractAddr(ContractAddrDto params) {
        companyRepository.updateContractAddr(params.getCompanyid(), params.getContractaddr());
        return new ResponseEntity<>(new AllResDto(true, "기업 보고서 컨트렉트 생성"), HttpStatus.OK);
    }

    // Company 블록체인 압류 아이디 확인
    @Transactional
    public boolean seizureCompanyToken(Trans params){
        Company company = companyRepository.findByBcid(params.getFromid());
        if(company==null){return false;}
        else{
            companyRepository.seizureCompanyToken(params.getValue(), params.getFromid());
            return true;
        }
    }

    // Company 블록체인 압류 아이디 확인
    @Transactional
    public boolean giveCompanyPermission(String bcid){
        Company company = companyRepository.findByBcid(bcid);
        if(company==null){return false;}
        else{
            companyRepository.giveCompanyPermission(bcid);
            return true;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // 기업 회원 탈퇴(개발용)
    @Transactional
    public ResponseEntity<AllResDto> deleteCompany(String companyid) {
        Company company = companyRepository.findByCompanyid(companyid);
        companyRepository.deleteById(companyid);
        fileService.deleteAttachment(company.getFilename(), bucketCompany);
        // 태그 서비스에서 처리
        tagService.deleteCompanyTag(companyid);
        // 댓글 서비스에서 처리
        commentService.deleteCompanyComment(companyid);
        // 행사 서비스에서 처리 (+리뷰 서비스)
        eventService.deleteCompanyEvent(companyid);
        // 피드 서비스에서 처리
        cFeedService.deleteCompanyFeed(companyid);
        return new ResponseEntity<>(new AllResDto(true, "기업 탈퇴 성공"), HttpStatus.OK);
    }
}
