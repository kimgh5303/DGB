package com.example.DGB.rep;

import com.example.DGB.entity.Trans;
import com.example.DGB.entity.report.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    // 기업별 보고서 확인
    @Query(value = "SELECT r.contract_addr,r.report_id, r.register_time, f.bucket_name, f.file_name, r.e_score, r.s_score, r.g_score\n" +
            "FROM report r\n" +
            "JOIN company c ON c.company_id = :companyid\n" +
            "JOIN file f ON f.file_name = r.file_name\n" +
            "WHERE r.contract_addr=c.contract_addr\n" +
            "ORDER BY r.register_time DESC;", nativeQuery = true)
    List<Object[]> showReportList(@Param("companyid") String companyid);

    // 컨트렉트 내에 있는 report_id 업데이트 (자리 할당)
    @Modifying
    @Query(value = "UPDATE report\n" +
            "SET report.report_id=:reportid\n" +
            "WHERE report.contract_addr=:contractaddr AND report.report_id=0", nativeQuery = true)
    void updateReportId(@Param("contractaddr") String contractaddr, @Param("reportid") int reportid);

    // 보고서 다운로드 링크
    @Query(value = "SELECT f.bucket_name, f.file_name\n" +
            "FROM report r\n" +
            "JOIN file f ON f.file_name = r.file_name\n" +
            "WHERE r.contract_addr=:contractaddr AND r.report_id=:reportid\n", nativeQuery = true)
    List<String> downloadReport(@Param("contractaddr") String contractaddr, @Param("reportid") int reportid);
}
