package jp.co.rakuten.ehnback.repository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jp.co.rakuten.ehnback.dto.HidedJournalDisplayDto;
import jp.co.rakuten.ehnback.entity.JournalPost;
import org.apache.catalina.mapper.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Journal Post Repository containing operations created from the JpaRepository
 *
 */
public interface JournalPostRepository extends JpaRepository<JournalPost, Integer> {
	Optional<List<JournalPost>> findAllByCreateUserId(Integer userId);
	Optional<JournalPost> findByIdAndCreateUserId(Integer postId, Integer userId);
	Optional<JournalPost> findByCreateUserIdAndCreatedAt(Integer postId, Date createdAt);

	@Query(
			value="SELECT posts.id as journal_id, users.id as user_id, " +
					"users.username as user_name, posts.title, " +
					"posts.content, posts.created_at, posts.updated_at as modified_at, posts.like_count as overall_rating, " +
					"users.age_group, users.vaccination_status " +
					"FROM posts " +
					"INNER JOIN users ON (posts.create_user_id = users.id) " +
					"WHERE posts.active_flag = false " +
					"ORDER BY posts.created_at DESC",
			nativeQuery = true)
	List<Object[]> findAllHidedJournalRaw();

	default List<HidedJournalDisplayDto> findAllHidedJournal(){
		return findAllHidedJournalRaw()
				.stream()
				.map(HidedJournalDisplayDto::new)
				.collect(Collectors.toList());
	}

	@Query(
			value="SELECT posts.id as journal_id, users.id as user_id, " +
					"users.username as user_name, posts.title, " +
					"posts.content, posts.created_at, posts.updated_at as modified_at, posts.like_count as overall_rating, " +
					"users.age_group, users.vaccination_status " +
					"FROM posts " +
					"INNER JOIN users ON (posts.create_user_id = users.id) " +
					"WHERE posts.active_flag = false AND posts.id = :journalId",
			nativeQuery = true)
	Object[] findHidedJournalRaw(Integer journalId);

	default HidedJournalDisplayDto findHidedJournal(Integer journalId){
		Object[] objects = findHidedJournalRaw(journalId);
		HidedJournalDisplayDto hidedJournalDisplayDto =
				new HidedJournalDisplayDto((Object[]) objects[0]);
		return hidedJournalDisplayDto;
	}
}
