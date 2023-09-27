package com.example.DGB.file;

import com.example.DGB.dto.FileDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

// 파일 저장하는 메소드를 따로 구성
@Component
public class FileManager {

    @Value("${file.dir}/")
    private String filePath;      // 파일 저장 경로

    // 파일 Dto 구성
    public FileDto compFile(MultipartFile multipartFile){
        String fileName = createfileName(multipartFile.getOriginalFilename());        // 저장할 파일 이름
        FileDto fileDto = new FileDto(fileName);
        return fileDto;
    }

    // 저장할 파일 이름 구성
    private String createfileName(String originalfileName) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalfileName);
        String fileName = uuid + ext;
        return fileName;
    }

    // 확장자 추출
    private String extractExt(String originalfileName) {
        int idx = originalfileName.lastIndexOf(".");
        String ext = originalfileName.substring(idx);
        return ext;
    }

    // 파일 경로 구성
    public String createPath(String fileName, String fileReference) {
        return filePath+fileReference+"/"+fileName;
    }


    //------------------------------------------------------------------------------------------------------------------
    // S3 안쓸때 사용
    // 파일을 로컬 시스템에 실제로 저장
    public void storeFile(MultipartFile multipartFile, String fileName, String fileReference) throws IOException {
        // 임시 저장 경로의 파일 객체 생성
        File tempFile = new File(createPath(fileName, fileReference));
        multipartFile.transferTo(tempFile);
    }

    // 파일을 실제로 삭제 -> 한 개 파일
    public void deleteFile(String fileName, String fileReference) {
        File file = new File(createPath(fileName, fileReference));
        if (file.exists()) {    // 파일이 존재하는지 확인
            file.delete();      // 파일 삭제
        }
    }

    // 파일을 실제로 삭제 -> 다수의 파일
    public void deleteFiles(List<String> Files, String fileReference) {
        for (String fileName : Files) {
            File file = new File(createPath(fileName, fileReference));
            if (file.exists()) {    // 파일이 존재하는지 확인
                file.delete();      // 파일 삭제
            }
        }
    }
}
