package com.example.DGB.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data                                               // getter,setter 만들어줌
@Entity(name="comment")                                // 테이블 명을 작성, 해당 클래스가 Entity임을 알려줌
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 파라미터가 없는 기본 생성자를 생성, 의미 없는 객체 생성을 막음
@AllArgsConstructor                                 // 해당 클래스의 모든 필드 생성자를 만들어줌
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Comment_idx") @NotNull
    private int commentidx;
    @Column(name="company_id") @NotNull
    private String companyid;
    @Column(name="user_id") @NotNull
    private String userid;
    @Column(name="comment_desc")
    private String commentdesc;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;

}
