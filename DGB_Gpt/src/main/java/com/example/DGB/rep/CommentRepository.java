package com.example.DGB.rep;

import com.example.DGB.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    // 기업별 댓글 조회
    @Query(value = "SELECT *\n" +
            "FROM comment c\n" +
            "WHERE c.company_id=:companyid\n" +
            "ORDER BY register_time DESC;", nativeQuery = true)
    List<Object[]> showComment(@Param("companyid") String companyid);

    // 기업 회원 탈퇴(댓글 삭제)(개발용)
    void deleteByCompanyid(String companyid);
}
