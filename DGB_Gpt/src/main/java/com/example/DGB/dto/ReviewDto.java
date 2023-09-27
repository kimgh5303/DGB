package com.example.DGB.dto;

import com.example.DGB.entity.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewDto {
    private int eventidx;
    private String userid;
    private String reviewdesc;
    private String companyid;
    private String username;

    public Review toEntity() {
        return Review.builder()
                .eventidx(eventidx)
                .userid(userid)
                .reviewdesc(reviewdesc)
                .time(LocalDateTime.now())
                .build();
    }
}
