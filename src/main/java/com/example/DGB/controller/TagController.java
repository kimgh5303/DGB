package com.example.DGB.controller;

import com.example.DGB.dto.TagDto;
import com.example.DGB.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    // 기업 태그정보(기업 리스트)
    @GetMapping
    public ResponseEntity<?> showCompanyListTag() {
        return tagService.showCompanyListTag();
    }

    // 기업 태그정보(기업 페이지)
    @GetMapping("/{companyid}")
    public ResponseEntity<?> showCompanyDetailTag(@PathVariable("companyid") String companyid) {
        return tagService.showCompanyDetailTag(companyid);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 기업 태그 등록 (개발용)
    @PostMapping
    public ResponseEntity<?> postCompanyTag(@RequestBody TagDto params) {
        return tagService.postCompanyTag(params);
    }
}
