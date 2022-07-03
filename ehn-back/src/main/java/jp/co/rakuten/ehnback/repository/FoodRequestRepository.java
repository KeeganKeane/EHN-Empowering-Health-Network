package jp.co.rakuten.ehnback.repository;

import java.util.List;
import java.util.Optional;
import jp.co.rakuten.ehnback.entity.FoodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRequestRepository extends JpaRepository<FoodRequest, Integer> {
	Optional<FoodRequest> findByUserIdAndMessage(Integer userId, String message);
	List<FoodRequest> findAll();
}
