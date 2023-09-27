package com.example.DGB.controller;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.ReviewDto;
import com.example.DGB.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    // 행사 리뷰 등록
    @PostMapping
    public ResponseEntity<AllResDto> postReview(@ModelAttribute ReviewDto params, @RequestParam(required=false) MultipartFile multipartFile)throws IOException {
        return reviewService.postReview(params, multipartFile);
    }

    // 행사 리뷰 리스트
    @GetMapping("/{eventidx}")
    public ResponseEntity<AllResDto> showReview(@PathVariable("eventidx") int eventidx) throws IOException {
        return reviewService.showReview(eventidx);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 개별 리뷰 삭제 (개발용)
    @DeleteMapping
    public ResponseEntity<AllResDto> deleteReview(@RequestParam int reviewidx){
        return reviewService.deleteReview(reviewidx);
    }
}