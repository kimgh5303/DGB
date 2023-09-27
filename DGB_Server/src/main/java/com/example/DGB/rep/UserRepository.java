package com.example.DGB.rep;

import com.example.DGB.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 실제 DB에 접근하는 객체
// Member findByidAndpw -> MefindBy : SELECT / id,pw : 애트리뷰트 / And : 조건

@Repository
public interface UserRepository extends JpaRepository<User, String> {       //  Spring Data JPA에서 제공하는 JpaRepository 인터페이스를 상속    <T,ID>

    User findByUseridAndUserpw(String userid, String userpw);               // 메서드명이 길어지지만 JPA 기본 제공 메서드와 구분하기 위함
    Optional<User> findById(String userid);                                 // JPA에서 기본 제공하는 엔티티의 식별자를 기준으로 엔티티를 찾아오는 메서드이므로 Optional을 통해 받아옴
                                                                            // Id -> DB 테이블의 PK애트리뷰트로 알아서 매핑해줌
    // User 토큰 보유량
    @Query(value = "SELECT u.token_value\n" +
            "FROM user u\n" +
            "WHERE u.user_id=:userid", nativeQuery = true)
    int findTokenvalueByUserid(@Param("userid") String userid);

    // User 블록체인 아이디 확인
    User findByBcid(String bcid);
    // 압류 대상자면 압류
    @Modifying
    @Query(value = "UPDATE user\n" +
            "SET user.token_value = user.token_value - :tokenvalue\n" +
            "WHERE user.bc_id = :bcid", nativeQuery = true)
    void seizureUserToken(@Param("tokenvalue") int tokenvalue, @Param("bcid") String bcid);

    // 이더리움 대기 아이디 승인
    @Modifying
    @Query(value = "UPDATE user\n" +
            "SET user.permission = true\n" +
            "WHERE user.bc_id = :bcid", nativeQuery = true)
    void giveUserPermission(@Param("bcid") String bcid);

}
