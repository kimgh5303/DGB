package com.example.DGB.service.FeedService;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.entity.Feed.UFeed;
import com.example.DGB.entity.Comment;
import com.example.DGB.entity.Review;
import com.example.DGB.entity.Trans;
import com.example.DGB.rep.FeedRep.UFeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UFeedService {
    private final UFeedRepository uFeedRepository;

    // 개인 피드 조회
    public ResponseEntity<AllResDto> showUFeed(String userid) {
        List<UFeed> uFeed = uFeedRepository.findByUserid(userid);
        return new ResponseEntity<>(new AllResDto(true, "개인 피드 조회 완료", uFeed), HttpStatus.OK);
    }

    // 기부 피드 등록
    public ResponseEntity<AllResDto> postUDonFeed(Trans trans, String[] params) {
        String content = params[3] + " 회사에 " + trans.getValue() + "코인 기부하였습니다";
        UFeed uFeed = new UFeed(params[0], content, trans.getTime());
        uFeedRepository.save(uFeed);
        return new ResponseEntity<>(new AllResDto(true, "기부 피드 등록 완료", uFeed), HttpStatus.OK);
    }

    // 댓글/리뷰 활동 코인
    public ResponseEntity<AllResDto> getUDonFeed(Trans trans, String[] params) {
        String content = trans.getType() + " 활동으로 " + trans.getValue() + "코인을 획득했습니다";
        UFeed uFeed = new UFeed(params[1], content, trans.getTime());
        uFeedRepository.save(uFeed);
        return new ResponseEntity<>(new AllResDto(true, "활동 기부금 피드 등록 완료", uFeed), HttpStatus.OK);
    }

    // 댓글 피드 등록
    public ResponseEntity<AllResDto> postCommentFeed(Comment params, String companyname) {
        String content = companyname + " 회사에 댓글을 달았습니다";
        UFeed uFeed = new UFeed(params.getUserid(), content, params.getTime());
        uFeedRepository.save(uFeed);
        return new ResponseEntity<>(new AllResDto(true, "댓글 피드 등록 완료", uFeed), HttpStatus.OK);
    }

    // 리뷰 피드 등록
    public ResponseEntity<AllResDto> postReviewFeed(Review params, String userid, String eventName) {
        String content = eventName + " 행사에 리뷰를 등록하였습니다";
        UFeed uFeed = new UFeed(userid, content, params.getTime());
        uFeedRepository.save(uFeed);
        return new ResponseEntity<>(new AllResDto(true, "리뷰 피드 등록 완료", uFeed), HttpStatus.OK);
    }

    // 몰수당한 피드 등록
    public ResponseEntity<AllResDto> seizureUserFeed(Trans trans, String[] params) {
        String content = "관리자로부터 " + trans.getValue() + "코인을 몰수당하였습니다";
        UFeed uFeed = new UFeed(params[1], content, trans.getTime());
        uFeedRepository.save(uFeed);
        return new ResponseEntity<>(new AllResDto(true, "개인 몰수 피드 등록 완료", uFeed), HttpStatus.OK);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 개인 회원 탈퇴 피드 삭제 (개발용)
    public ResponseEntity<AllResDto> deleteCompanyFeed(String companyid) {
        uFeedRepository.deleteByUserid(companyid);
        return new ResponseEntity<>(new AllResDto(true, "피드 삭제 완료"), HttpStatus.OK);
    }
}
