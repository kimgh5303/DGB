package com.example.DGB.rep;

import com.example.DGB.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    // DGB 토큰 보유량
    @Query(value = "SELECT SUM(e.token_value)\n" +
            "FROM admin e\n" +
            "WHERE e.admin_id=:adminid", nativeQuery = true)
    int findByAdminid(@Param("adminid") String adminid);

    // 전체 토큰 보유량
    @Query(value = "SELECT SUM(total.token_value)\n" +
            "FROM (\n" +
            "   SELECT token_value FROM admin\n" +
            "   UNION ALL\n" +
            "   SELECT token_value FROM user\n" +
            "   UNION ALL\n" +
            "   SELECT token_value FROM company\n" +
            ") AS total", nativeQuery = true)
    int showAlltoken();

    // DGB 토큰량 plus
    @Modifying
    @Query(value = "UPDATE admin\n" +
            "SET token_value = token_value + :plusnum\n" +
            "WHERE admin_id = :adminid", nativeQuery = true)
    void plusToken(@Param("plusnum") int plusnum, @Param("adminid") String adminid);

    // DGB 토큰량 minus
    @Modifying
    @Query(value = "UPDATE admin\n" +
            "SET token_value = token_value - :minusnum\n" +
            "WHERE admin_id = :adminid", nativeQuery = true)
    void minusToken(@Param("minusnum") int minusnum, @Param("adminid") String adminid);

    // 부정 고객 토큰 압류
    @Modifying
    @Query(value = "UPDATE admin\n" +
            "SET token_value = token_value + :tokenvalue\n" +
            "WHERE admin_id = :adminid", nativeQuery = true)
    void seizureAdminToken(@Param("tokenvalue") int tokenvalue, @Param("adminid") String adminid);

    // 이더리움 승인 대기 아이디
    @Query(value = "SELECT bc_id AS user_bc_id FROM user WHERE permission=false\n" +
            "UNION ALL\n" +
            "SELECT bc_id AS company_bc_id FROM company WHERE permission=false;", nativeQuery = true)
    List<Object[]> waitPermission();

    // 이더리움 대기 아이디 승인
}
