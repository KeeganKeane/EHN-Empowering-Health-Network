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
public class FoodRequestDto {

    private Integer id;
    private Integer userId;
    private String message;
    private Date createdAt;

}
