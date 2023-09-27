package com.example.DGB.rep.FeedRep;

import com.example.DGB.entity.Feed.UFeed;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UFeedRepository extends JpaRepository<UFeed, Integer> {
    // 개인 피드 조회
    @Query(value = "SELECT u.feed_idx, u.user_id, u.content, u.register_time\n" +
            "FROM user_feed u\n" +
            "WHERE u.user_id=:userid\n" +
            "ORDER BY u.register_time DESC", nativeQuery = true)
    List<UFeed> findByUserid(@Param("userid") String userid);
    //------------------------------------------------------------------------------------------------------------------
    // 개인 회원 탈퇴 피드 삭제 (개발용)
    void deleteByUserid(String userid);
}