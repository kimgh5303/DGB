package com.example.DGB.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name="company")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @Column(name="company_id") @NotNull
    private String companyid;
    @Column(name="company_pw") @NotNull
    @JsonIgnore
    private String companypw;
    @Column(name="company_name") @NotNull
    private String companyname;
    @Column(name="company_desc")
    private String companydesc;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;
    @Column(name="file_name") @NotNull
    private String filename;
    @Column(name="bc_id")
    private String bcid;
    @Column(name="token_value")
    private int tokenvalue;
    @Column(name="contract_addr")
    private String contractaddr;
    @Column(name="permission")
    private boolean permission;
}
