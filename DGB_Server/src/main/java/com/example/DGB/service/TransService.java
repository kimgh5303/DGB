package com.example.DGB.service;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.TransDto;
import com.example.DGB.entity.Trans;
import com.example.DGB.rep.TransRepository;
import com.example.DGB.service.FeedService.AFeedService;
import com.example.DGB.service.FeedService.CFeedService;
import com.example.DGB.service.FeedService.UFeedService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransService {
    private final TransRepository transRepository;
    private final AdminService adminService;
    private final UserService userService;
    private final CompanyService companyService;

    private final AFeedService aFeedService;
    private final UFeedService uFeedService;
    private final CFeedService cFeedService;

    // 기부 트랜잭션 저장 (개인->기업)
    @Transactional
    public ResponseEntity<AllResDto> postDonTransaction(TransDto transDto, String type) {
        Trans trans = transDto.toEntity();
        trans.setType(type);
        trans = transRepository.save(trans);
        transRepository.updateUserTokenMinus(trans);                                                                    // 개인 토큰 차감
        transRepository.updateCompanyTokenPlus(trans);                                                                   // 기업 토큰 증가
        String temp = transRepository.showUToCFeed(trans);                                                              // 트랜잭션 정보로 개인, 기업 정보 조회
        String[] params = temp.split(",");                                                                        // 같은 튜플로 받아서 나눠줌
        uFeedService.postUDonFeed(trans, params);                                                                       // 개인 기부금 피드에 저장
        cFeedService.postCDonFeed(trans, params);                                                                       // 기업 기부금 피드에 저장
        return new ResponseEntity<>(new AllResDto(true, "(기부) 거래 저장 성공", params), HttpStatus.OK);
    }

    // 활동(댓글/리뷰) 트랜잭션 저장 (DGB->개인)
    @Transactional
    public ResponseEntity<AllResDto> postActTransaction(TransDto transDto, String type) {
        Trans trans = transDto.toEntity();
        trans.setType(type);
        transRepository.save(trans);
        transRepository.updateDGBTokenMinus(trans);                                                                     // DGB 토큰 차감
        transRepository.updateUserTokenPlus(trans);                                                                     // 개인 토큰 증가
        String temp = transRepository.showAToUFeed(trans);                                                              // 트랜잭션 정보로 개인 정보 조회
        String[] params = temp.split(",");                                                                        // 같은 튜플로 받아서 나눠줌
        uFeedService.getUDonFeed(trans, params);                                                                        // 개인 기부금 피드에 저장
        aFeedService.postActFeed(trans, params);                                                                        // 관리자(DGB) 기부금 피드에 저장
        return new ResponseEntity<>(new AllResDto(true,  type + "거래 저장 성공"), HttpStatus.OK);
    }

    // 투자 트랜잭션 저장 (기업->DGB)
    @Transactional
    public ResponseEntity<AllResDto> postInvtTransaction(TransDto transDto, String type) {
        Trans trans = transDto.toEntity();
        trans.setType(type);
        transRepository.save(trans);
        transRepository.updateCompanyTokenMinus(trans);                                                                 // 기업 토큰 차감
        transRepository.updateDGBTokenPlus(trans);                                                                      // DGB 토큰 증가
        String temp = transRepository.showCToAFeed(trans);                                                              // 트랜잭션 정보로 개인 정보 조회
        String[] params = temp.split(",");                                                                        // 같은 튜플로 받아서 나눠줌
        cFeedService.getInvtFeed(trans, params);                                                                        // 기업 기부금 피드에 저장
        aFeedService.postInvtFeed(trans, params);                                                                       // 관리자(DGB) 기부금 피드에 저장
        return new ResponseEntity<>(new AllResDto(true, "(리뷰) 거래 저장 성공"), HttpStatus.OK);
    }

    // 몰수 트랜잭션 저장 (개인/기업->DGB)
    @Transactional
    public ResponseEntity<AllResDto> seizureToken(TransDto transDto, String type) {
        Trans trans = transDto.toEntity();
        trans.setType(type);
        // user인지 company인지 구분
        // 개인과 기업이 id가 겹쳐도 블록체인 아이디가 무조건 다르기 때문에 개인 먼저 확인해도 상관 X
        if(userService.seizureUserToken(trans)){
            adminService.seizureAdminToken(trans.getValue());
            transRepository.save(trans);
            String temp = transRepository.showUToAFeed(trans);                                                          // 트랜잭션 정보로 개인 정보 조회
            String[] params = temp.split(",");                                                                    // 같은 튜플로 받아서 나눠줌
            uFeedService.seizureUserFeed(trans, params);                                                                // 개인 몰수 피드에 저장
            aFeedService.seizureAdminFeed(trans, params);                                                               // 관리자(DGB) 몰수 피드에 저장
            return new ResponseEntity<>(new AllResDto(true, "부정 개인 유저 토큰 압류"), HttpStatus.OK);
        }
        else if(companyService.seizureCompanyToken(trans)){
            adminService.seizureAdminToken(trans.getValue());
            transRepository.save(trans);
            String temp = transRepository.showCToAFeed(trans);                                                          // 트랜잭션 정보로 개인 정보 조회
            String[] params = temp.split(",");                                                                    // 같은 튜플로 받아서 나눠줌
            cFeedService.seizureCompanyFeed(trans, params);                                                             // 기업 몰수 피드에 저장
            aFeedService.seizureAdminFeed(trans, params);                                                               // 관리자(DGB) 몰수 피드에 저장
            return new ResponseEntity<>(new AllResDto(true, "부정 기업 유저 토큰 압류"), HttpStatus.OK);
        }
        // 어느 경우에도 해당하지 않으면 기본적인 응답 처리를 수행하거나 에러 처리 가능
        return new ResponseEntity<>(new AllResDto(false, "토큰 압류 실패"), HttpStatus.BAD_REQUEST);
    }

    // 기부한 기업 목록 (개인)
    public ResponseEntity<AllResDto> showDonTrans(String userbcid) {
        List<Object[]> results = transRepository.showDonTrans(userbcid);
        return new ResponseEntity<>(new AllResDto(true, "기부한 기업 목록", results), HttpStatus.OK);
    }
}
