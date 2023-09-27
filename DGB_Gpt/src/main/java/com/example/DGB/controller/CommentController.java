package com.example.DGB.controller;

import com.example.DGB.dto.CommentDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    // 기업 댓글 등록
    @PostMapping
    public ResponseEntity<AllResDto> postComment(@RequestBody CommentDto params) {
        return commentService.postComment(params);
    }

    // 기업 댓글 리스트
    @GetMapping("/{companyid}")
    public ResponseEntity<AllResDto> showComment(@PathVariable("companyid") String companyid) {
        return commentService.showComment(companyid);
    }
}
