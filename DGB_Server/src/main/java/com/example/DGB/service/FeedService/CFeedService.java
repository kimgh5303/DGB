package com.example.DGB.service.FeedService;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.entity.Comment;
import com.example.DGB.entity.Event;
import com.example.DGB.entity.Feed.CFeed;
import com.example.DGB.entity.Review;
import com.example.DGB.entity.Trans;
import com.example.DGB.rep.FeedRep.CFeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CFeedService {
    private final CFeedRepository cFeedRepository;

    // 기업 피드 조회
    public  ResponseEntity<AllResDto> showCFeed(String companyid) {
        List<CFeed> cFeed = cFeedRepository.findByCompanyid(companyid);
        return new ResponseEntity<>(new AllResDto(true, "기업 피드 조회 완료", cFeed), HttpStatus.OK);
    }

    // 받은 기부 피드 등록
    public ResponseEntity<AllResDto> postCDonFeed(Trans trans, String[] params) {
        String content = params[2] + "님이 " + trans.getValue() + "코인을 기부하였습니다";
        CFeed cFeed = new CFeed(params[1], content, trans.getTime());
        cFeedRepository.save(cFeed);
        return new ResponseEntity<>(new AllResDto(true, "기부 피드 등록 완료", cFeed), HttpStatus.OK);
    }

    // 투자 -> DGB로부터 받은 투자 피드 등록 (기업 -> DGB)
    public ResponseEntity<AllResDto> getInvtFeed(Trans trans, String[] params) {
        String content = "관리자로부터 " + trans.getValue() + "코인만큼 투자받았습니다";
        CFeed cFeed = new CFeed(params[1], content, trans.getTime());
        cFeedRepository.save(cFeed);
        return new ResponseEntity<>(new AllResDto(true, "투자 피드 등록 완료", cFeed), HttpStatus.OK);
    }

    // 댓글 피드 등록
    public ResponseEntity<AllResDto> postCommentFeed(Comment params, String username) {
        String content = username + "님이 댓글을 달았습니다";
        CFeed cFeed = new CFeed(params.getCompanyid(), content, params.getTime());
        cFeedRepository.save(cFeed);
        return new ResponseEntity<>(new AllResDto(true, "댓글 피드 등록 완료", cFeed), HttpStatus.OK);
    }

    // 행사 피드 등록
    public ResponseEntity<AllResDto> postEventFeed(Event params) {
        String content = params.getEventname() + " 행사를 등록하였습니다";
        CFeed CFeed = new CFeed(params.getCompanyid(), content, params.getTime());
        cFeedRepository.save(CFeed);
        return new ResponseEntity<>(new AllResDto(true, "행사 피드 등록 완료", CFeed), HttpStatus.OK);
    }

    // 리뷰 피드 등록
    public ResponseEntity<AllResDto> postReviewFeed(Review params, String companyid, String username) {
        String content = username + "님이 리뷰를 등록하였습니다";
        CFeed CFeed = new CFeed(companyid, content, params.getTime());
        cFeedRepository.save(CFeed);
        return new ResponseEntity<>(new AllResDto(true, "리뷰 피드 등록 완료", CFeed), HttpStatus.OK);
    }

    // 몰수당한 피드 등록
    public ResponseEntity<AllResDto> seizureCompanyFeed(Trans trans, String[] params) {
        String content = "관리자로부터 " + trans.getValue() + "코인을 몰수당하였습니다";
        CFeed cFeed = new CFeed(params[1], content, trans.getTime());
        cFeedRepository.save(cFeed);
        return new ResponseEntity<>(new AllResDto(true, "기업 몰수 피드 등록 완료", cFeed), HttpStatus.OK);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 기업 회원 탈퇴 피드 삭제 (개발용)
    public ResponseEntity<AllResDto> deleteCompanyFeed(String companyid) {
        cFeedRepository.deleteByCompanyid(companyid);
        return new ResponseEntity<>(new AllResDto(true, "피드 삭제 완료"), HttpStatus.OK);
    }
}
