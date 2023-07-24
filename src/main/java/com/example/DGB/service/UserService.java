package com.example.DGB.service;

import com.example.DGB.dto.resdto.AllResDto;
import com.example.DGB.dto.UserDto;
import com.example.DGB.entity.Trans;
import com.example.DGB.entity.User;
import com.example.DGB.error.CustomException;
import com.example.DGB.error.ErrorCode;
import com.example.DGB.rep.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService{

    // final -> 오직 한 번만 할당 = readOnly
    // repository 재할당을 막기 위해서 final을 써줌 -> 실행중 객체가 변하는 것을 막을 수 있고 오류를 방지
    private final UserRepository userRepository;

    // User 로그인
    public ResponseEntity<AllResDto> loginUser(final UserDto params){
        User tempUser = userRepository.findByUseridAndUserpw(params.getUserid(), params.getUserpw());
        if(tempUser==null){throw new CustomException(ErrorCode.USER_NOT_FIND);}
        return new ResponseEntity<>(new AllResDto(true, "회원정보 일치", tempUser), HttpStatus.OK);
    }

    // User 회원가입
    @Transactional  // Exception 발생 시 자동 Rollback
    public ResponseEntity<AllResDto> joinUser(final UserDto params){
        User tempUser = params.toEntity();
        if(userRepository.findById(tempUser.getUserid()).isPresent()){throw new CustomException(ErrorCode.USER_EXIST);}
        userRepository.save(tempUser);
        return new ResponseEntity<>(new AllResDto(true, "유저 등록 성공"), HttpStatus.OK);
    }

    // User 상세페이지
    public ResponseEntity<AllResDto> getUserInfo(final String userid){
        Optional<User> tempUser = userRepository.findById(userid);
        return new ResponseEntity<>(new AllResDto(true, "회원정보 조회", tempUser), HttpStatus.OK);
    }

    // User 토큰 보유량
    public ResponseEntity<AllResDto> getUserToken(final String userid){
        int tokenValue = userRepository.findTokenvalueByUserid(userid);
        return new ResponseEntity<>(new AllResDto(true, "회원 토큰 보유량 조회", tokenValue), HttpStatus.OK);
    }

    // User 블록체인 압류 아이디 확인
    @Transactional
    public boolean seizureUserToken(Trans params){
        User user = userRepository.findByBcid(params.getFromid());
        if(user==null){return false;}
        else{
            userRepository.seizureUserToken(params.getValue(), params.getFromid());
            return true;
        }
    }

    // User 이더리움 대기 아이디 확인
    @Transactional
    public boolean giveUserPermission(String bcid){
        User user = userRepository.findByBcid(bcid);
        if(user==null){return false;}
        else{
            userRepository.giveUserPermission(bcid);
            return true;
        }
    }
}
