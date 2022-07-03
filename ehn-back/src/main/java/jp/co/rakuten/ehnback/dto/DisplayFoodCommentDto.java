package jp.co.rakuten.ehnback.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

@Data
@AllArgsConstructor
public class DisplayFoodCommentDto implements Serializable {

    public DisplayFoodCommentDto(Object[] objects){
        this(
                ((BigInteger) objects[0]).intValue(),
                ((BigInteger) objects[1]).intValue(),
                (String) objects[2],
                (String) objects[3],
                (Date) objects[4]
        );
    }

    private Integer id;
    private Integer userId;
    private String userName;
    private String comment;
    private Date createdAt;
}
