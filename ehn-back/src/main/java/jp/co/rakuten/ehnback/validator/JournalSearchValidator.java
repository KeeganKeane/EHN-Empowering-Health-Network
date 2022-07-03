package jp.co.rakuten.ehnback.validator;

import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.*;


@Slf4j
public class JournalSearchValidator {

    /**
     * Validator for the Journal Search Keyword
     *
     * @param keyword (String)
     */
    public static void validateJournalSearchKeyword(String keyword) {
        int keywordLength = keyword.length();
        if (keywordLength < 1 || keywordLength > 128) {
            throw new InvalidRequestException(INVALID_KEYWORD);
        }
    }

    /**
     * Validator for the Journal Search FilterKey
     *
     * @param filterKey (String)
     */
    public static void validateJournalFilterKey(String filterKey) {
        if (!filterKey.equals("ageGroup") && !filterKey.equals("date") && !filterKey.equals("rating")) {
            throw new InvalidRequestException(INVALID_FILTERKEY);
        }
    }

    /**
     * Validator for Age Group
     *
     * @param lowerAgeGroup (Integer)
     * @param upperAgeGroup (Integer)
     */
    public static void validateAgeGroup(Integer lowerAgeGroup, Integer upperAgeGroup) {
        if ((lowerAgeGroup < 0) || (lowerAgeGroup > 9)) {
            throw new InvalidRequestException(INVALID_AGEGROUP);
        }
        if ((upperAgeGroup < 0) || (upperAgeGroup > 9)) {
            throw new InvalidRequestException(INVALID_AGEGROUP);
        }
        if (lowerAgeGroup > upperAgeGroup) {
            throw new InvalidRequestException(INVALID_LOWERUPPERAGEGROUP);
        }
    }

    /**
     * Validator for Date
     *
     * @param lowerDateStr (String)
     * @param upperDateStr (String)
     */
    public static void validateDateStrFormat(String lowerDateStr, String upperDateStr) {
        String patter = "yyyy-MM-dd";
        SimpleDateFormat dateFormat = new SimpleDateFormat(patter);
        // lowerDateStr
        boolean lowerRes = false;
        try {
            lowerRes = lowerDateStr.equals(dateFormat.format(dateFormat.parse(lowerDateStr)));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (!lowerRes) {
            throw new InvalidRequestException(INVALID_FILTER_DATEFORMAT);
        }
        // upperDateStr
        boolean upperRes = false;
        try {
            upperRes = upperDateStr.equals(dateFormat.format(dateFormat.parse(upperDateStr)));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (!upperRes) {
            throw new InvalidRequestException(INVALID_FILTER_DATEFORMAT);
        }
        // lowerDateStr < upperDateStr
        boolean compareRes = false;
        try {
            Date lowerDate = dateFormat.parse(lowerDateStr);
            Date upperDate = dateFormat.parse(upperDateStr);
            compareRes = lowerDate.before(upperDate) || lowerDate.equals(upperDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (!compareRes) {
            throw new InvalidRequestException(INVALID_FILTER_LOWERUPPERDATE);
        }
    }

    /**
     * Validator for Rating
     *
     * @param lowerRating (Integer)
     * @param upperRating (Integer)
     */
    public static void validateRating(Integer lowerRating, Integer upperRating) {
        if (lowerRating < 0) {
            throw new InvalidRequestException(INVALID_FILTER_RATING);
        }
        if (upperRating < 0) {
            throw new InvalidRequestException(INVALID_FILTER_RATING);
        }
        if (lowerRating > upperRating) {
            throw new InvalidRequestException(INVALID_FILTER_LOWERUPPERRATING);
        }
    }
}
