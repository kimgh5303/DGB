package com.example.DGB.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

import java.io.IOException;
import java.util.List;

@Service
//@RequiredArgsConstructor
public class S3Service {
    private final S3Client s3Client;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    // s3에 파일을 업로드
    public void uploadFile(String fileName, String bucketName, MultipartFile multipartFile) throws IOException {
        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(multipartFile.getContentType())
                .contentLength(multipartFile.getSize())
                .build();

        s3Client.putObject(request, RequestBody.fromInputStream(multipartFile.getInputStream(), multipartFile.getSize()));
    }

    // s3에 있는 파일을 삭제
    public void deleteImage(String fileName, String bucketName) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
        s3Client.deleteObject(request);
    }

    // s3에 있는 여러 파일들을 삭제
    public void deleteImages(List<String> files, String bucketName) {
        for (String fileName : files) {
            DeleteObjectRequest request = DeleteObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .build();
            s3Client.deleteObject(request);
        }
    }

//    // s3에 있는 파일을 다운로드
//    public ResponseInputStream<GetObjectResponse> downloadImage(String fileName, String bucketName) {
//        return s3Client.getObject(GetObjectRequest.builder()
//                .bucket(bucketName)
//                .key(fileName)
//                .build());
//    }
}

