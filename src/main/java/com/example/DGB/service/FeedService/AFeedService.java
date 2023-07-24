package com.example.DGB.service.FeedService;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.entity.Feed.AFeed;
import com.example.DGB.entity.Trans;
import com.example.DGB.rep.FeedRep.AFeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AFeedService {
    private final AFeedRepository aFeedRepository;

    // 관리자 피드 조회
    public ResponseEntity<AllResDto> showAFeed(String adminid) {
        List<AFeed> aFeed = aFeedRepository.findByAdminid(adminid);
        return new ResponseEntity<>(new AllResDto(true, "관리자 피드 조회 완료", aFeed), HttpStatus.OK);
    }

    // 댓글/리뷰 -> 개인한테 준 코인 피드 등록 (DGB -> 개인)
    public ResponseEntity<AllResDto> postActFeed(Trans trans, String[] params) {
        String content = params[3] + "활동으로 " +params[2] + "님에게 " + trans.getValue() + "코인 지급하였습니다";
        AFeed aFeed = new AFeed(params[0], content, trans.getTime());
        aFeedRepository.save(aFeed);
        return new ResponseEntity<>(new AllResDto(true, "코인 지불(댓글/리뷰) 피드 등록 완료", aFeed), HttpStatus.OK);
    }

    // 기업에 투자 -> 투자한 피드 등록 (기업 -> DGB)
    public ResponseEntity<AllResDto> postInvtFeed(Trans trans, String[] params) {
        String content = params[2] + "회사에 " + trans.getValue() + "코인 만큼 투자하였습니다";
        AFeed aFeed = new AFeed(params[0], content, trans.getTime());
        aFeedRepository.save(aFeed);
        return new ResponseEntity<>(new AllResDto(true, "기부 피드 등록 완료", aFeed), HttpStatus.OK);
    }

    // 몰수한 피드 등록
    public ResponseEntity<AllResDto> seizureAdminFeed(Trans trans, String[] params) {
        String content = params[2] + "님의 " + trans.getValue() + "코인을 몰수하였습니다";
        AFeed aFeed = new AFeed(params[0], content, trans.getTime());
        aFeedRepository.save(aFeed);
        return new ResponseEntity<>(new AllResDto(true, "관리자 몰수 피드 등록 완료", aFeed), HttpStatus.OK);
    }
}
