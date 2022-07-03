package jp.co.rakuten.ehnback.controller;

import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.entity.Food;
import jp.co.rakuten.ehnback.service.FRTService;
import jp.co.rakuten.ehnback.service.UserService;
import jp.co.rakuten.ehnback.validator.FrtValidator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
@RequestMapping("/frt")
public class FRTController {

    @Autowired
    FRTService frtService;
	@Autowired
	UserService userService;

    /**
     * Endpoint to get all FRT ordered by number of ratings
     *
     * @return list of FRT
     */
    @GetMapping("")
    public List<FRTDto> getFRTDtoList() {
        return frtService.getFRTs();
    }

	/**
	 * End point to get the food
	 *
	 * @param foodId
	 * @return
	 */
	@GetMapping("/getFood/{foodId}")
	public FoodDetailDto getFood(@PathVariable Integer foodId) throws IOException {
		return frtService.getFood(foodId);
	}

	/**
	 * Endpoint for a user to rate a specific food
	 *
	 * @return SuccessEntity
	 */
	@PostMapping("/rate")
	public SuccessEntity rateFood(@RequestBody FoodRateDto foodRateDto) throws IOException {
		FrtValidator.rateFoodValidator(foodRateDto);
		return frtService.rateFood(foodRateDto);
	}

	/**
	 * Endpoint for a user to request a specific food
	 *
	 * @return Success Entity
	 */
	@PostMapping("/request")
	public SuccessEntity requestFood(@RequestBody FoodRequestDto foodRequestDto) {
		FrtValidator.requestFoodValidator(foodRequestDto);
		return frtService.requestFood(foodRequestDto);
	}


	/**
	 * Endpoint for a user to comment on a food item
	 *
	 * @return Success Entity
	 */
	@PostMapping("/comment")
	public SuccessEntity commentFood(@RequestBody FoodCommentDto foodCommentDto) {
		FrtValidator.foodCommentValidator(foodCommentDto);
		return frtService.commentFood(foodCommentDto);
	}


	/**
	 * Endpoint to get cooments on the food
	 *
	 * @param foodId
	 * @return
	 */
	@GetMapping("/comment/{foodId}")
	public List<DisplayFoodCommentDto> getFoodComment(@PathVariable Integer foodId){
		return frtService.getFoodComment(foodId);
	}

	/**
	 * Endpoint to search food by keyword
	 *
	 * @param keyword
	 * @return
	 */
	@GetMapping("/search")
	public List<FRTDto> searchFood(@RequestParam("keyword") String keyword) throws IOException {
		FrtValidator.keywordValidator(keyword);
		return frtService.searchFood(keyword);
	}

	/**
	 * Endpoint for get rating
	 *
	 * @param foodId
	 * @return
	 */
	@GetMapping("/rateHistory")
	public Map<String, String> rateHistory(@RequestParam("foodId") Integer foodId){
		Integer userId = userService.getUserIdFromAuth();
		return frtService.rateHistory(userId, foodId);
	}


	/**
	 * Endpoint for get all rating of the user
	 *
	 * @return
	 */
	@GetMapping("/allRateHistory")
	public List<DisplayUserRatingDto> allRateHistory(){
		Integer userId = userService.getUserIdFromAuth();
		return frtService.allRateHistory(userId);
	}

}
