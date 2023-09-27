package com.example.DGB.service;

import com.example.DGB.dto.eventdto.EventDelDto;
import com.example.DGB.dto.eventdto.EventDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.entity.Event;
import com.example.DGB.rep.EventRepository;
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

@Service
@RequiredArgsConstructor
public class EventService {

    @Value("${aws.s3.bucketEvent}")
    private String bucketEvent;

    private final EventRepository eventRepository;
    private final ReviewService reviewService;
    private final FileService fileService;
    private final CFeedService cFeedService;

    // 기업 행사 등록
    public ResponseEntity<AllResDto> postEvent(final EventDto params, MultipartFile multipartFile) throws IOException {
        String fileName = fileService.saveAttachment(multipartFile, bucketEvent).getFilename();                         // 파일 테이블이 따로 있으므로 동시에 FileService를 실행
        Event event = params.toEntity();
        event.setFilename(fileName);                                                                                    // 만든 파일 이름을 event 객체에 담음
        eventRepository.save(event);                                                                                    // 파일 이름을 얻어와야하기 때문에 나중에 작성
        cFeedService.postEventFeed(event);                                                                              // 이벤트 피드 등록
        return new ResponseEntity<>(new AllResDto(true, "행사 추가 완료", event), HttpStatus.OK);
    }

    // 기업 행사 리스트
    public ResponseEntity<AllResDto> showEventList(String companyid) throws IOException {
        List<Object[]> results = eventRepository.showEventList(companyid);
        return new ResponseEntity<>(new AllResDto(true, "행사 리스트", results), HttpStatus.OK);
    }

    // 기업 행사 세부정보
    public ResponseEntity<AllResDto> showEventDetail(int eventidx) throws IOException {
        List<Object[]> results = eventRepository.showEventDetail(eventidx);
        return new ResponseEntity<>(new AllResDto(true, "행사 세부정보", results), HttpStatus.OK);
    }

    // 행사(+리뷰)삭제
    @Transactional
    public ResponseEntity<AllResDto> deleteCompanyEvent(EventDelDto params){
        eventRepository.deleteById(params.getEventidx());
        fileService.deleteAttachment(params.getFilename(), bucketEvent);                                                // 행사 이미지 삭제 (s3)
        // 리뷰 서비스에서 처리
        reviewService.deleteEventReview(params.getEventidx());                                                          // 행사에 있는 리뷰들 삭제
        return new ResponseEntity<>(new AllResDto(true, "행사 삭제 성공"), HttpStatus.OK);
    }

//----------------------------------------------------------------------------------------------------------------------

    // 기업 회원 탈퇴(행사+리뷰)삭제 (개발용)
    public ResponseEntity<AllResDto> deleteCompanyEvent(String companyid) {
        List<String> fileNames = eventRepository.findFilenameByCompanyid(companyid);                                    // 탈퇴 기업 행사 이미지 파일 전체 조회
        List<Integer> eventIdxes = eventRepository.findeventidxByCompanyid(companyid);                                  // 탈퇴 기업 행사 idx 전체 조회
        eventRepository.deleteByCompanyid(companyid);                                                                   // 탈퇴 기업 행사 전체 삭제
        fileService.deleteAttachments(fileNames, bucketEvent);                                                          // 행사 파일 이미지들 삭제 (s3)
        // 리뷰 서비스에서 처리
        reviewService.deleteEventReview(eventIdxes);                                                                    // 행사들에 있는 리뷰 삭제
        return new ResponseEntity<>(new AllResDto(true, "행사 전체 삭제 성공"), HttpStatus.OK);
    }
}
