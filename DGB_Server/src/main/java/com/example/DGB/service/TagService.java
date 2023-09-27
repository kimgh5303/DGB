package com.example.DGB.service;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.TagDto;
import com.example.DGB.entity.Tag;
import com.example.DGB.rep.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    // 전체 기업 태그
    public ResponseEntity<AllResDto> showCompanyListTag(){
        List<Object[]> results = tagRepository.showCompanyListTag();
        return new ResponseEntity<>(new AllResDto(true, "전체 기업 태그", results), HttpStatus.OK);
    }

    // 개별 기업 태그
    public ResponseEntity<AllResDto> showCompanyDetailTag(String companyid){
        List<Object[]> results = tagRepository.showCompanyDetailTag(companyid);
        return new ResponseEntity<>(new AllResDto(true, "개별 기업 태그", results), HttpStatus.OK);
    }

    //------------------------------------------------------------------------------------------------------------------
    // 기업 회원 태그 등록 (개발용)
    public ResponseEntity<AllResDto> postCompanyTag(TagDto params) {
        Tag tag = params.toEntity();
        tagRepository.save(tag);
        return new ResponseEntity<>(new AllResDto(true, "태그 등록 성공"), HttpStatus.OK);

    }

    // 기업 회원 탈퇴(태그 삭제)(개발용)
    public ResponseEntity<AllResDto> deleteCompanyTag(String companyid){
        tagRepository.deleteByCompanyid(companyid);
        return new ResponseEntity<>(new AllResDto(true, "태그 삭제 성공"), HttpStatus.OK);
    }
}
