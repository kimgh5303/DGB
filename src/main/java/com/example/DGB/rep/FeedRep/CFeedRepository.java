package com.example.DGB.rep.FeedRep;

import com.example.DGB.entity.Feed.CFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CFeedRepository extends JpaRepository<CFeed, Integer> {
    // 기업별 피드 조회
    @Query(value = "SELECT c.feed_idx, c.company_id, c.content, c.register_time\n" +
            "FROM company_feed c\n" +
            "WHERE c.company_id=:companyid\n" +
            "ORDER BY c.register_time DESC", nativeQuery = true)
    List<CFeed> findByCompanyid(@Param("companyid") String companyid);

    //------------------------------------------------------------------------------------------------------------------
    // 기업 회원 탈퇴 피드 삭제 (개발용)
    void deleteByCompanyid(String companyid);
}
