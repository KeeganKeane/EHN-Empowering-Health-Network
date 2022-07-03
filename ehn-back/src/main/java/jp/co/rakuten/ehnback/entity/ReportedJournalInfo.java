package jp.co.rakuten.ehnback.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReportedJournalInfo {
    @Id
    private Integer journalId;
    private Integer userId;
    private String userName;
    private String journalTitle;
    private Integer reportedCount;
    private Date createdAt;
}
