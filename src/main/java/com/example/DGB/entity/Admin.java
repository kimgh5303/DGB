package com.example.DGB.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name="admin")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @Column(name="admin_id") @NotNull
    private String adminid;
    @Column(name="admin_pw") @NotNull
    private String adminpw;
    @Column(name="bc_id")
    private String bcid;
    @Column(name="token_value")
    private int token_value;
}
