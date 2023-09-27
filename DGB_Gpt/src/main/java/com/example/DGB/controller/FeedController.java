package com.example.DGB.controller;


import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.service.FeedService.AFeedService;
import com.example.DGB.service.FeedService.CFeedService;
import com.example.DGB.service.FeedService.UFeedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feeds")
@RequiredArgsConstructor
public class FeedController {
    private final CFeedService cFeedService;
    private final UFeedService uFeedService;
    private final AFeedService aFeedService;

    // 기업 피드 조회
    @GetMapping("/companies/{companyid}")
    public ResponseEntity<AllResDto> showCFeed(@PathVariable String companyid) {
        return cFeedService.showCFeed(companyid);
    }

    // 개인 피드 조회
    @GetMapping("/users/{userid}")
    public ResponseEntity<AllResDto> showUFeed(@PathVariable String userid) {
        return uFeedService.showUFeed(userid);
    }

    // 관리자 피드 조회
    @GetMapping("/admins")
    public ResponseEntity<AllResDto> showAFeed() {
        return aFeedService.showAFeed("admin");
    }
}
