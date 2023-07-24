package com.example.DGB.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name="transaction")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Trans {
    @Id
    @Column(name="trans_id") @NotNull
    private String transid;
    @Column(name="from_id") @NotNull
    private String fromid;
    @Column(name="to_id") @NotNull
    private String toid;
    @Column(name="value") @NotNull
    private int value;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;
    @Column(name="type") @NotNull
    private String type;
}
