package jp.co.rakuten.ehnback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalReportDTO {

	private Integer userId;
	private Integer journalId;
	private String message;

}