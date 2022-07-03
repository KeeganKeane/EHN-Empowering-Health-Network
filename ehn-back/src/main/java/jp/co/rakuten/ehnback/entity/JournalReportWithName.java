package jp.co.rakuten.ehnback.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;


// TODO find another way (SqlResultMapping, ResultTransformer and so on...)

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class JournalReportWithName {

    @Id
    private Integer id;
    private Integer userId;
    private String userName;
    private String message;
    private Date createdAt;
}
