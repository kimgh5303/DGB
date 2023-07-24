package com.example.DGB.rep;

import com.example.DGB.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    // 리뷰가 달린 행사 이름 조회
    @Query(value = "SELECT DISTINCT e.event_name\n" +
            "FROM review r\n" +
            "JOIN event e ON r.event_idx = e.event_idx\n" +
            "WHERE r.event_idx=:eventidx\n", nativeQuery = true)
    String showEventName(@Param("eventidx") int eventidx);

    // (리뷰+파일) 조회
    @Query(value = "SELECT r.user_id, r.review_desc, r.register_time,f.bucket_name, f.file_name\n" +
            "FROM review r\n" +
            "JOIN file f ON r.file_name = f.file_name\n" +
            "WHERE r.event_idx=:eventidx\n"+
            "ORDER BY r.register_time DESC", nativeQuery = true)
    List<Object[]> showReview(@Param("eventidx") int eventidx);

    // 개별 행사 리뷰 파일 조회
    @Query(value = "SELECT r.file_name\n" +
            "FROM review r\n" +
            "WHERE r.event_idx=:eventidx", nativeQuery = true)
    List<String> findFilenameByEventidx(@Param("eventidx") int eventidx);

    // 전체 행사 리뷰 파일 조회
    @Query(value = "SELECT r.file_name\n" +
            "FROM review r\n" +
            "WHERE r.event_idx IN :eventidx", nativeQuery = true)
    List<List<String>> findFilenameByEventidxIn(@Param("eventidx") List<Integer> eventidx);


    //------------------------------------------------------------------------------------------------------------------
    // 개별 리뷰 삭제 (개발용)
    @Query(value = "SELECT r.file_name\n" +
            "FROM review r\n" +
            "WHERE r.review_idx=:reviewidx", nativeQuery = true)
    String findFilenameByReviewidx(@Param("reviewidx") int reviewidx);
    void deleteByReviewidx(int reviewidx);

    // 개별 (행사+리뷰) 삭제 (개발용)
    void deleteByEventidx(int eventidx);

    // 기업 회원 탈퇴 (전체 행사+리뷰) 삭제 (개발용)
    void deleteByEventidxIn(List<Integer> eventidx);
}
