package jp.co.rakuten.ehnback.service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import ch.qos.logback.classic.spi.TurboFilterList;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.entity.Food;
import jp.co.rakuten.ehnback.entity.FoodComment;
import jp.co.rakuten.ehnback.entity.FoodRating;
import jp.co.rakuten.ehnback.entity.FoodRequest;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import jp.co.rakuten.ehnback.model.FoodIdModel;
import jp.co.rakuten.ehnback.model.WordSearchFoodModel;
import jp.co.rakuten.ehnback.model.WordSearchResultModel;
import jp.co.rakuten.ehnback.repository.FoodCommentRepository;
import jp.co.rakuten.ehnback.repository.FoodRatingRepository;
import jp.co.rakuten.ehnback.repository.FoodRepository;
import jp.co.rakuten.ehnback.repository.FoodRequestRepository;
import jp.co.rakuten.ehnback.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.print.attribute.standard.Sides;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.*;

@Slf4j
@Service
@Transactional
public class FRTService {

	@Value("${X-RapidAPI-Host}")
	String API_HOST;

	@Value("${X-RapidAPI-Key}")
	String API_KEY;

	String ID_SEARCH_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/";
	String WORD_SEARCH_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search";

	private OkHttpClient client = new OkHttpClient();

    @Autowired
    private FoodRepository foodRepository;
	@Autowired
	private FoodRatingRepository foodRatingRepository;
	@Autowired
	private FoodRequestRepository foodRequestRepository;
	@Autowired
	private FoodCommentRepository foodCommentRepository;
	@Autowired
	private UserRepository userRepository;

    /**
     * Get FRT as list based on popularity (= number of ratings)
     *
     * @return FRTListDto
     */
    public List<FRTDto> getFRTs() {
        List<Food> foodList = foodRepository.findAllOrderByRatingCount();
        return getFRTDtoList(foodList);
    }


    /**
     * Save food
     *
     * @param frtDto
     * @return SuccessEntity
     */
    public SuccessEntity addFood(FRTDto frtDto){
        Food food = foodRepository.save(getFood(frtDto));

        SuccessEntity successEntity = new SuccessEntity();
        successEntity.setSuccess(true);
        return successEntity;
    }

    /**
     * hide food
     *
     * @param foodId
     * @return SuccessEntity
     */
    public SuccessEntity removeFood(Integer foodId){
        // food id validation
        if(!foodRepository.existsById(foodId)){
            throw new InvalidRequestException(INVALID_FOODID);
        }

        int num = foodRepository.deactivateFood(foodId);
        System.out.println("delete item : " + num);
        SuccessEntity successEntity = new SuccessEntity();
        successEntity.setSuccess(true);
        return successEntity;
    }

    /**
     * Get all food requests
     *
     * @return List<FoodRequestDto>
     */
    public List<FoodRequestDto> getAllFoodRequests(){
        List<FoodRequest> foodRequestslist = foodRequestRepository.findAll();
        return getFoodRequestDtoList(foodRequestslist);
    }


    private List<FRTDto> getFRTDtoList(List<Food> foodList) {
        List<FRTDto> frtDtoList = new ArrayList<>();
        for (Food food : foodList) {
            frtDtoList.add(getFRTDto(food));
        }
        return frtDtoList;
    }

    private FRTDto getFRTDto(Food food) {
        return FRTDto.builder()
                .foodId(food.getId())
                .foodName(food.getName())
                .photoAddress(food.getPhotoAddress())
                .tastesSameCount(food.getTastesSameCount())
                .tastesDifferentCount(food.getTastesDifferentCount())
                .tastesWorseCount(food.getTastesWorseCount())
                .noTastesCount(food.getNoTastesCount())
                .build();
    }


	/**
	 * Get food by id
	 *
	 * @param foodId
	 * @return FRTDto
	 * @throws IOException
	 */
	public FoodDetailDto getFood(Integer foodId) throws IOException {
		// Call food api
		String result = CallIdSearchApi(foodId);
		FoodDetailDto foodDetailDto = jsonStringToFoodDetailDto(result);

		// Check DB
		Optional<Food> foodOpt = foodRepository.findByIdAndActiveFlagTrue(foodId);
		if(foodOpt.isPresent()){
			Food food = foodOpt.get();
			foodDetailDto.setTastesSameCount(food.getTastesSameCount());
			foodDetailDto.setTastesDifferentCount(food.getTastesDifferentCount());
			foodDetailDto.setTastesWorseCount(food.getTastesWorseCount());
			foodDetailDto.setNoTastesCount(food.getNoTastesCount());
		}

		return foodDetailDto;
	}

	/**
	 *
	 * @param foodRateDto
	 * @return
	 * @throws IOException
	 */
	public SuccessEntity rateFood(FoodRateDto foodRateDto) throws IOException {
		//Validation
		checkIfUserExist(foodRateDto.getUserId());

		//If food is not exists in DB yet
		if(!foodRepository.existsById(foodRateDto.getFoodId())) {
			// Get food from food api
			String result = CallIdSearchApi(foodRateDto.getFoodId());
			Food food = jsonStringToFood(result); // if you change count null, set null after here
			foodRepository.save(food);
		}

		//Now, food already exist in DB
		return rateExistFood(foodRateDto);
	}

	/**
	 * Get comments on the food
	 *
	 * @param foodId
	 * @return List<DisplayFoodCommentDto>
	 */
	public List<DisplayFoodCommentDto> getFoodComment(Integer foodId){
		return foodCommentRepository.findAllCommentByFoodId(foodId);
	}

	/**
	 * User can rate a listed food
	 *
	 * @param FoodRateDto
	 * @return SuccessEntity
	 */
	public SuccessEntity rateExistFood(FoodRateDto foodRateDto) {
		//Validation
		checkIfUserExist(foodRateDto.getUserId());
		checkIfFoodExist(foodRateDto.getFoodId());

		//Logic
		FoodRating foodRating = new FoodRating();
		Food food = foodRepository.getById(foodRateDto.getFoodId());
		//Check if the user has previously rated a food, remove previous rating if so
		if(Boolean.TRUE.equals(checkIfUserRated(foodRateDto.getFoodId(), foodRateDto.getUserId()))) {
			foodRating.setId(foodRatingRepository.findByFoodIdAndUserId(foodRateDto.getFoodId(), foodRateDto.getUserId()).get().getId());
			removePreviousRating(foodRateDto, food);
		}
		Integer rating;
		switch (foodRateDto.getRating()) {
			case "Tastes Same":
				foodRating.setRating(0);
				rating = food.getTastesSameCount() + 1;
				food.setTastesSameCount(rating);
				foodRepository.save(food);
				break;
			case "Tastes Different":
				foodRating.setRating(1);
				rating = food.getTastesDifferentCount() + 1;
				food.setTastesDifferentCount(rating);
				foodRepository.save(food);
				break;
			case "Tastes Worse":
				foodRating.setRating(2);
				rating = food.getTastesWorseCount() + 1;
				food.setTastesWorseCount(rating);
				foodRepository.save(food);
				break;
			case "No Tastes":
				foodRating.setRating(3);
				rating = food.getNoTastesCount() + 1;
				food.setNoTastesCount(rating);
				foodRepository.save(food);
				break;
			default:
				throw new InvalidRequestException(INVALID_RATING);
		}
		//Save changes
		foodRating.setFoodId(foodRateDto.getFoodId());
		foodRating.setUserId(foodRateDto.getUserId());
		foodRatingRepository.save(foodRating);

		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);
		return successEntity;
	}


	/**
	 * Search food from DBa and Food Api
	 *
	 * @param keyword
	 * @return List<FRTDto>
	 * @throws IOException
	 */
	public List<FRTDto> searchFood(String keyword) throws IOException {

		// Get foods from DB
		List<Food> dbFoodList = foodRepository.findAllByKeyword(keyword);
		List<FRTDto> frtDtoList = dbFoodList.stream()
				.map(food -> getFRTDto(food))
				.collect(Collectors.toList());
		List<Integer> frtDtoIdList = dbFoodList.stream()
				.map(food -> food.getId())
				.collect(Collectors.toList());

		//Get foods from food api
		String result = CallWordSearchApi(keyword);
		System.out.println(result);
		Gson gson = new GsonBuilder().serializeNulls().create();
		WordSearchResultModel allResult = gson.fromJson(result, WordSearchResultModel.class);
		List<WordSearchFoodModel> foodResultList = allResult.getFoodList();

		// TODO find more fast way
		// Food -> FRTDto
		for (WordSearchFoodModel foodResult : foodResultList){
			if(!frtDtoIdList.contains(foodResult.getId())) {
				frtDtoList.add(FRTDto.builder()
						.foodName(foodResult.getTitle())
						.foodId(foodResult.getId())
						.photoAddress(foodResult.getImage())
						.tastesSameCount(0).tastesDifferentCount(0).tastesWorseCount(0).noTastesCount(0)
						.build());
			}
		}

		return frtDtoList;
	}


	/**
	 * Get rate history
	 *
	 * @param userId
	 * @param foodId
	 * @return Map<String, String>
	 */
	public Map<String, String> rateHistory(Integer userId, Integer foodId){
		Optional<FoodRating> foodRatingOpt =
				foodRatingRepository.findByFoodIdAndUserId(foodId, userId);

		if(foodRatingOpt.isEmpty()){
			throw new InvalidRequestException(INVALID_IDCOMBINATION);
		}

		Integer rate = foodRatingOpt.get().getRating();
		Map<String, String> rateMap = new HashMap<>();
		switch (rate) {
			case 0:
				rateMap.put("rating", "Tastes Same");
				break;
			case 1:
				rateMap.put("rating", "Tastes Different");
				break;
			case 2:
				rateMap.put("rating", "Tastes Worse");
				break;
			case 3:
				rateMap.put("rating", "No Tastes");
				break;
		}

		return rateMap;
	}

	/**
	 * Get all rating history of the user
	 *
	 * @param userId
	 * @return List<DisplayUserRatingDto>
	 */
	public List<DisplayUserRatingDto> allRateHistory(Integer userId){
		checkIfUserExist(userId);
		return foodRatingRepository.findAllRatingHistory(userId);
	}


	/**
	 * User can request a specific food
	 *
	 * @param FoodRequestDto
	 * @return SuccessEntity
	 */
	public SuccessEntity requestFood(FoodRequestDto foodRequestDto) {
		//Validation
		checkIfUserExist(foodRequestDto.getUserId());
		checkIfRequestExist(foodRequestDto);

		//Logic
		Date date = new Date();
		FoodRequest foodRequest = new FoodRequest();
		foodRequest.setUserId(foodRequestDto.getUserId());
		foodRequest.setMessage(foodRequestDto.getMessage());
		foodRequest.setCreatedAt(date);
		foodRequestRepository.save(foodRequest);

		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);
		return successEntity;
	}

	/**
	 * User can comment on a food item
	 *
	 * @param FoodCommentDto
	 * @return SuccessEntity
	 */
	public SuccessEntity commentFood(FoodCommentDto foodCommentDto) {
		//Validation
		checkIfUserExist(foodCommentDto.getUserId());
		checkIfFoodExist(foodCommentDto.getFoodId());
		checkIfCommentSpam(foodCommentDto);

		//Logic
		Date date = new Date();
		FoodComment foodComment = new FoodComment();
		foodComment.setUserId(foodCommentDto.getUserId());
		foodComment.setFoodId(foodCommentDto.getFoodId());
		foodComment.setCommentContent(foodCommentDto.getCommentContent());
		foodComment.setCreatedAt(date);
		foodCommentRepository.save(foodComment);

		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);
		return successEntity;
	}

	/**
	 * Checks to see if a user with the associated user Id exists
	 *
	 * @param Integer
	 */
	private void checkIfUserExist(Integer userId) {
		if(userRepository.findById(userId).isEmpty()){
			throw new InvalidRequestException(INVALID_USERID);
		}
	}

	/**
	 * Checks to see if a food with the associated food Id exists
	 *
	 * @param Integer
	 */
	private void checkIfFoodExist(Integer foodId) {
		if(foodRepository.findById(foodId).isEmpty()){
			throw new InvalidRequestException(INVALID_FOODID);
		}
	}

	/**
	 * Checks to see if a user has already rated the specific food. ************
	 *
	 * @param Integer
	 * @param Integer
	 */
	private Boolean checkIfUserRated(Integer foodId, Integer userId){
		if(foodRatingRepository.findByFoodIdAndUserId(foodId, userId).isPresent()){
			return true;
		}else{
			return false;
		}

	}

	/**
	 * Checks to see if a user has already requested the same food
	 *
	 * @param FoodRequestDto
	 */
	private void checkIfRequestExist(FoodRequestDto foodRequestDto){
		if(foodRequestRepository.findByUserIdAndMessage(foodRequestDto.getUserId(), foodRequestDto.getMessage()).isPresent()){
			throw new InvalidRequestException(INVALID_REQUESTEXISTS);
		}
	}

	/**
	 * Checks to see if the user has already commented the same thing on the same post
	 *
	 * @param FoodCommentDto
	 */
	private void checkIfCommentSpam(FoodCommentDto foodCommentDto){
		if(foodCommentRepository.findByFoodIdAndUserIdAndCommentContent(foodCommentDto.getFoodId(), foodCommentDto.getUserId(), foodCommentDto.getCommentContent()).isPresent()){
			throw new InvalidRequestException(INVALID_COMMENTEXISTS);
		}
	}

	/**
	 * When a user re-rates the food, this method removes their previous rating from the tally
	 *
	 * @param FoodCommentDto
	 * @param Food
	 */
	private void removePreviousRating(FoodRateDto foodRateDto, Food food){
		FoodRating previousFoodRating = foodRatingRepository.findByFoodIdAndUserId(foodRateDto.getFoodId(), foodRateDto.getUserId()).get();
		Integer rating;
		switch (previousFoodRating.getRating()) {
			case 0:
				rating = food.getTastesSameCount() - 1;
				food.setTastesSameCount(rating);
				foodRepository.save(food);
				break;
			case 1:
				rating = food.getTastesDifferentCount() - 1;
				food.setTastesDifferentCount(rating);
				foodRepository.save(food);
				break;
			case 2:
				rating = food.getTastesWorseCount() - 1;
				food.setTastesWorseCount(rating);
				foodRepository.save(food);
				break;
			case 3:
				rating = food.getNoTastesCount() - 1;
				food.setNoTastesCount(rating);
				foodRepository.save(food);
				break;
			default:
				throw new InvalidRequestException(INVALID_RATING);
		}
	}


    private Food getFood(FRTDto frtDto){
        Food food = new Food();
        food.setName(frtDto.getFoodName());
        food.setPhotoAddress(frtDto.getPhotoAddress());
        food.setTastesSameCount(frtDto.getTastesSameCount() != null?
                frtDto.getTastesSameCount() : 0);
        food.setTastesDifferentCount(frtDto.getTastesDifferentCount() != null?
                frtDto.getTastesDifferentCount() : 0);
        food.setTastesWorseCount(frtDto.getTastesWorseCount() != null?
                frtDto.getTastesWorseCount() : 0);
        food.setNoTastesCount(frtDto.getNoTastesCount() != null?
                frtDto.getNoTastesCount() : 0);
        food.setActiveFlag(true);
        return food;
    }

    private FoodRequestDto getFoodRequestDto(FoodRequest foodRequest){
        return FoodRequestDto.builder()
                .id(foodRequest.getId())
                .userId(foodRequest.getUserId())
                .message(foodRequest.getMessage())
                .createdAt(foodRequest.getCreatedAt())
                .build();
    }

    private List<FoodRequestDto> getFoodRequestDtoList(List<FoodRequest> foodRequestList){
        return foodRequestList.stream()
                .map(foodRequest -> getFoodRequestDto(foodRequest))
                .collect(Collectors.toList());
        }


	/**
	 *  Call food id search api
	 *
	 * @param foodId
	 * @return String
	 * @throws IOException
	 */
	private String CallIdSearchApi(Integer foodId) throws IOException {
		Request request = new Request.Builder()
				.url(ID_SEARCH_URL + foodId)
				.addHeader("X-RapidAPI-Host", API_HOST)
				.addHeader("X-RapidAPI-Key", API_KEY)
				.build();
		Call call = client.newCall(request);
		Response response = call.execute();
		ResponseBody body = response.body();
		String result = response.body().string();
		System.out.println(result);
		return result;
	}


	/**
	 *  Call food api by keyword
	 *
	 * @param keyword
	 * @return String
	 * @throws IOException
	 */
	private String CallWordSearchApi(String keyword) throws IOException {

		HttpUrl.Builder urlBuilder = HttpUrl.parse(WORD_SEARCH_URL).newBuilder();

		//Set request param
		Map<String, String> paramMap = new HashMap<>();
		paramMap.put("query", keyword);
		paramMap.put("number", "100");
		paramMap.forEach(urlBuilder::addQueryParameter);

		Request request = new Request.Builder()
				.url(urlBuilder.build())
				.addHeader("X-RapidAPI-Host", API_HOST)
				.addHeader("X-RapidAPI-Key", API_KEY)
				.build();
		Call call = client.newCall(request);
		Response response = call.execute();
		ResponseBody body = response.body();
		String result = response.body().string();
		System.out.println(result);
		return result;
	}


	/**
	 * Convert jsonString to food
	 *
	 * @param result
	 * @return String
	 */
	private Food jsonStringToFood(String result){
		Gson gson = new GsonBuilder().serializeNulls().create();
		FoodIdModel foodIdModel = gson.fromJson(result, FoodIdModel.class);

		//Validation for food id
		if (foodIdModel.getTitle() == null) {
			throw new InvalidRequestException(INVALID_FOODID);
		}

		Food food = new Food();
		food.setId(foodIdModel.getId());
		food.setPhotoAddress(foodIdModel.getImages().get(0));
		food.setName(foodIdModel.getTitle());
		food.setTastesSameCount(0);
		food.setTastesDifferentCount(0);
		food.setTastesWorseCount(0);
		food.setNoTastesCount(0);
		food.setActiveFlag(true);

		return food;
	}

	private FoodDetailDto jsonStringToFoodDetailDto(String result){
		Gson gson = new GsonBuilder().serializeNulls().create();
		FoodIdModel foodIdModel = gson.fromJson(result, FoodIdModel.class);

		//Validation for food id
		if (foodIdModel.getTitle() == null) {
			throw new InvalidRequestException(INVALID_FOODID);
		}

		return FoodDetailDto.builder()
				.foodId(foodIdModel.getId())
				.foodName(foodIdModel.getTitle())
				.breadcrumbs(foodIdModel.getBreadcrumbs())
				.photoAddress(foodIdModel.getImages().get(0))
				.tastesSameCount(0)
				.tastesDifferentCount(0)
				.tastesWorseCount(0)
				.noTastesCount(0)
				.build();
	}


}
