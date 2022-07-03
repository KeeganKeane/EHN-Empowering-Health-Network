package jp.co.rakuten.ehnback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalDisplayDto {

    private Integer userId;
    private String username;
    private Integer journalId;
    private String title;
    private String content;
    private Date createdAt;
    private Date modifiedAt;
    private Integer overallRating;
    private Integer ageGroup;
    private Integer vaccinationStatus;
    private Integer likedStatus;

}