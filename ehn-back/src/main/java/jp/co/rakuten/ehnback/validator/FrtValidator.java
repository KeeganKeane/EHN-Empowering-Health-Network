package jp.co.rakuten.ehnback.validator;

import jp.co.rakuten.ehnback.dto.FoodCommentDto;
import jp.co.rakuten.ehnback.dto.FoodRateDto;
import jp.co.rakuten.ehnback.dto.FoodRequestDto;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import lombok.extern.slf4j.Slf4j;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.*;

@Slf4j
public class FrtValidator {


	/**
	 * Validate keyword
	 *
	 * @param keyword
	 */
	public static void keywordValidator(String keyword){
		if(keyword.isBlank()){
			throw new InvalidRequestException(INVALID_KEYWORD);
		}
	}

	/**
	 * Validates the format of the rate food endpoint
	 *
	 * @param FoodRateDto
	 */
	public static void rateFoodValidator(FoodRateDto foodRateDto){
		checkIdNotNull(foodRateDto.getFoodId());
		checkIdNotNull(foodRateDto.getUserId());
		checkRating(foodRateDto.getRating());
	}

	/**
	 * Validates Id formats
	 *
	 * @param Integer
	 */
	private static void checkIdNotNull(Integer id){
		if(id == null || id == 0){
			throw new InvalidRequestException(INVALID_ID);
		}
	}

	/**
	 * Validates the format of the "rating" field
	 *
	 * @param String
	 */
	private static void checkRating(String rating){
		if(! rating.equals("Tastes Worse") && ! rating.equals("Tastes Same") && ! rating.equals("Tastes Different") && ! rating.equals("No Tastes")){
			throw new InvalidRequestException(INVALID_RATING);
		}
	}

	/**
	 * Validates the format of the FoodRequestDto for the "request food" endpoint
	 *
	 * @param FoodRequestDto
	 */
	public static void requestFoodValidator(FoodRequestDto foodRequestDto){
		checkIdNotNull(foodRequestDto.getUserId());
		if(foodRequestDto.getMessage().isBlank()){
			throw new InvalidRequestException(INVALID_EMPTYCONTENTS);
		}
		else if(foodRequestDto.getMessage().length() > 256){
			throw new InvalidRequestException(INVALID_REPORTLENGTH);
		}

	}

	/**
	 * Validates the format of the "Comment on Food" endpoint
	 *
	 * @param FoodRateDto
	 */
	public static void foodCommentValidator(FoodCommentDto foodCommentDto){
		checkIdNotNull(foodCommentDto.getUserId());
		checkIdNotNull(foodCommentDto.getFoodId());

		if(foodCommentDto.getCommentContent().isBlank()){
			throw new InvalidRequestException(INVALID_EMPTYCONTENTS);
		}
		else if(foodCommentDto.getCommentContent().length() > 1024){
			throw new InvalidRequestException(INVALID_COMMENTLENGTHCONTENTS);
		}

	}

}
