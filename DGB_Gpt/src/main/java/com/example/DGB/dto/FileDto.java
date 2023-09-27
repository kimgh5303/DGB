package com.example.DGB.dto;

import com.example.DGB.entity.Attachment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FileDto {
    private String filename;

    public FileDto(String storedfilename){
        this.filename = storedfilename;
    }

    public Attachment toEntity() {
        return Attachment.builder()
                .filename(filename)
                .time(LocalDateTime.now())
                .build();
    }
}
