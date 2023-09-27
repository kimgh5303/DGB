package com.example.DGB.entity.report;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name="report")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ReportId.class)
public class Report {
    @Id
    @Column(name="contract_addr") @NotNull
    private String contractaddr;
    @Id
    @Column(name="report_id")
    private int reportid;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;
    @Column(name="file_name") @NotNull
    private String file_name;
    @Column(name="e_score")
    private Double escore;
    @Column(name="s_score")
    private Double sscore;
    @Column(name="g_score")
    private Double gscore;
}
