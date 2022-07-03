package jp.co.rakuten.ehnback.repository;

import jp.co.rakuten.ehnback.entity.JournalPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;


public interface JournalSearchRepository extends JpaRepository<JournalPost, Integer> {

    @Query(
            value = "SELECT posts.id, posts.create_user_id, posts.created_at, posts.updated_at, posts.title, posts.content, posts.like_count, posts.active_flag " +
                    "FROM posts " +
                    "INNER JOIN users ON (users.id = posts.create_user_id) " +
                    "WHERE posts.active_flag AND ((posts.title LIKE %?3%) OR (posts.content LIKE %?3%) OR (users.username LIKE %?3%)) " +
                    "ORDER BY TIMESTAMP(posts.created_at) DESC " +
                    "LIMIT ?1, ?2",
            nativeQuery = true)
    List<JournalPost> findAllByKeywordOrderByLatest(Long offset, Integer size, String keyword, String sortKey);

    @Query(
            value = "SELECT posts.id, posts.create_user_id, posts.created_at, posts.updated_at, posts.title, posts.content, posts.like_count, posts.active_flag " +
                    "FROM posts " +
                    "INNER JOIN users ON (users.id = posts.create_user_id) " +
                    "WHERE posts.active_flag AND ((posts.title LIKE %?3%) OR (posts.content LIKE %?3%) OR (users.username LIKE %?3%)) " +
                    "ORDER BY posts.like_count DESC " +
                    "LIMIT ?1, ?2",
            nativeQuery = true)
    List<JournalPost> findAllByKeywordOrderByPopularity(Long offset, Integer size, String keyword, String sortKey);

    @Query(
            value = "SELECT posts.id, posts.create_user_id, posts.created_at, posts.updated_at, posts.title, posts.content, posts.like_count, posts.active_flag " +
                    "FROM posts " +
                    "INNER JOIN users ON (users.id = posts.create_user_id) " +
                    "WHERE posts.active_flag AND ((posts.title LIKE %?3%) OR (posts.content LIKE %?3%) OR (users.username LIKE %?3%)) " +
                    "ORDER BY TIMESTAMP(posts.created_at) ASC " +
                    "LIMIT ?1, ?2",
            nativeQuery = true)
    List<JournalPost> findAllByKeywordOrderByOldest(Long offset, Integer size, String keyword, String sortKey);

    @Query(
            value = "SELECT posts.id, posts.create_user_id, posts.created_at, posts.updated_at, posts.title, posts.content, posts.like_count, posts.active_flag " +
                    "FROM posts " +
                    "INNER JOIN users ON (users.id = posts.create_user_id) " +
                    "WHERE posts.active_flag AND (users.age_group BETWEEN :lower_age_group AND :upper_age_group) " +
                    "ORDER BY TIMESTAMP(posts.created_at) DESC " +
                    "LIMIT :offset, :size",
            nativeQuery = true)
    List<JournalPost> findAllByAgeGroup(@Param("offset") Long offset, @Param("size") Integer size, @Param("lower_age_group") Integer lowerAgeGroup, @Param("upper_age_group") Integer upperAgeGroup);

    @Query(
            value = "SELECT posts.id, posts.create_user_id, posts.created_at, posts.updated_at, posts.title, posts.content, posts.like_count, posts.active_flag " +
                    "FROM posts " +
                    "WHERE posts.active_flag AND (posts.created_at BETWEEN :lower_date AND :upper_date) " +
                    "ORDER BY TIMESTAMP(posts.created_at) DESC " +
                    "LIMIT :offset, :size",
            nativeQuery = true)
    List<JournalPost> findAllByDate(@Param("offset") Long offset, @Param("size") Integer size, @Param("lower_date") Date lowerDate, @Param("upper_date") Date upperDate);

    @Query(
            value = "SELECT posts.id, posts.create_user_id, posts.created_at, posts.updated_at, posts.title, posts.content, posts.like_count, posts.active_flag " +
                    "FROM posts " +
                    "WHERE posts.active_flag AND (posts.like_count BETWEEN :lower_rating AND :upper_rating) " +
                    "ORDER BY TIMESTAMP(posts.created_at) DESC " +
                    "LIMIT :offset, :size",
            nativeQuery = true)
    List<JournalPost> findAllByRating(@Param("offset") Long offset, @Param("size") Integer size, @Param("lower_rating") Integer lowerRating, @Param("upper_rating") Integer upperRating);
}
