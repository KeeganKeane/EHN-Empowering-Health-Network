package jp.co.rakuten.ehnback.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import jp.co.rakuten.ehnback.entity.JournalComment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Journal Comment Repository containing operations created from the JpaRepository
 *
 */
public interface JournalCommentRepository extends JpaRepository<JournalComment, Integer> {
	Optional<List<JournalComment>> findAllByPostId(Integer postId);
	Optional<JournalComment> findByUserIdAndCommentContentAndCreatedAt(Integer userId, String comment, Date createdAt);
}
