package jp.co.rakuten.ehnback.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

@Data
@AllArgsConstructor
public class HidedJournalDisplayDto implements Serializable {

    public HidedJournalDisplayDto(Object[] objects){
        this(
                ((BigInteger) objects[0]).intValue(),
                ((BigInteger) objects[1]).intValue(),
                (String) objects[2],
                (String) objects[3],
                (String) objects[4],
                (Date) objects[5],
                (Date) objects[6],
                ((BigInteger) objects[7]).intValue(),
                (Byte) objects[8],
                (Byte) objects[9]
        );
    }

    private Integer journalId;
    private Integer userId;
    private String userName;
    private String title;
    private String content;
    private Date createdAt;
    private Date modifiedAt;
    private Integer overallRating;
    private Byte ageGroup;
    private Byte vaccinationStatus;

}
