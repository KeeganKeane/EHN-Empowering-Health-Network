package jp.co.rakuten.ehnback.repository;

import java.util.List;
import java.util.Optional;
import jp.co.rakuten.ehnback.entity.JournalComment;
import jp.co.rakuten.ehnback.entity.JournalRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JournalRatingRepository extends JpaRepository<JournalRating, Integer> {
	Optional<JournalRating> findByPostIdAndUserId(Integer postId, Integer userId);
	Optional<List<JournalRating>> findAllByUserId(Integer userId);
}
