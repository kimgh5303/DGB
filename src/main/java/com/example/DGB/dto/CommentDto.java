package com.example.DGB.dto;

import com.example.DGB.entity.Comment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private String companyid;
    private String userid;
    private String commentdesc;
    private String time;                        // String으로 받아서 Service에서 형식을 바꿔줌
    private String companyname;
    private String username;

    public Comment toEntity(){
        return Comment.builder()
                .companyid(companyid)
                .userid(userid)
                .commentdesc(commentdesc)
                .build();
    }
}
