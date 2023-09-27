package com.example.DGB.service;

import com.example.DGB.dto.ReportDto;
import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.rep.ReportRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final S3Service s3Service;

    // 기업별 보고서 확인
    public ResponseEntity<AllResDto> showReport(String companyid) {
        List<Object[]> showReportList = reportRepository.showReportList(companyid);
        return new ResponseEntity<>(new AllResDto(true, "보고서 조회 성공", showReportList), HttpStatus.OK);
    }

    // 컨트렉트 내에 있는 report_id 업데이트 (자리 할당)
    @Transactional
    public ResponseEntity<AllResDto> updateReportId(ReportDto reportDto) {
        reportRepository.updateReportId(reportDto.getContractaddr(), reportDto.getReportid());
        return new ResponseEntity<>(new AllResDto(true, "보고서 저장 완료"), HttpStatus.OK);
    }

    // 보고서 다운로드 링크
    public ResponseEntity<AllResDto> downloadReport(ReportDto reportDto) {
        List<String> report = reportRepository.downloadReport(reportDto.getContractaddr(), reportDto.getReportid());
        return new ResponseEntity<>(new AllResDto(true, "보고서 다운로드 링크", report), HttpStatus.OK);
    }
}
