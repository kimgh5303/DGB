package com.example.DGB.controller;

import com.example.DGB.dto.ReportDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;

    // 기업별 보고서 확인
    @GetMapping("/{companyid}")
    public ResponseEntity<AllResDto> showReport(@PathVariable("companyid") String companyid) {
        return reportService.showReport(companyid);
    }

    // 컨트렉트 내에 있는 report_id 업데이트 (자리 할당)
    @PostMapping("/indexes")
    public ResponseEntity<AllResDto> updateReportId(@RequestBody ReportDto reportDto) {
        return reportService.updateReportId(reportDto);
    }

    @PostMapping("/downloads")
    public ResponseEntity<AllResDto> downloadReport(@RequestBody ReportDto reportDto) {
        return reportService.downloadReport(reportDto);
    }
}
