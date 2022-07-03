package jp.co.rakuten.ehnback.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigInteger;

@Data
@AllArgsConstructor
public class DisplayUserRatingDto implements Serializable {

    public DisplayUserRatingDto(Object[] objects){
        this(
                ((BigInteger) objects[0]).intValue(),
                (String) objects[1],
                (String) objects[2],
                (String) objects[3],
                ((BigInteger) objects[4]).intValue(),
                ((BigInteger) objects[5]).intValue(),
                ((BigInteger) objects[6]).intValue(),
                ((BigInteger) objects[7]).intValue()
                );
    }

    private Integer foodId;
    private String foodName;
    private String photoAddress;
    private String rating;
    private Integer tastesSameCount;
    private Integer tastesDifferentCount;
    private Integer tastesWorseCount;
    private Integer noTastesCount;
}
