package com.example.DGB.service;

import com.example.DGB.OtherFunction;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.ReviewDto;
import com.example.DGB.entity.Review;
import com.example.DGB.rep.ReviewRepository;
import com.example.DGB.service.FeedService.CFeedService;
import com.example.DGB.service.FeedService.UFeedService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    @Value("${aws.s3.bucketReview}")
    private String bucketReview;

    private final ReviewRepository reviewRepository;
    private final FileService fileService;
    private final CFeedService cFeedService;
    private final UFeedService uFeedService;
    private final OtherFunction otherFunction;

    // 행사 리뷰 추가
    @Transactional
    public ResponseEntity<AllResDto> postReview(final ReviewDto params, MultipartFile multipartFile) throws IOException {
        Review review = params.toEntity();
        review.setFilename(fileService.saveAttachment(multipartFile, bucketReview).getFilename());                      // 트랜잭션 동시 처리를 위해 여기서 FileService를 실행
        reviewRepository.save(review);                                                                                  // 파일 pk값을 저장하기 위해 파일 테이블에서 pk값을 받아온뒤 나중에 저장
        String eventName = reviewRepository.showEventName(review.getEventidx());                                        // 조인하여 행사 이름을 가져옴
        cFeedService.postReviewFeed(review, params.getCompanyid(), params.getUsername());
        uFeedService.postReviewFeed(review, params.getUserid(), eventName);
        return new ResponseEntity<>(new AllResDto(true, "리뷰 등록 완료", review), HttpStatus.OK);
    }

    // 행사 리뷰
    public ResponseEntity<AllResDto> showReview(int eventidx) throws IOException {
        List<Object[]> results = reviewRepository.showReview(eventidx);
        results = otherFunction.changeShowTime(results, 2);
        return new ResponseEntity<>(new AllResDto(true, "리뷰 리스트", results), HttpStatus.OK);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 개별 리뷰 삭제 (개발용)
    @Transactional
    public ResponseEntity<AllResDto> deleteReview(int reviewidx){
        // 행사 리뷰의 이미지 이름을 받아옴
        String reviewFile = reviewRepository.findFilenameByReviewidx(reviewidx);
        reviewRepository.deleteByReviewidx(reviewidx);
        fileService.deleteAttachment(reviewFile, bucketReview);
        return new ResponseEntity<>(new AllResDto(true, "리뷰 삭제 성공"), HttpStatus.OK);
    }

    // 개별 (행사+리뷰) 삭제 (개발용)
    @Transactional
    public ResponseEntity<AllResDto> deleteEventReview(int eventidx){
        List<String> reviewFiles = reviewRepository.findFilenameByEventidx(eventidx);
        // 행사 리뷰들의 이미지 이름들을 받아옴
        reviewRepository.deleteByEventidx(eventidx);
        fileService.deleteAttachments(reviewFiles, bucketReview);
        return new ResponseEntity<>(new AllResDto(true, "행사별 리뷰 삭제 성공"), HttpStatus.OK);
    }

    // 기업 회원 탈퇴(행사+리뷰)삭제 (개발용)
    public ResponseEntity<AllResDto> deleteEventReview(List<Integer> eventIdxes){
        // 행사 리뷰들의 이미지 이름들을 받아옴
        List<List<String>> reviewFiles = reviewRepository.findFilenameByEventidxIn(eventIdxes);
        reviewRepository.deleteByEventidxIn(eventIdxes);
        fileService.deleteAttachmentsList(reviewFiles, bucketReview);
        return new ResponseEntity<>(new AllResDto(true, "리뷰 전체 삭제 성공"), HttpStatus.OK);
    }


}
