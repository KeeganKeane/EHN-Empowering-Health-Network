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
public class UpdateUserDto {

    private String userName;
    private String email;
    private Integer ageGroup;
    private Integer vaccinationStatus;
    private Date positiveResultDate;
    private Boolean parosmia;
    private Boolean currentlyInfected;

}
