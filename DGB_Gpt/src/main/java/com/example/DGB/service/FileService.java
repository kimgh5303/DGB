package com.example.DGB.service;

import com.example.DGB.entity.Attachment;
import com.example.DGB.error.CustomException;
import com.example.DGB.error.ErrorCode;
import com.example.DGB.dto.FileDto;
import com.example.DGB.file.FileManager;
import com.example.DGB.rep.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService {

    private final FileRepository fileRepository;
    private final FileManager fileManager;
    private final S3Service s3Service;

    // 파일 저장
    public Attachment saveAttachment(MultipartFile multipartFile, String bucketname) throws IOException {
        FileDto fileDto = fileManager.compFile(multipartFile);                                                          // 파일 이름, 시간 등 파일 저장을 위한 메소드
        Attachment attachment = fileDto.toEntity();
        attachment.setBucketname(bucketname);                                                                           // 어느 테이블의 파일인지 구분
        try {
            attachment = fileRepository.save(attachment);
        } catch (
                RuntimeException e) {                                                                                   // @Transactional로 처리하면 두 메서드를 동시에 처리할 수 없으므로 DB에 exception을 걸어줌
            throw new CustomException(ErrorCode.TRANS_FAIL);
        }
        s3Service.uploadFile(fileDto.getFilename(), bucketname, multipartFile);                                         // 실제 파일을 S3에 저장
//        fileManager.storeFile(multipartFile, fileDto.getFilename(), fileReference);                                   // 실제 파일을 경로에 저장
        return attachment;
    }

    // 한 개 파일 -> 개인, 기업, 행사 파일 삭제
    public void deleteAttachment(String fileName, String bucketName) {
        fileRepository.deleteByFilename(fileName);                                                                      // 파일을 DB에서 삭제
        s3Service.deleteImage(fileName, bucketName);                                                                    // 파일을 s3에서 삭제
//        fileManager.deleteFile(fileName, fileReference);                                                              // 파일을 스토리지에서 삭제
    }

    // 다수의 파일 -> 리뷰 파일 삭제
    public void deleteAttachments(List<String> files, String bucketName) {
        fileRepository.deleteByFilenameIn(files);                                                                       // 파일을 DB에서 삭제
        s3Service.deleteImages(files, bucketName);                                                                      // 파일들을 s3에서 삭제
//        fileManager.deleteFiles(files, bucketName);                                                                     // 파일을 스토리지에서 삭제
    }

    // 다수의 파일 -> 다수 행사 리뷰 파일 삭제 (개발용)
    public void deleteAttachmentsList(List<List<String>> files, String bucketName) {
        for(List<String> file : files){
            fileRepository.deleteByFilenameIn(file);
            s3Service.deleteImages(file, bucketName);                                                                   // 파일들을 s3에서 삭제
//            fileManager.deleteFiles(file, bucketName);                                                                // 파일을 스토리지에서 삭제
        }
    }
}
