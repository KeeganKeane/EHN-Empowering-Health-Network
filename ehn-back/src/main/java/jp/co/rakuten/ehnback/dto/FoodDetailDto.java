package jp.co.rakuten.ehnback.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodDetailDto {

    private Integer foodId;
    private String foodName;
    private List<String> breadcrumbs;
    private String photoAddress;
    private Integer tastesSameCount;
    private Integer tastesDifferentCount;
    private Integer tastesWorseCount;
    private Integer noTastesCount;

}
