package jp.co.rakuten.ehnback.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalCommentDisplayDTO {

	private String userName;
	private Integer userId;
	private Integer journalId;
	private String comment;
	private Date createdAt;

}