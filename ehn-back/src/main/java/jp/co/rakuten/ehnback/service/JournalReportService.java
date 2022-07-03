package jp.co.rakuten.ehnback.service;

import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.entity.JournalPost;
import jp.co.rakuten.ehnback.entity.JournalReport;
import jp.co.rakuten.ehnback.entity.JournalReportWithName;
import jp.co.rakuten.ehnback.entity.ReportedJournalInfo;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import jp.co.rakuten.ehnback.repository.JournalPostRepository;
import jp.co.rakuten.ehnback.repository.JournalReportRepository;
import jp.co.rakuten.ehnback.repository.JournalReportWithNameRepository;
import jp.co.rakuten.ehnback.repository.ReportedJournalRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_JOURNALID;

@Service
@AllArgsConstructor
@Slf4j
public class JournalReportService {

    @Autowired
    JournalReportRepository journalReportRepository;

    @Autowired
    JournalPostRepository journalPostRepository;

    @Autowired
    ReportedJournalRepository reportedJournalRepository;

    @Autowired
    JournalReportWithNameRepository journalReportWithNameRepository;

    /**
     * Get all reports on a specific journal
     *
     * @return List<ReportDto>
     */
    public List<JournalReportWithName> getReports(Integer journalId){

        Optional<JournalPost> journal = journalPostRepository.findById(journalId);
        if(journal.isEmpty()){
            throw new InvalidRequestException(INVALID_JOURNALID);
        }

        // TODO find another way (SqlResultMapping, ResultTransformer and so on...)
        return journalReportWithNameRepository.findReportsByJournalId(journalId);
    }

    /**
     * Get all reported journal
     *
     * @return List<ReportedJournalInfo>
     */
    public List<ReportedJournalInfo> getAllReports(){
        return reportedJournalRepository.findAllReportedJournal();
    }

    /**
     * hide reported journal
     *
     * @return SuccessEntity
     */
    public SuccessEntity hideJournal(Integer id){
        SuccessEntity successEntity = new SuccessEntity();

        // TODO hide journal by @query
        Optional<JournalPost> journal = journalPostRepository.findById(id);
        if(journal.isPresent()){
            // hide journal
            JournalPost hideJournalPost = journal.get();
            hideJournalPost.setActiveFlag(false);
            journalPostRepository.save(hideJournalPost);
            // hide reports
            int num = journalReportRepository.deactiveReport(id);
            System.out.println("num of deleted reports = " + num);
            successEntity.setSuccess(true);
        }else{
            throw new InvalidRequestException(INVALID_JOURNALID);
        }

        return successEntity;
    }

    /**
     * dismiss reports
     *
     * @param id
     * @return SuccessEntity
     */
    public SuccessEntity dismissReport(Integer id){

        Optional<JournalPost> journal = journalPostRepository.findById(id);
        if(journal.isEmpty()){
            throw new InvalidRequestException(INVALID_JOURNALID);
        }

        int num = journalReportRepository.deactiveReport(id);
        System.out.println("num of deleted reports = " + num);

        SuccessEntity successEntity = new SuccessEntity();
        successEntity.setSuccess(true);

        return successEntity;
    }

    private ReportDto getReportDto(JournalReport report){
        return ReportDto.builder()
                .reportId(report.getId())
                .postId(report.getPostId())
                .userId(report.getUserId())
                .message(report.getMessage())
                .createdAt(report.getCreatedAt())
                .build();
    }
}
