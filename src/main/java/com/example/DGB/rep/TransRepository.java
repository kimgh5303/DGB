package com.example.DGB.rep;

import com.example.DGB.entity.Trans;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransRepository extends JpaRepository<Trans, Integer> {

    // DGB -> 개인 (활동)
    // DGB 토큰 감소 update
    @Modifying
    @Query(value = "UPDATE admin\n" +
            "SET admin.token_value = admin.token_value - :#{#trans.value}\n" +
            "WHERE admin.bc_id = :#{#trans.fromid}", nativeQuery = true)
    void updateDGBTokenMinus(@Param("trans") Trans trans);
    // 개인 토큰 증가 update
    @Modifying
    @Query(value = "UPDATE user\n" +
            "SET user.token_value = user.token_value + :#{#trans.value}\n" +
            "WHERE user.bc_id = :#{#trans.toid}", nativeQuery = true)
    void updateUserTokenPlus(@Param("trans") Trans trans);
    // (DGB->개인) 개인 id, 이름 조회
    @Query(value = "SELECT DISTINCT a.admin_id, u.user_id, u.user_name, t.type\n" +
            "FROM transaction t\n" +
            "JOIN admin a ON t.from_id = a.bc_id\n" +
            "JOIN user u ON t.to_id = u.bc_id\n" +
            "WHERE t.trans_id = :#{#trans.transid}", nativeQuery = true)
    String showAToUFeed(@Param("trans") Trans trans);


    // 개인 -> 기업 (기부)
    // 개인 토큰 감소 update
    @Modifying
    @Query(value = "UPDATE user\n" +
            "SET user.token_value = user.token_value - :#{#trans.value}\n" +
            "WHERE user.bc_id = :#{#trans.fromid}", nativeQuery = true)
    void updateUserTokenMinus(@Param("trans") Trans trans);
    // 기업 토큰 증가 update
    @Modifying
    @Query(value = "UPDATE company\n" +
            "SET company.token_value = company.token_value + :#{#trans.value}\n" +
            "WHERE company.bc_id = :#{#trans.toid}", nativeQuery = true)
    void updateCompanyTokenPlus(@Param("trans") Trans trans);
    // (개인->기업) 개인 id, 기업 이름 조회
    @Query(value = "SELECT DISTINCT u.user_id, c.company_id, u.user_name, c.company_name\n" +
            "FROM transaction t\n" +
            "JOIN user u ON t.from_id = u.bc_id\n" +
            "JOIN company c ON t.to_id = c.bc_id\n" +
            "WHERE t.trans_id = :#{#trans.transid}", nativeQuery = true)
    String showUToCFeed(@Param("trans") Trans trans);


    // 기업 -> DGB (투자)
    // 기업 토큰 감소 update
    @Modifying
    @Query(value = "UPDATE company\n" +
            "SET company.token_value = company.token_value - :#{#trans.value}\n" +
            "WHERE company.bc_id = :#{#trans.fromid}", nativeQuery = true)
    void updateCompanyTokenMinus(@Param("trans") Trans trans);
    // DGB 토큰 증가 update
    @Modifying
    @Query(value = "UPDATE admin\n" +
            "SET admin.token_value = admin.token_value + :#{#trans.value}\n" +
            "WHERE admin.bc_id = :#{#trans.toid}", nativeQuery = true)
    void updateDGBTokenPlus(@Param("trans") Trans trans);
    // (기업->DGB) 기업 id, 이름 조회
    // (+몰수)
    @Query(value = "SELECT DISTINCT a.admin_id, c.company_id, c.company_name\n" +
            "FROM transaction t\n" +
            "JOIN company c ON t.from_id = c.bc_id\n" +
            "JOIN admin a ON t.to_id = a.bc_id\n" +
            "WHERE t.trans_id = :#{#trans.transid}", nativeQuery = true)
    String showCToAFeed(@Param("trans") Trans trans);

    // (개인 -> DGB) (몰수) 개인 id, 이름 조회
    @Query(value = "SELECT DISTINCT a.admin_id, u.user_id, u.user_name\n" +
            "FROM transaction t\n" +
            "JOIN user u ON t.from_id = u.bc_id\n" +
            "JOIN admin a ON t.to_id = a.bc_id\n" +
            "WHERE t.trans_id = :#{#trans.transid}", nativeQuery = true)
    String showUToAFeed(@Param("trans") Trans trans);

    // 기부한 기업 목록(개인)
    @Query(value = "SELECT c.company_id, c.company_name, f.bucket_name, f.file_name, GROUP_CONCAT(DISTINCT tt.tag_name ORDER BY t.tag_type_idx SEPARATOR '/') AS tag_name\n" +
            "FROM transaction tr\n" +
            "JOIN company c ON c.bc_id = tr.to_id\n" +
            "JOIN file f ON c.file_name = f.file_name\n" +
            "JOIN tag t ON t.company_id = c.company_id\n" +
            "JOIN tag_type tt ON t.tag_type_idx = tt.tag_type_idx\n" +
            "WHERE tr.from_id = :userbcid AND tr.type = 'donation'" +
            "GROUP BY c.company_id;", nativeQuery = true)
    List<Object[]> showDonTrans(@Param("userbcid") String userbcid);
}
