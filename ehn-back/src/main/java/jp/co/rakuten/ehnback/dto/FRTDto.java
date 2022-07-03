package jp.co.rakuten.ehnback.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FRTDto {

    private Integer foodId;
    private String foodName;
    private String photoAddress;
    private Integer tastesSameCount;
    private Integer tastesDifferentCount;
    private Integer tastesWorseCount;
    private Integer noTastesCount;

}
