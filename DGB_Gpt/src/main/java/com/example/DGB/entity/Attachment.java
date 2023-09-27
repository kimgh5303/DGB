package com.example.DGB.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name="file")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Attachment {
    @Id
    @Column(name="file_name") @NotNull
    private String filename;
    @Column(name="bucket_name") @NotNull
    private String bucketname;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;
}
