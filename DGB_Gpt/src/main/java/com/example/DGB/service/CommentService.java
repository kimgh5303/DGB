package com.example.DGB.service;

import com.example.DGB.OtherFunction;
import com.example.DGB.dto.CommentDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.entity.Comment;
import com.example.DGB.rep.CommentRepository;
import com.example.DGB.service.FeedService.CFeedService;
import com.example.DGB.service.FeedService.UFeedService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final CFeedService cFeedService;
    private final UFeedService uFeedService;
    private final OtherFunction otherFunction;

    // 댓글 등록
    @Transactional
    public ResponseEntity<AllResDto> postComment(CommentDto params) {
        LocalDateTime localDateTime = otherFunction.changeRegisterTime(params.getTime());
        Comment comment = params.toEntity();
        comment.setTime(localDateTime);
        commentRepository.save(comment);
        cFeedService.postCommentFeed(comment, params.getUsername());                                                    // 기업에 댓글 피드 등록
        uFeedService.postCommentFeed(comment, params.getCompanyname());                                                 // 개인에 댓글 피드 등록
        return new ResponseEntity<>(new AllResDto(true, "댓글 등록 완료", comment), HttpStatus.OK);
    }

    // 댓글 리스트
    public ResponseEntity<AllResDto> showComment(String companyid) {
        List<Object[]> results = commentRepository.showComment(companyid);
        results = otherFunction.changeShowTime(results, 4);
        return new ResponseEntity<>(new AllResDto(true, "댓글 리스트", results), HttpStatus.OK);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 기업 회원 탈퇴(댓글 삭제)(개발용)
    public ResponseEntity<AllResDto> deleteCompanyComment(String companyid) {
        commentRepository.deleteByCompanyid(companyid);
        return new ResponseEntity<>(new AllResDto(true, "댓글 리스트 삭제"), HttpStatus.OK);
    }
}
