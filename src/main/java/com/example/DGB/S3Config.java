package com.example.DGB;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretKey}")
    private String secretKey;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.s3.bucketReport}")
    private String bucketReport;

    @Value("${aws.s3.bucketCompany}")
    private String bucketCompany;

    @Value("${aws.s3.bucketEvent}")
    private String bucketEvent;

    @Value("${aws.s3.bucketReview}")
    private String bucketReview;

    @Bean
    public String s3bucketReport() {
        return bucketReport;
    }

    @Bean
    public String s3BucketCompany() {
        return bucketCompany;
    }

    @Bean
    public String s3BucketEvent() {
        return bucketEvent;
    }

    @Bean
    public String s3BucketReview() {
        return bucketReview;
    }

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(() -> AwsBasicCredentials.create(accessKeyId, secretKey))
                .build();
    }
}
