package com.example.DGB.rep;

import com.example.DGB.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<Attachment, Integer> {
    Attachment findByFilename(int filename);
    void deleteByFilenameIn(List<String> reviewFiles);
    void deleteByFilename(String filename);
}
