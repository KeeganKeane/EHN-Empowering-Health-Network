package jp.co.rakuten.ehnback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalLikeDTO {

	private Integer userId;
	private Integer journalId;

}