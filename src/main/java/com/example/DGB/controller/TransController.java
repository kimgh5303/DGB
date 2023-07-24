package com.example.DGB.controller;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.TransDto;
import com.example.DGB.service.TransService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions") // 요청이 왔을 때 어떤 컨트롤러가 호출이 되어야 하는지 알려줌
@RequiredArgsConstructor
public class TransController {
    private final TransService transService;

    // 기부 트랜잭션 저장 (개인->기업)
    @PostMapping("/donations")
    public ResponseEntity<AllResDto> postDonTransaction(@RequestBody TransDto transDto) {
        return transService.postDonTransaction(transDto, "donation");
    }

    // 댓글 트랜잭션 저장 (DGB->개인)
    @PostMapping("/comments")
    public ResponseEntity<AllResDto> postCmtTransaction(@RequestBody TransDto transDto) {
        return transService.postActTransaction(transDto, "comment");
    }

    // 리뷰 트랜잭션 저장 (DGB->개인)
    @PostMapping("/reviews")
    public ResponseEntity<AllResDto> postRevTransaction(@RequestBody TransDto transDto) {
        return transService.postActTransaction(transDto, "review");
    }

    // 투자 트랜잭션 저장 (기업->DGB)
    @PostMapping("/investments")
    public ResponseEntity<AllResDto> postInvtTransaction(@RequestBody TransDto transDto) {
        return transService.postInvtTransaction(transDto, "investment");
    }

    // 몰수 트랜잭션 저장 (개인/기업->DGB)
    @PostMapping("/seizures")
    public ResponseEntity<AllResDto> seizureToken(@RequestBody TransDto transDto) {
        return transService.seizureToken(transDto, "seizure");
    }

    // 기부한 기업 목록 (개인)
    @GetMapping("/donations/{userbcid}")
    public ResponseEntity<AllResDto> showDonTrans(@PathVariable String userbcid) {
        return transService.showDonTrans(userbcid);
    }
}
