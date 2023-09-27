package com.example.DGB.rep.FeedRep;

import com.example.DGB.entity.Feed.AFeed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AFeedRepository extends JpaRepository<AFeed, Integer> {
    // 관리자 피드 조회
    @Query(value = "SELECT a.feed_idx, a.admin_id, a.content, a.register_time\n" +
            "FROM admin_feed a\n" +
            "WHERE a.admin_id=:adminid\n" +
            "ORDER BY a.register_time DESC", nativeQuery = true)
    List<AFeed> findByAdminid(@Param("adminid") String adminid);
}
