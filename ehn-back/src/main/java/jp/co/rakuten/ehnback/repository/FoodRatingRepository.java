package jp.co.rakuten.ehnback.repository;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jp.co.rakuten.ehnback.dto.DisplayUserRatingDto;
import jp.co.rakuten.ehnback.entity.FoodRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FoodRatingRepository extends JpaRepository<FoodRating, Integer> {
	Optional<FoodRating> findByFoodIdAndUserId(Integer foodId, Integer userId);

	@Query(
			value = "SELECT food_ratings.food_id as food_id, foods.name as food_name, " +
					"foods.photo_address, " +
					"CASE food_ratings.rating " +
					"WHEN 0 THEN 'Tastes Same' " +
					"WHEN 1 THEN 'Tastes Different' " +
					"WHEN 2 THEN 'Tastes Worse' " +
					"WHEN 3 THEN 'No Tastes' END, " +
					"foods.tastes_same_count, " +
					"foods.tastes_different_count, foods.tastes_worse_count, foods.no_tastes_count " +
					"FROM food_ratings " +
					"INNER JOIN users ON (food_ratings.user_id = users.id) " +
					"INNER JOIN foods ON (food_ratings.food_id = foods.id) " +
					"WHERE food_ratings.user_id = :userId AND foods.active_flag AND users.active_flag",
	nativeQuery = true)
	List<Object[]> findAllRatingHistoryRaw(Integer userId);

	default List<DisplayUserRatingDto> findAllRatingHistory(Integer userId){
		return findAllRatingHistoryRaw(userId)
				.stream()
				.map(DisplayUserRatingDto::new)
				.collect(Collectors.toList());
	}
}
