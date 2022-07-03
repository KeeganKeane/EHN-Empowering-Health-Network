package jp.co.rakuten.ehnback.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import jp.co.rakuten.ehnback.entity.JournalComment;
import jp.co.rakuten.ehnback.entity.JournalReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

/**
 * Journal Post Repository containing operations created from the JpaRepository
 *
 */
public interface JournalReportRepository extends JpaRepository<JournalReport, Integer> {

    @Transactional
    @Modifying
    @Query("update post_reports pr set pr.activeFlag = false where pr.postId = :JournalId")
    int deactiveReport(@Param("JournalId") Integer JournalId);

	Optional<List<JournalReport>> findAllByUserIdAndPostId(Integer userId, Integer postId);

    List<JournalReport> findByActiveFlagTrue();
}
