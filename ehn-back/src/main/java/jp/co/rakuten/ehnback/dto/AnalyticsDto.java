package jp.co.rakuten.ehnback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsDto {

    private Map<String, Integer> users;
    private Map<String, Integer> ageGroup;
    private Map<String, Integer> vaccinationStatus;
    private Map<String, Integer> parosmia;
}
