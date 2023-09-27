package com.example.DGB;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class OtherFunction {
    
    // 시간 형식 변환 메서드 -> localDateTime To String
    public List<Object[]> changeShowTime(List<Object[]> results, int index){
        for (Object[] row : results) {
            java.sql.Timestamp joinTime = (java.sql.Timestamp) row[index]; // 시간 인덱스
            LocalDateTime localDateTime = joinTime.toLocalDateTime(); // java.sql.Timestamp를 java.time.LocalDateTime로 변환

            // 원하는 형식으로 변환
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String formattedTime = localDateTime.format(formatter);
            row[index] = formattedTime;
        }
        return results;
    }

    // 시간 형식 변환 메서드 -> String To LocalDateTime
    public LocalDateTime changeRegisterTime(String dateTimeString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(dateTimeString, formatter);
        return dateTime;
    }
}
