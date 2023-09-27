package com.example.DGB.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Data                                               // getter,setter 만들어줌
@Entity(name="user")                                // 테이블 명을 작성, 해당 클래스가 Entity임을 알려줌
@Builder
// 빌더를 사용할 수 있게 함, 생성자가 없는 경우 : 모든 멤버 변수를 파라미터로 받는 기본 생성자 생성 / 생성자가 있을 경우 : 따로 생성자를 생성하지 않음
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 파라미터가 없는 기본 생성자를 생성, 의미 없는 객체 생성을 막음
@AllArgsConstructor                                 // 해당 클래스의 모든 필드 생성자를 만들어줌
public class User {
    @Id                                                             // 기본 키값
    @Column(name="user_id") @NotNull                                // name="" -> mysql DB 참조용 컬럼명, 대소문자는 상관없는듯
    private String userid;                                              // repository 메서드용 컬럼명
    @Column(name="user_pw") @NotNull
    @JsonIgnore
    private String userpw;
    @Column(name="user_name") @NotNull
    private String username;
    @Column(name="register_time") @NotNull
    private LocalDateTime time;
    @Column(name="bc_id")
    private String bcid;
    @Column(name="token_value")
    private int tokenvalue;
    @Column(name="permission")
    private boolean permission;
}