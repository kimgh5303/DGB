package com.example.DGB.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data                                               // getter,setter 만들어줌
@Entity(name="tag")                                // 테이블 명을 작성, 해당 클래스가 Entity임을 알려줌
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)  // 파라미터가 없는 기본 생성자를 생성, 의미 없는 객체 생성을 막음
@AllArgsConstructor                                 // 해당 클래스의 모든 필드 생성자를 만들어줌
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="tag_idx") @NotNull
    private int tagidx;
    @Column(name="tag_type_idx") @NotNull
    private int tagtypeidx;
    @Column(name="company_id") @NotNull
    private String companyid;
}

