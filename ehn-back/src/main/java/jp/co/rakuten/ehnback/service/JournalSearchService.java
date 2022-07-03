package jp.co.rakuten.ehnback.service;

import jp.co.rakuten.ehnback.dto.JournalDisplayDto;
import jp.co.rakuten.ehnback.entity.JournalPost;
import jp.co.rakuten.ehnback.entity.JournalRating;
import jp.co.rakuten.ehnback.entity.User;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import jp.co.rakuten.ehnback.repository.JournalRatingRepository;
import jp.co.rakuten.ehnback.repository.JournalSearchRepository;
import jp.co.rakuten.ehnback.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_USERID;

@Service
@AllArgsConstructor
@Slf4j
public class JournalSearchService {

    @Autowired
    private JournalSearchRepository journalSearchRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JournalRatingRepository journalRatingRepository;


    /**
     * FOR ANONYMOUS USERS
     * Method to get list of journal posts matched with keyword
     *
     * @param pageable (Pageable)
     * @param keyword (String)
     * @param sortKey (String)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsByKeyword(Pageable pageable, String keyword, String sortKey) {

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        List<JournalPost> journalPostList;
        if (sortKey.equals("popular")) {
            journalPostList = journalSearchRepository.findAllByKeywordOrderByPopularity(pageable.getOffset(), pageable.getPageSize(), keyword, sortKey);
        } else if (sortKey.equals("oldest")) {
            journalPostList = journalSearchRepository.findAllByKeywordOrderByOldest(pageable.getOffset(), pageable.getPageSize(), keyword, sortKey);
        } else {
            journalPostList = journalSearchRepository.findAllByKeywordOrderByLatest(pageable.getOffset(), pageable.getPageSize(), keyword, sortKey);
        }
        if (!journalPostList.isEmpty()) {
            for (JournalPost journalPost : journalPostList) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    journalDisplayDtoList.add(getJournalDisplayDto(journalPost, user));
                }
            }
        }
        return journalDisplayDtoList;
    }

    /**
     * FOR LOGGED IN USERS
     * Method to get list of journal posts matched with keyword
     *
     * @param pageable (Pageable)
     * @param keyword (String)
     * @param userId (Integer)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsByKeywordWithUserId(Pageable pageable, String keyword, String sortKey, Integer userId) {

        /* Check whether the userId exists in database */
        checkUserExistence(userId);

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        Optional<List<JournalRating>> journalRatingListOpt = journalRatingRepository.findAllByUserId(userId);
        if (journalRatingListOpt.isEmpty()) {
            /* For users who have NOT yet rated any journal posts */
            return getJournalsByKeyword(pageable, keyword, sortKey);
        }

        /* For users who have rated journal posts */
        List<JournalRating> journalRatingList = journalRatingListOpt.get();
        List<Integer> likedPostIdList = getLikedPostIdList(journalRatingList);

        List<JournalPost> journalPostList;
        if (sortKey.equals("popular")) {
            journalPostList = journalSearchRepository.findAllByKeywordOrderByPopularity(pageable.getOffset(), pageable.getPageSize(), keyword, sortKey);
        } else if (sortKey.equals("oldest")) {
            journalPostList = journalSearchRepository.findAllByKeywordOrderByOldest(pageable.getOffset(), pageable.getPageSize(), keyword, sortKey);
        } else {
            journalPostList = journalSearchRepository.findAllByKeywordOrderByLatest(pageable.getOffset(), pageable.getPageSize(), keyword, sortKey);
        }
        if (!journalPostList.isEmpty()) {
            for (JournalPost journalPost : journalPostList) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    JournalDisplayDto journalDisplayDto = getJournalDisplayDto(journalPost, user);

                    /* Update likedStatus if the postId is contained in likedPostIdList */
                    Integer postId = journalPost.getId();
                    if (likedPostIdList.contains(postId)) {
                        journalDisplayDto.setLikedStatus(1);
                    }

                    journalDisplayDtoList.add(journalDisplayDto);
                }
            }
        }
        return journalDisplayDtoList;
    }


    /**
     * FOR ANONYMOUS USERS
     * Method to get list of journal posts filter by age group
     *
     * @param pageable (Pageable)
     * @param lowerAgeGroup (Integer)
     * @param upperAgeGroup (Integer)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsFilterByAgeGroup(
            Pageable pageable,
            Integer lowerAgeGroup,
            Integer upperAgeGroup) {

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        List<JournalPost> journalPostList = journalSearchRepository.findAllByAgeGroup(pageable.getOffset(), pageable.getPageSize(), lowerAgeGroup, upperAgeGroup);
        if (!journalPostList.isEmpty()) {
            for (JournalPost journalPost : journalPostList) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    journalDisplayDtoList.add(getJournalDisplayDto(journalPost, user));
                }
            }
        }
        return journalDisplayDtoList;
    }

    /**
     * FOR LOGGED IN USERS
     * Method to get list of journal posts filter by age group
     *
     * @param pageable (Pageable)
     * @param lowerAgeGroup (Integer)
     * @param upperAgeGroup (Integer)
     * @param userId (Integer)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsFilterByAgeGroupWithUserId(
            Pageable pageable,
            Integer lowerAgeGroup,
            Integer upperAgeGroup,
            Integer userId) {

        /* Check whether the userId exists in database */
        checkUserExistence(userId);

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        Optional<List<JournalRating>> journalRatingListOpt = journalRatingRepository.findAllByUserId(userId);
        if (journalRatingListOpt.isEmpty()) {
            /* For users who have NOT yet rated any journal posts */
            return getJournalsFilterByAgeGroup(pageable, lowerAgeGroup, upperAgeGroup);
        }

        /* For users who have rated journal posts */
        List<JournalRating> journalRatingList = journalRatingListOpt.get();
        List<Integer> likedPostIdList = getLikedPostIdList(journalRatingList);

        List<JournalPost> journalPostPage = journalSearchRepository.findAllByAgeGroup(pageable.getOffset(), pageable.getPageSize(), lowerAgeGroup, upperAgeGroup);
        if (!journalPostPage.isEmpty()) {
            for (JournalPost journalPost : journalPostPage) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    JournalDisplayDto journalDisplayDto = getJournalDisplayDto(journalPost, user);

                    /* Update likedStatus if the postId is contained in likedPostIdList */
                    Integer postId = journalPost.getId();
                    if (likedPostIdList.contains(postId)) {
                        journalDisplayDto.setLikedStatus(1);
                    }

                    journalDisplayDtoList.add(journalDisplayDto);
                }
            }
        }
        return journalDisplayDtoList;
    }


    /**
     * FOR ANONYMOUS USERS
     * Method to get list of journal posts filter by date
     *
     * @param pageable (Pageable)
     * @param lowerDateStr (String)
     * @param upperDateStr (String)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsFilterByDate(
            Pageable pageable,
            String lowerDateStr,
            String upperDateStr) {

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        Date lowerDate = convertStrToDate(lowerDateStr);
        Date upperDate = convertStrToDate(upperDateStr);

        List<JournalPost> journalPostList = journalSearchRepository.findAllByDate(pageable.getOffset(), pageable.getPageSize(), lowerDate, upperDate);
        if (!journalPostList.isEmpty()) {
            for (JournalPost journalPost : journalPostList) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    journalDisplayDtoList.add(getJournalDisplayDto(journalPost, user));
                }
            }
        }
        return journalDisplayDtoList;
    }

    /**
     * FOR LOGGED IN USERS
     * Method to get list of journal posts filter by date
     *
     * @param pageable (Pageable)
     * @param lowerDateStr (String)
     * @param upperDateStr (String)
     * @param userId (Integer)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsFilterByDateWithUserId(
            Pageable pageable,
            String lowerDateStr,
            String upperDateStr,
            Integer userId) {

        /* Check whether the userId exists in database */
        checkUserExistence(userId);

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        Optional<List<JournalRating>> journalRatingListOpt = journalRatingRepository.findAllByUserId(userId);
        if (journalRatingListOpt.isEmpty()) {
            /* For users who have NOT yet rated any journal posts */
            return getJournalsFilterByDate(pageable, lowerDateStr, upperDateStr);
        }

        Date lowerDate = convertStrToDate(lowerDateStr);
        Date upperDate = convertStrToDate(upperDateStr);

        /* For users who have rated journal posts */
        List<JournalRating> journalRatingList = journalRatingListOpt.get();
        List<Integer> likedPostIdList = getLikedPostIdList(journalRatingList);

        List<JournalPost> journalPostPage = journalSearchRepository.findAllByDate(pageable.getOffset(), pageable.getPageSize(), lowerDate, upperDate);
        if (!journalPostPage.isEmpty()) {
            for (JournalPost journalPost : journalPostPage) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    JournalDisplayDto journalDisplayDto = getJournalDisplayDto(journalPost, user);

                    /* Update likedStatus if the postId is contained in likedPostIdList */
                    Integer postId = journalPost.getId();
                    if (likedPostIdList.contains(postId)) {
                        journalDisplayDto.setLikedStatus(1);
                    }

                    journalDisplayDtoList.add(journalDisplayDto);
                }
            }
        }
        return journalDisplayDtoList;
    }


    /**
     * FOR ANONYMOUS USERS
     * Method to get list of journal posts filter by rating
     *
     * @param pageable (Pageable)
     * @param lowerRating (Integer)
     * @param upperRating (Integer)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsFilterByRating(
            Pageable pageable,
            Integer lowerRating,
            Integer upperRating) {

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        List<JournalPost> journalPostList = journalSearchRepository.findAllByRating(pageable.getOffset(), pageable.getPageSize(), lowerRating, upperRating);
        if (!journalPostList.isEmpty()) {
            for (JournalPost journalPost : journalPostList) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    journalDisplayDtoList.add(getJournalDisplayDto(journalPost, user));
                }
            }
        }
        return journalDisplayDtoList;
    }

    /**
     * FOR LOGGED IN USERS
     * Method to get list of journal posts filter by rating
     *
     * @param pageable (Pageable)
     * @param lowerRating (Integer)
     * @param upperRating (Integer)
     * @param userId (Integer)
     * @return list of journal posts
     */
    public List<JournalDisplayDto> getJournalsFilterByRatingWithUserId(
            Pageable pageable,
            Integer lowerRating,
            Integer upperRating,
            Integer userId) {

        /* Check whether the userId exists in database */
        checkUserExistence(userId);

        List<JournalDisplayDto> journalDisplayDtoList = new ArrayList<>();

        Optional<List<JournalRating>> journalRatingListOpt = journalRatingRepository.findAllByUserId(userId);
        if (journalRatingListOpt.isEmpty()) {
            /* For users who have NOT yet rated any journal posts */
            return getJournalsFilterByRating(pageable, lowerRating, upperRating);
        }

        /* For users who have rated journal posts */
        List<JournalRating> journalRatingList = journalRatingListOpt.get();
        List<Integer> likedPostIdList = getLikedPostIdList(journalRatingList);

        List<JournalPost> journalPostPage = journalSearchRepository.findAllByRating(pageable.getOffset(), pageable.getPageSize(), lowerRating, upperRating);
        if (!journalPostPage.isEmpty()) {
            for (JournalPost journalPost : journalPostPage) {
                Integer createUserId = journalPost.getCreateUserId();
                Optional<User> userOpt = userRepository.findById(createUserId);
                if (userOpt.isPresent()) {
                    User user = userOpt.get();
                    JournalDisplayDto journalDisplayDto = getJournalDisplayDto(journalPost, user);

                    /* Update likedStatus if the postId is contained in likedPostIdList */
                    Integer postId = journalPost.getId();
                    if (likedPostIdList.contains(postId)) {
                        journalDisplayDto.setLikedStatus(1);
                    }

                    journalDisplayDtoList.add(journalDisplayDto);
                }
            }
        }
        return journalDisplayDtoList;
    }


    /**
     * Method to check the existence of user ID in database
     *
     * @param userId (Integer)
     */
    private void checkUserExistence(Integer userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) { throw new InvalidRequestException(INVALID_USERID); }
    }

    /**
     * Method to provide JournalDisplayDto from JournalPost and User entities
     * NOTE: Default value of likedStatus is 0 (i.e., NOT yet rated)
     *
     * @param journalPost (JournalPost entity)
     * @param user (User entity)
     * @return JournalDisplayDto
     */
    private JournalDisplayDto getJournalDisplayDto(JournalPost journalPost, User user) {
        return JournalDisplayDto.builder()
                .userId(journalPost.getCreateUserId())
                .username(user.getUsername())
                .journalId(journalPost.getId())
                .title(journalPost.getTitle())
                .content(journalPost.getContent())
                .createdAt(journalPost.getCreatedAt())
                .modifiedAt(journalPost.getUpdatedAt())
                .overallRating(journalPost.getLikeCount())
                .ageGroup(user.getAgeGroup())
                .vaccinationStatus(user.getVaccinationStatus())
                .likedStatus(0)
                .build();
    }

    /**
     * Method to provide list of post IDs rated by users
     *
     * @param journalRatingList (list of JournalRating entity)
     * @return list of post IDs rated by users
     */
    private List<Integer> getLikedPostIdList(List<JournalRating> journalRatingList) {
        List<Integer> likedPostIdList = new ArrayList<>();
        for (JournalRating journalRating : journalRatingList) {
            likedPostIdList.add(journalRating.getPostId());
        }
        return likedPostIdList;
    }

    /**
     * Method to convert String to Date
     *
     * @param dateStr (String)
     * @return Date type
     */
    private Date convertStrToDate(String dateStr) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;
        try {
            date = dateFormat.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }
}
