package com.example.DGB;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS 오류 처리
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // s3 사용 안할때 사용
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        // 로컬 파일 경로
        registry.addResourceHandler("/company/**")
                .addResourceLocations("file:///C:/Users/kimgh/Desktop/serverFile/company/");

        registry.addResourceHandler("/event/**")
                .addResourceLocations("file:///C:/Users/kimgh/Desktop/serverFile/event/");

        registry.addResourceHandler("/review/**")
                .addResourceLocations("file:///C:/Users/kimgh/Desktop/serverFile/review/");
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*") // 안에 해당 주소를 넣어도 됨
                        .allowedHeaders("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS" , "PATCH")
                        .exposedHeaders("Authorization", "RefreshToken");
                //.allowCredentials(true); // .allowedOriginPatterns("*") 이렇게 와일드 카드로 설정하면 이거 쓰면 에러남 ( 실행 조차  X )
            }
        };
    }
}
