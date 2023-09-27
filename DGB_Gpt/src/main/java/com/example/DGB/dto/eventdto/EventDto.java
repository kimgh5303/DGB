package com.example.DGB.dto.eventdto;

import com.example.DGB.entity.Event;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventDto {
    private String eventname;
    private String eventdesc;
    private String companyid;

    public Event toEntity() {
        return Event.builder()
                .eventname(eventname)
                .eventdesc(eventdesc)
                .companyid(companyid)
                .time(LocalDateTime.now())
                .build();
    }
}
