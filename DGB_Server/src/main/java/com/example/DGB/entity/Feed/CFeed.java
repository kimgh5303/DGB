package com.example.DGB.entity.Feed;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data                                               // getter,setter 만들어줌
@Entity(name="company_feed")                               // 테이블 명을 작성, 해당 클래스가 Entity임을 알려줌
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 파라미터가 없는 기본 생성자를 생성, 의미 없는 객체 생성을 막음
@AllArgsConstructor                                 // 해당 클래스의 모든 필드 생성자를 만들어줌
public class CFeed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="feed_idx") @NotNull
    private int feedidx;
    @Column(name="company_id") @NotNull
    private String companyid;
    @Column(name="content") @NotNull
    private String content;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;

    public CFeed(String companyid, String content, LocalDateTime time){
        this.companyid = companyid;
        this.content = content;
        this.time = time;
    }
}
