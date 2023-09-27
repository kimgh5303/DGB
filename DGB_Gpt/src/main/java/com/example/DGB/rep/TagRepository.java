package com.example.DGB.rep;

import com.example.DGB.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {

    @Query(value = "SELECT c.company_id, GROUP_CONCAT(DISTINCT tt.tag_name ORDER BY t.tag_type_idx SEPARATOR '/') AS tag_name\n" +
            "FROM tag t\n" +
            "JOIN company c ON t.company_id = c.company_id\n" +
            "JOIN tag_type tt ON t.tag_type_idx = tt.tag_type_idx\n" +
            "GROUP BY c.company_id;", nativeQuery = true)       // nativeQuery -> 실제 쿼리를 이용해서 값을 받음
    List<Object[]> showCompanyListTag();

    @Query(value = "SELECT c.company_id, GROUP_CONCAT(DISTINCT tt.tag_name ORDER BY t.tag_type_idx SEPARATOR '/') AS tag_name\n" +
            "FROM tag t\n" +
            "JOIN company c ON t.company_id = c.company_id\n" +
            "JOIN tag_type tt ON t.tag_type_idx = tt.tag_type_idx\n" +
            "WHERE t.company_id=:companyid\n" +
            "GROUP BY c.company_id;", nativeQuery = true)
    List<Object[]> showCompanyDetailTag(@Param("companyid") String companyid);

    // 기업 회원 탈퇴(태그 삭제)
    void deleteByCompanyid(String companyid);
}
