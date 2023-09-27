package com.example.DGB.controller;

import com.example.DGB.dto.eventdto.EventDelDto;
import com.example.DGB.dto.eventdto.EventDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    // 기업 행사 등록
    @PostMapping
        public ResponseEntity<?> postEvent(@ModelAttribute EventDto params, @RequestParam(required=false) MultipartFile multipartFile) throws IOException {
        return eventService.postEvent(params, multipartFile);
    }

    // 기업 행사 리스트
    @GetMapping("/{companyid}")
    public ResponseEntity<?> showEventList(@PathVariable("companyid") String companyid) throws IOException {
        return eventService.showEventList(companyid);
    }

    // 기업 행사 세부정보
    @GetMapping("/{companyid}/{eventidx}")
    public ResponseEntity<?> showEventDetail(@PathVariable("companyid") String companyid, @PathVariable("eventidx") int eventidx) throws IOException {
        return eventService.showEventDetail(eventidx);
    }

    //기업 행사(+리뷰) 삭제
    @DeleteMapping
    public ResponseEntity<AllResDto> deleteCompanyEvent(@RequestBody EventDelDto params){
        return eventService.deleteCompanyEvent(params);
    }
}
