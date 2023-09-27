package com.example.DGB.rep;

import com.example.DGB.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    // 기업 전체 행사 show
    @Query(value = "SELECT e.event_idx,e.event_name, e.event_desc, f.bucket_name, f.file_name\n" +
            "FROM event e\n" +
            "JOIN file f ON e.file_name = f.file_name\n" +
            "WHERE e.company_id=:companyid\n" +
            "ORDER BY e.register_time DESC;", nativeQuery = true)                                                       // 바인딩 파라미터이므로 끝에 ;안붙음 -> 파라미터 이름을 잘못 인식할 수 있음
    List<Object[]> showEventList(@Param("companyid") String companyid);

    // 기업 개별 행사 show
    @Query(value = "SELECT e.event_idx,e.event_name, e.event_desc, f.bucket_name, f.file_name\n" +
            "FROM event e\n" +
            "JOIN file f ON e.file_name = f.file_name\n" +
            "WHERE e.event_idx=:eventidx", nativeQuery = true)
    List<Object[]> showEventDetail(@Param("eventidx") int eventidx);

    // 기업 행사 개별 삭제
    void deleteById(int eventidx);                                                                                      // 식별자를 기준으로 delete하는 JPA 기본 제공 메서드


    //------------------------------------------------------------------------------------------------------------------
    // 기업 회원 탈퇴 (개발용)
    // 탈퇴 기업 행사 이미지 파일 전체 조회 (개발용)
    @Query(value = "SELECT e.file_name\n" +
            "FROM event e\n" +
            "WHERE e.company_id=:companyid", nativeQuery = true)
    List<String> findFilenameByCompanyid(@Param("companyid") String companyid);
    // 탈퇴 기업 행사 idx 전체 조회 (개발용)
    @Query(value = "SELECT e.event_idx\n" +
            "FROM event e\n" +
            "WHERE e.company_id=:companyid", nativeQuery = true)
    List<Integer> findeventidxByCompanyid(@Param("companyid") String companyid);
    // 기업 행사 전체 삭제 (개발용)
    void deleteByCompanyid(String companyid);
}
