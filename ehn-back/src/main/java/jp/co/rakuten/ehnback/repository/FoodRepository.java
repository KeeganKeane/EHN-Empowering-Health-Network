package jp.co.rakuten.ehnback.repository;

import jp.co.rakuten.ehnback.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Integer> {

    @Query(value = "SELECT * FROM foods f WHERE f.active_flag ORDER BY (f.tastes_same_count + f.tastes_different_count + f.tastes_worse_count + f.no_tastes_count) DESC", nativeQuery = true)
    List<Food> findAllOrderByRatingCount();

    @Modifying
    @Query("update foods f set f.activeFlag = false where f.id = :foodId")
    int deactivateFood(@Param("foodId") Integer foodId);

    Optional<Food> findByIdAndActiveFlagTrue(Integer id);


    @Query(value =
            "SELECT foods.id, foods.name, foods.photo_address, foods.tastes_same_count, " +
            "foods.tastes_different_count, foods.tastes_worse_count, foods.no_tastes_count, foods.active_flag " +
            "FROM foods " +
            "WHERE foods.active_flag AND (MATCH (foods.name) AGAINST (:keyword IN BOOLEAN MODE)) " +
            "ORDER BY (foods.tastes_same_count + foods.tastes_different_count + foods.tastes_worse_count + foods.no_tastes_count) DESC",
    nativeQuery = true)
    List<Food> findAllByKeyword(@Param("keyword") String keyword);
}
