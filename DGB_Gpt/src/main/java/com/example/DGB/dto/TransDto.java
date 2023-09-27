package com.example.DGB.dto;

import com.example.DGB.entity.Trans;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TransDto {
    private String transid;
    private String fromid;
    private String toid;
    private int value;

    public Trans toEntity() {
        return Trans.builder()
                .transid(transid)
                .fromid(fromid)
                .toid(toid)
                .value(value)
                .time(LocalDateTime.now())
                .build();
    }
}
