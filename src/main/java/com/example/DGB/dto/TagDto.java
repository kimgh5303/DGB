package com.example.DGB.dto;

import com.example.DGB.entity.Review;
import com.example.DGB.entity.Tag;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TagDto {
    private int tagtypeidx;
    private String companyid;

    public Tag toEntity() {
        return Tag.builder()
                .tagtypeidx(tagtypeidx)
                .companyid(companyid)
                .build();
    }
}
