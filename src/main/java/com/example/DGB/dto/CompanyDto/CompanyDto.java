package com.example.DGB.dto.CompanyDto;

import com.example.DGB.entity.Company;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CompanyDto {
    private String companyid;
    private String companypw;
    private String companyname;
    private String companydesc;
    private String bcid;
    private int tokenvalue;
    private boolean permission;

    public Company toEntity() {
        return Company.builder()
                .companyid(companyid)
                .companypw(companypw)
                .companyname(companyname)
                .companydesc(companydesc)
                .time(LocalDateTime.now())
                .bcid(bcid)
                .tokenvalue(tokenvalue)
                .permission(permission)
                .build();
    }
}