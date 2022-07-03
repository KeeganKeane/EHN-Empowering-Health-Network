package jp.co.rakuten.ehnback.dto;

		import lombok.AllArgsConstructor;
		import lombok.Builder;
		import lombok.Data;
		import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JournalCreateDTO {

	private Integer userId;
	private String title;
	private String content;

}