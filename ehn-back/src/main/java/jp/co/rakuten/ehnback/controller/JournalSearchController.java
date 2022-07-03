package jp.co.rakuten.ehnback.controller;

import jp.co.rakuten.ehnback.dto.JournalDisplayDto;
import jp.co.rakuten.ehnback.service.JournalSearchService;
import jp.co.rakuten.ehnback.validator.JournalPostValidator;
import jp.co.rakuten.ehnback.service.UserService;
import jp.co.rakuten.ehnback.validator.JournalSearchValidator;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/journal")
public class JournalSearchController {

    @Autowired
    JournalSearchService journalSearchService;
    @Autowired
    UserService userService;

    /**
     * Endpoint to GET all journal posts matched with keyword
     *
     * @param pageable (Pageable)
     * @param keyword (String)
     * @param sortKey (String)
     * @return list of journal posts
     */
    @GetMapping("/search")
    public List<JournalDisplayDto> getJournalsByKeyword(
            Pageable pageable,
            @RequestParam("keyword") String keyword,
            @RequestParam(value = "sortKey", required = false) String sortKey) {

        /* Validation */
        JournalSearchValidator.validateJournalSearchKeyword(keyword);
        if (sortKey == null) {
            sortKey = "newest";
        } else {
            JournalPostValidator.validateSortKey(sortKey);
        }

        /* Logic */
        Integer userId = userService.getUserIdFromAuth();
        // For Anonymous Users
        if (userId == null) { return journalSearchService.getJournalsByKeyword(pageable, keyword, sortKey); }
        // For Logged In Users
        else { return journalSearchService.getJournalsByKeywordWithUserId(pageable, keyword, sortKey, userId); }
    }

    /**
     * Endpoint to GET all journal posts filter by filterKey (ageGroup, date or rating)
     *
     * @param pageable (Pageable)
     * @param filterKey (String)
     * @param lowerAgeGroup (Integer)
     * @param upperAgeGroup (Integer)
     * @param lowerDateStr (String)
     * @param upperDateStr (Date)
     * @param lowerRating (Integer)
     * @param upperRating (Integer)
     * @return list of journal posts
     */
    @GetMapping("/filterBy")
    public List<JournalDisplayDto> getJournalsFilterBy(
            Pageable pageable,
            @RequestParam("filterKey") String filterKey,
            @RequestParam(value = "lowerAgeGroup", required = false) Integer lowerAgeGroup,
            @RequestParam(value = "upperAgeGroup", required = false) Integer upperAgeGroup,
            @RequestParam(value = "lowerDate", required = false) String lowerDateStr,
            @RequestParam(value = "upperDate", required = false) String upperDateStr,
            @RequestParam(value = "lowerRating", required = false) Integer lowerRating,
            @RequestParam(value = "upperRating", required = false) Integer upperRating) {

        /* Validation */
        JournalSearchValidator.validateJournalFilterKey(filterKey);

        /* Logic */
        Integer userId = userService.getUserIdFromAuth();
        // Filter By Age Group
        if (filterKey.equals("ageGroup")) {
            if (lowerAgeGroup == null) { lowerAgeGroup = 0; }
            if (upperAgeGroup == null) { upperAgeGroup = 9; }
            JournalSearchValidator.validateAgeGroup(lowerAgeGroup, upperAgeGroup);

            // For Anonymous Users
            if (userId == null) { return journalSearchService.getJournalsFilterByAgeGroup(pageable, lowerAgeGroup, upperAgeGroup); }
            // For Logged In Users
            else { return journalSearchService.getJournalsFilterByAgeGroupWithUserId(pageable, lowerAgeGroup, upperAgeGroup, userId); }
        }

        // Filter By Date
        else if (filterKey.equals("date")) {
            if (lowerDateStr == null) { lowerDateStr = "1970-01-01"; }
            if (upperDateStr == null) { upperDateStr = "2038-01-01"; }
            JournalSearchValidator.validateDateStrFormat(lowerDateStr, upperDateStr);
            lowerDateStr += " 00:00:00";
            upperDateStr += " 23:59:59";

            // For Anonymous Users
            if (userId == null) { return journalSearchService.getJournalsFilterByDate(pageable, lowerDateStr, upperDateStr); }
            // For Logged In Users
            else { return journalSearchService.getJournalsFilterByDateWithUserId(pageable, lowerDateStr, upperDateStr, userId); }
        }

        // Filter By Rating
        else {
            if (lowerRating == null) { lowerRating = 0; }
            if (upperRating == null) { upperRating = 2147483647; }
            JournalSearchValidator.validateRating(lowerRating, upperRating);

            // For Anonymous Users
            if (userId == null) { return journalSearchService.getJournalsFilterByRating(pageable, lowerRating, upperRating); }
            // For Logged In Users
            else { return journalSearchService.getJournalsFilterByRatingWithUserId(pageable, lowerRating, upperRating, userId); }
        }
    }
}
