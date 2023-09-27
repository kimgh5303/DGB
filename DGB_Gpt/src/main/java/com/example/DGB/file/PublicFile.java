package com.example.DGB.file;

public enum PublicFile {
    // 기업 프로필
    COMPANY("publicCompany.jpeg"),
    // 행사 프로필
    EVENT("publicEvent.png");

    private String fileName;

    PublicFile(String fileName) {
        this.fileName = fileName;
    }

    public String getFileName() {
        return fileName;
    }
}
