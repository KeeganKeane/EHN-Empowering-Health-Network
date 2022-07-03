package jp.co.rakuten.ehnback.repository;


// TODO find another way (SqlResultMapping, ResultTransformer and so on...)

import jp.co.rakuten.ehnback.entity.JournalReportWithName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JournalReportWithNameRepository
        extends JpaRepository<JournalReportWithName, Integer> {

    @Query(value=
            "SELECT post_reports.id, users.id as user_id, users.username as user_name, " +
                    "post_reports.message, post_reports.created_at " +
                    "FROM post_reports " +
                    "INNER JOIN users ON (post_reports.user_id = users.id) " +
                    "WHERE post_reports.active_flag AND users.active_flag " +
                    "AND post_reports.post_id = :journalId",
    nativeQuery = true)
    List<JournalReportWithName> findReportsByJournalId(Integer journalId);

}
