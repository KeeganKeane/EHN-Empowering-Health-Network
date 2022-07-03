package jp.co.rakuten.ehnback.repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jp.co.rakuten.ehnback.dto.DisplayFoodCommentDto;
import jp.co.rakuten.ehnback.entity.FoodComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FoodCommentRepository extends JpaRepository<FoodComment, Integer> {
	Optional<FoodComment> findByFoodIdAndUserIdAndCommentContent(Integer foodId, Integer userId, String commentContent);

	@Query(
			value = "SELECT food_comments.id, users.id as user_id, users.username as user_name, " +
					"food_comments.comment_content, food_comments.created_at " +
					"FROM food_comments " +
					"INNER JOIN users ON (food_comments.user_id = users.id) " +
					"WHERE users.active_flag " +
					"AND food_comments.food_id = :foodId " +
					"ORDER BY food_comments.created_at DESC",
			nativeQuery = true
	)
	List<Object[]> findAllCommentByFoodIdRaw(Integer foodId);

	default List<DisplayFoodCommentDto> findAllCommentByFoodId(Integer foodId){
		return findAllCommentByFoodIdRaw(foodId)
				.stream()
				.map(DisplayFoodCommentDto::new)
				.collect(Collectors.toList());
	}
}
