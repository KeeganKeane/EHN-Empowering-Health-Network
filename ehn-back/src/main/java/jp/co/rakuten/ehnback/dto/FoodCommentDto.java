package jp.co.rakuten.ehnback.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoodCommentDto {

	private Integer userId;
	private Integer foodId;
	private String commentContent;

}
