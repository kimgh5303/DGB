package com.example.DGB.rep;

import com.example.DGB.entity.Company;
import com.example.DGB.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, String> {

    Company findByCompanyidAndCompanypw(String companyid, String companypw);       // 메서드명이 길어지지만 JPA 기본 제공 메서드와 구분하기 위함
    Optional<Company> findById(String companyid);                                  // JPA에서 기본 제공하는 엔티티의 식별자를 기준으로 엔티티를 찾아오는 메서드이므로 Optional을 통해 받아옴
                                                                                   // Id -> DB 테이블의 PK애트리뷰트로 알아서 매핑해줌
    Company findByCompanyid(String companyid);
    @Query(value = "SELECT c.company_id, c.company_name, f.bucket_name, f.file_name, c.token_value\n" +
            "FROM company c\n" +
            "JOIN file f ON c.file_name = f.file_name;", nativeQuery = true)      // nativeQuery -> 실제 쿼리를 이용해서 값을 받음
    List<Object[]> showCompanyList();                                             // 필드 2개를 받아와서 객체로 받아올수 없음

    // contractAddr값 추가
    @Modifying
    @Query(value = "UPDATE company\n" +
            "SET contract_addr = :contractaddr\n" +
            "WHERE company_id = :companyid", nativeQuery = true)
    // 보고서를 담는 컨트렉트(블록체인) 생성 -> 계정당 하나
    void updateContractAddr(@Param("companyid") String companyid, @Param("contractaddr") String contractaddr);

    // Company 블록체인 압류 아이디 확인
    Company findByBcid(String bcid);
    // 압류 대상자면 압류
    @Modifying
    @Query(value = "UPDATE company\n" +
            "SET company.token_value = company.token_value - :tokenvalue\n" +
            "WHERE company.bc_id = :bcid", nativeQuery = true)
    void seizureCompanyToken(@Param("tokenvalue") int tokenvalue, @Param("bcid") String bcid);

    // 이더리움 대기 아이디 승인
    @Modifying
    @Query(value = "UPDATE company\n" +
            "SET company.permission = true\n" +
            "WHERE company.bc_id = :bcid", nativeQuery = true)
    void giveCompanyPermission(@Param("bcid") String bcid);

    //------------------------------------------------------------------------------------------------------------------
    void deleteById(String companyid);
}
