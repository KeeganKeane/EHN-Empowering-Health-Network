package jp.co.rakuten.ehnback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoggedinUserDto {
    private Boolean success;
    private String status;
    private Integer userId;
    private String userName;
    private Boolean adminFlag;
}
