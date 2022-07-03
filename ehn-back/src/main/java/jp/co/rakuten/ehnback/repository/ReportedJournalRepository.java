package jp.co.rakuten.ehnback.repository;

import jp.co.rakuten.ehnback.entity.ReportedJournalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ReportedJournalRepository extends JpaRepository<ReportedJournalInfo, Integer> {

    @Query(value =
            "SELECT posts.id as journal_id, users.id as user_id, users.username as user_name, " +
                    "posts.title as journal_title, count(post_reports.post_id) as reported_count, posts.created_at " +
                    "FROM post_reports " +
                    "INNER JOIN posts ON (post_reports.post_id = posts.id) " +
                    "INNER JOIN users ON (posts.create_user_id = users.id) " +
                    "WHERE post_reports.active_flag AND posts.active_flag " +
                    "GROUP BY post_reports.post_id " +
                    "ORDER BY reported_count DESC",
            nativeQuery = true)
    List<ReportedJournalInfo> findAllReportedJournal();

}
