package jp.co.rakuten.ehnback.service;


import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_ALREADYLIKEDJOURNAL;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_JOURNALBYUSER;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_JOURNALDELETED;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_JOURNALID;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_NOTLIKEDJOURNAL;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_REPORTEXISTS;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_USERID;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.transaction.Transactional;

import com.zaxxer.hikari.util.SuspendResumeLock;
import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.entity.JournalComment;
import jp.co.rakuten.ehnback.entity.JournalPost;
import jp.co.rakuten.ehnback.entity.JournalRating;
import jp.co.rakuten.ehnback.entity.JournalReport;
import jp.co.rakuten.ehnback.entity.User;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import jp.co.rakuten.ehnback.repository.JournalCommentRepository;
import jp.co.rakuten.ehnback.repository.JournalPostRepository;
import jp.co.rakuten.ehnback.repository.JournalRatingRepository;
import jp.co.rakuten.ehnback.repository.JournalReportRepository;
import jp.co.rakuten.ehnback.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Transactional
public class JournalPostService {
	@Autowired
	private JournalPostRepository journalPostRepository;
	@Autowired
	private JournalCommentRepository journalCommentRepository;
	@Autowired
	private JournalReportRepository journalReportRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JournalRatingRepository journalRatingRepository;

	/**
	 * Returns all existing JournalPost objects in the database in a user specified order
	 *
	 * @param String sortKey
	 * @param Integer userId
	 * @return List<JournalDisplayDto>
	 */
	public List<JournalDisplayDto> getJournalPosts(String sortKey, Integer userId) {
		//Logic
		List<JournalPost> journalPostList;
		if(sortKey.equals("popular")){
			journalPostList = journalPostRepository.findAll(Sort.by(Sort.Direction.DESC, "likeCount"));
		}
		else if(sortKey.equals("oldest")) {
			journalPostList = journalPostRepository.findAll(Sort.by(Sort.Direction.ASC, "createdAt"));
		}
		else {
			journalPostList = journalPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
		}
		//if the user is logged in
		if(userId != null) {
			//check if the user exists
			checkUserExists(userId);
			//Logic
			List<JournalDisplayDto> journalLikesList = getJournalLikes(userId);
			return journalPostList.stream().filter(JournalPost::getActiveFlag).map(j -> new JournalDisplayDto(j.getCreateUserId(), userRepository.getById(j.getCreateUserId()).getUsername(), j.getId(),
					j.getTitle(), j.getContent(), j.getCreatedAt(), j.getUpdatedAt(), j.getLikeCount(), userRepository.getById(j.getCreateUserId()).getAgeGroup(),
					userRepository.getById(j.getCreateUserId()).getVaccinationStatus(), journalLikesList.stream().anyMatch(likedObj -> likedObj.getJournalId().equals(j.getId())) ? 1 : 0)).collect(Collectors.toList());
		}
		//if the user is not logged in
		else {
			return journalPostList.stream().filter(JournalPost::getActiveFlag).map(j -> new JournalDisplayDto(j.getCreateUserId(), userRepository.getById(j.getCreateUserId()).getUsername(), j.getId(),
					j.getTitle(), j.getContent(), j.getCreatedAt(), j.getUpdatedAt(), j.getLikeCount(), userRepository.getById(j.getCreateUserId()).getAgeGroup(),
					userRepository.getById(j.getCreateUserId()).getVaccinationStatus(), 0)).collect(Collectors.toList());
		}
	}

	/**
	 * Returns all active existing JournalPost objects in the database for a specific user
	 *
	 * @param Integer userId
	 * @return List<JournalDisplayDto>
	 */
	public List<JournalDisplayDto> getJournalPostsUser(Integer userId) {
		//Validation
		checkUserExists(userId);

		//Logic
		List<JournalDisplayDto> journalLikesList = getJournalLikes(userId);
		Optional<List<JournalPost>> journalPostListOptional = journalPostRepository.findAllByCreateUserId(userId);
		return journalPostListOptional.get().stream().filter(JournalPost::getActiveFlag).map(j -> new JournalDisplayDto(j.getCreateUserId(), userRepository.getById(j.getCreateUserId()).getUsername(), j.getId(), j.getTitle(),
				j.getContent(), j.getCreatedAt(), j.getUpdatedAt(), j.getLikeCount(), userRepository.getById(j.getCreateUserId()).getAgeGroup(),
				userRepository.getById(j.getCreateUserId()).getVaccinationStatus(), journalLikesList.stream().anyMatch(likedObj -> likedObj.getJournalId().equals(j.getId())) ? 1 : 0))
				.sorted(Comparator.comparing(JournalDisplayDto::getCreatedAt).reversed()).collect(Collectors.toList());
	}
	/**
	 * Returns a single specified journal post
	 *
	 * @param Integer journalId
	 * @param Integer userId
	 * @return JournalDisplayDto
	 */
	public JournalDisplayDto getSingleJournal(Integer journalId, Integer userId) {
		//Validation
		checkJournalExists(journalId);

		//Logic
		JournalPost journalPost = journalPostRepository.getById(journalId);

		//If the user is logged in check if the post is liked
		if(userId != null){
			checkUserExists(userId);
			Optional<JournalRating> likedPost = journalRatingRepository.findByPostIdAndUserId(journalId, userId);
			return new JournalDisplayDto(journalPost.getCreateUserId(), userRepository.getById(journalPost.getCreateUserId()).getUsername(), journalPost.getId(),
					journalPost.getTitle(), journalPost.getContent(), journalPost.getCreatedAt(), journalPost.getUpdatedAt(), journalPost.getLikeCount(),
					userRepository.getById(journalPost.getCreateUserId()).getAgeGroup(), userRepository.getById(journalPost.getCreateUserId()).getVaccinationStatus(),
					likedPost.isPresent() ? 1 : 0);
		}
		else {
			return new JournalDisplayDto(journalPost.getCreateUserId(), userRepository.getById(journalPost.getCreateUserId()).getUsername(), journalPost.getId(),
					journalPost.getTitle(), journalPost.getContent(), journalPost.getCreatedAt(), journalPost.getUpdatedAt(), journalPost.getLikeCount(),
					userRepository.getById(journalPost.getCreateUserId()).getAgeGroup(), userRepository.getById(journalPost.getCreateUserId()).getVaccinationStatus(), 0);
		}
	}

	/**
	 * Saves a user Journal Post to the database
	 *
	 * @param JournalCreateDTO
	 * @return SuccessEntity
	 */
	public SuccessEntity saveJournalPost(JournalCreateDTO journalCreateDTO){
		//Validation
		checkUserExists(journalCreateDTO.getUserId());

		//Logic
		Date date = new Date();
		JournalPost journalPost = new JournalPost();
		journalPost.setCreateUserId(journalCreateDTO.getUserId());
		journalPost.setTitle(journalCreateDTO.getTitle());
		journalPost.setContent(journalCreateDTO.getContent());
		journalPost.setLikeCount(0);
		journalPost.setCreatedAt(date);
		journalPost.setActiveFlag(true);

		journalPostRepository.save(journalPost);

		//Check to see if operation was successful
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);

		return successEntity;
	}

	/**
	 * Updates a pre-existing user Journal Post
	 *
	 * @param JournalUpdateDTO
	 * @return SuccessEntity
	 */
	public SuccessEntity patchJournalPost(JournalUpdateDTO journalUpdateDTO) {
		//Validation
		checkUserExists(journalUpdateDTO.getUserId());
		checkJournalExists(journalUpdateDTO.getJournalId());
		checkJournalByUserExists(journalUpdateDTO.getUserId(), journalUpdateDTO.getJournalId());

		//Logic
		Date date = new Date();
		JournalPost journalPost = journalPostRepository.getById(journalUpdateDTO.getJournalId());
		journalPost.setCreateUserId(journalUpdateDTO.getUserId());
		journalPost.setId(journalUpdateDTO.getJournalId());
		journalPost.setTitle(journalUpdateDTO.getTitle());
		journalPost.setContent(journalUpdateDTO.getContent());
		journalPost.setUpdatedAt(date);
		journalPost.setActiveFlag(true);
		journalPostRepository.save(journalPost);

		//Check to see if operation was successful
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(journalPostRepository.getById(journalUpdateDTO.getJournalId()).getUpdatedAt().equals(date));

		return successEntity;
	}

	/**
	 * Deletes a specified user Journal Post that exists in the database
	 *
	 * @param Integer journalId
	 * @return SuccessEntity
	 */
	public SuccessEntity deleteJournalPost(Integer journalId)
	{
		//Validation
		checkJournalExists(journalId);
		checkAlreadyJournalDeleted(journalId);

		//Logic
		JournalPost journalPost = journalPostRepository.getById(journalId);
		journalPost.setActiveFlag(false);
		journalPostRepository.save(journalPost);

		//Check to see if operation was successful
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(!journalPostRepository.getById(journalId).getActiveFlag());
		return successEntity;

	}

	/**
	 * Returns all comments for a specific journal post
	 *
	 * @param Integer journalId
	 * @return List<JournalCommentDisplayDTO>
	 */
	public List<JournalCommentDisplayDTO> getJournalComments(Integer journalId) {
		//Validation
		checkJournalExists(journalId);

		//Logic
		Optional<List<JournalComment>> journalCommentListOptional = journalCommentRepository.findAllByPostId(journalId);
		List<JournalComment> journalCommentList = journalCommentListOptional.get();

		return journalCommentList.stream().map(commentObj -> new JournalCommentDisplayDTO(userRepository.getById(commentObj.getUserId()).getUsername(), commentObj.getUserId(), commentObj.getPostId(), commentObj.getCommentContent(), commentObj.getCreatedAt())).sorted(Comparator.comparing(JournalCommentDisplayDTO::getCreatedAt).reversed()).collect(Collectors.toList());
	}

	/**
	 * Saves a user's comment on a pre-existing Journal to the database
	 *
	 * @param JournalCommentDTO
	 * @return SuccessEntity
	 */
	public SuccessEntity saveJournalComment(JournalCommentDTO journalCommentDTO){
		//Validation
		checkUserExists(journalCommentDTO.getUserId());
		checkJournalExists(journalCommentDTO.getJournalId());

		//Logic
		Date date = new Date();
		JournalComment journalComment = new JournalComment();
		journalComment.setUserId(journalCommentDTO.getUserId());
		journalComment.setPostId(journalCommentDTO.getJournalId());
		journalComment.setCommentContent(journalCommentDTO.getComment());
		journalComment.setCreatedAt(date);
		journalComment.setActiveFlag(true);
		journalCommentRepository.save(journalComment);

		//Check to see if operation was successful
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);

		return successEntity;
	}

	/**
	 * Gets a list of Journals that the user has liked.
	 *
	 * @param Integer userId
	 * @return List</JournalDisplayDTO>
	 */
	public List<JournalDisplayDto> getJournalLikes(Integer userId){
		//Validation
		checkUserExists(userId);

		//Logic
		//Get all user rating objects
		Optional<List<JournalRating>> journalRatingOptional = journalRatingRepository.findAllByUserId(userId);
		if(journalRatingOptional.isEmpty()){
			return new ArrayList<>();
		}
		List<JournalRating> journalRating = journalRatingOptional.get();
		//Get all user liked journals by matching the journal id with the journal id in the rating objects.
		List<JournalPost> journalPostList = new ArrayList<>();
		journalRating.stream().forEach(rating -> journalPostList.add(journalPostRepository.findById(rating.getPostId()).get()));
		return journalPostList.stream().map(j -> new JournalDisplayDto(j.getCreateUserId(), userRepository.getById(j.getCreateUserId()).getUsername(), j.getId(),
				j.getTitle(), j.getContent(), j.getCreatedAt(), j.getUpdatedAt(), j.getLikeCount(), userRepository.getById(j.getCreateUserId()).getAgeGroup(),
				userRepository.getById(j.getCreateUserId()).getVaccinationStatus(), 1)).sorted(Comparator.comparing(JournalDisplayDto::getCreatedAt).reversed()).collect(Collectors.toList());
	}

	/**
	 * Adds a like to a user specified Journal
	 *
	 * @param JournalLikeDTO
	 * @return SuccessEntity
	 */
	public SuccessEntity saveJournalLike(JournalLikeDTO journalLikeDTO){
		//Validation
		checkUserExists(journalLikeDTO.getUserId());
		checkJournalExists(journalLikeDTO.getJournalId());
		checkAlreadyLikedJournal(journalLikeDTO.getUserId(), journalLikeDTO.getJournalId());

		//update database table "post_rating"
		Date date = new Date();
		JournalRating journalRating = new JournalRating();
		journalRating.setRating(1);
		journalRating.setCreatedAt(date);
		journalRating.setPostId(journalLikeDTO.getJournalId());
		journalRating.setUserId(journalLikeDTO.getUserId());
		journalRatingRepository.save(journalRating);

		//update liked post
		JournalPost journalPost = journalPostRepository.getById(journalLikeDTO.getJournalId());
		journalPost.setLikeCount(journalPost.getLikeCount()+1);
		journalPostRepository.save(journalPost);

		//Check to see if operation was successful
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(journalRatingRepository.findByPostIdAndUserId(journalLikeDTO.getJournalId(), journalLikeDTO.getUserId()).isPresent());
		return successEntity;
	}

	/**
	 * Removes a like to a user specified Journal
	 *
	 * @param JournalLikeDTO
	 * @return SuccessEntity
	 */
	public SuccessEntity saveJournalUnlike(JournalLikeDTO journalLikeDTO){
		//Validation
		checkUserExists(journalLikeDTO.getUserId());
		checkJournalExists(journalLikeDTO.getJournalId());
		checkNotLikedJournal(journalLikeDTO.getUserId(), journalLikeDTO.getJournalId());

		//Logic
		//update database table "post_rating"
		Optional<JournalRating> journalRatingOptional = journalRatingRepository.findByPostIdAndUserId(journalLikeDTO.getJournalId(), journalLikeDTO.getUserId());
		JournalRating journalRating = journalRatingOptional.get();
		journalRatingRepository.deleteById(journalRating.getId());

		//update post to remove like
		JournalPost journalPost = journalPostRepository.getById(journalLikeDTO.getJournalId());
		journalPost.setLikeCount(journalPost.getLikeCount()-1);
		journalPostRepository.save(journalPost);
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);
		return successEntity;
	}

	/**
	 * Saves a user Journal Report about a pre-existing Journal to the database
	 *
	 * @param JournalReportDTO
	 * @return SuccessEntity
	 */
	public SuccessEntity saveJournalReport(JournalReportDTO journalReportDTO){
		//Validation
		checkUserExists(journalReportDTO.getUserId());
		checkJournalExists(journalReportDTO.getJournalId());
		checkActiveReport(journalReportDTO.getUserId(), journalReportDTO.getJournalId());

		//Logic
		Date date = new Date();
		JournalReport journalReport = new JournalReport();
		journalReport.setUserId(journalReportDTO.getUserId());
		journalReport.setPostId(journalReportDTO.getJournalId());
		journalReport.setMessage(journalReportDTO.getMessage());
		journalReport.setCreatedAt(date);
		journalReport.setActiveFlag(true);
		journalReportRepository.save(journalReport);

		//Checks to see if the operation was successful
		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);
		return successEntity;
	}

	/**
	 * Get all hided journals
	 *
	 * @return List<HidedJournalDisplayDto>
	 */
	public List<HidedJournalDisplayDto> hidedJournals(){
		return journalPostRepository.findAllHidedJournal();
	}

	/**
	 * Get hided journal detail
	 *
	 * @param journalId
	 * @return HidedJournalDisplayDto
	 */
	public HidedJournalDisplayDto hidedJournal(Integer journalId){
		return journalPostRepository.findHidedJournal(journalId);
	}

	/**
	 * Unhide journal
	 *
	 * @param journalId
	 * @return SuccessEntity
	 */
	public SuccessEntity unhideJournal(Integer journalId){
		Optional<JournalPost> journalPostOpt = journalPostRepository.findById(journalId);
		if(journalPostOpt.isPresent()){
			JournalPost journalPost = journalPostOpt.get();
			journalPost.setActiveFlag(true);
			journalPostRepository.save(journalPost);
		}else{
			throw new InvalidRequestException(INVALID_JOURNALID);
		}

		SuccessEntity successEntity = new SuccessEntity();
		successEntity.setSuccess(true);

		return successEntity;
	}

	/**
	 * Checks to see if the User ID exists
	 *
	 * @param Integer
	 * @return void
	 */
	private void checkUserExists(Integer userId)
	{
		Optional<User> user = userRepository.findById(userId);
		if(user.isEmpty()){
			throw new InvalidRequestException(INVALID_USERID);
		}
	}

	/**
	 * Checks to see if the Journal ID exists
	 *
	 * @param Integer
	 * @return void
	 */
	private void checkJournalExists(Integer journalId)
	{
		Optional<JournalPost> journalPost = journalPostRepository.findById(journalId);
		if(journalPost.isEmpty()){
			throw new InvalidRequestException(INVALID_JOURNALID);
		}
	}

	/**
	 * Checks to see if the Journal has already been deleted
	 *
	 * @param Integer
	 * @return void
	 */
	private void checkAlreadyJournalDeleted(Integer journalId)
	{
		JournalPost journalPost = journalPostRepository.getById(journalId);
		if(Boolean.FALSE.equals( journalPost.getActiveFlag())){
			throw new InvalidRequestException(INVALID_JOURNALDELETED);
		}
	}

	/**
	 * Checks to see if the specified Journal is associated with the user.
	 *
	 * @param Integer userId
	 * @param Integer journalId
	 * @return void
	 */
	private void checkJournalByUserExists(Integer userId, Integer journalId)
	{
		Optional<JournalPost> journalPost = journalPostRepository.findByIdAndCreateUserId(journalId, userId);
		if(journalPost.isEmpty()){
			throw new InvalidRequestException(INVALID_JOURNALBYUSER);
		}
	}

	/**
	 * Checks to see if the specified Journal has already been liked by a specific user.
	 *
	 * @param Integer, Integer
	 * @return void
	 */
	private void checkAlreadyLikedJournal(Integer userId, Integer journalId)
	{
		if(journalRatingRepository.findByPostIdAndUserId(journalId,userId).isPresent()){
			throw new InvalidRequestException(INVALID_ALREADYLIKEDJOURNAL);
		}
	}

	/**
	 * Checks to see if the specified Journal has not liked by a specific user.
	 *
	 * @param Integer, Integer
	 * @return void
	 */
	private void checkNotLikedJournal(Integer userId, Integer journalId)
	{
		if(journalRatingRepository.findByPostIdAndUserId(journalId,userId).isEmpty()){
			throw new InvalidRequestException(INVALID_NOTLIKEDJOURNAL);
		}
	}
	/**
	 * Checks to see if the user has a currently active report for the same journal.
	 *
	 * @param Integer userId
	 * @param Integer journalId
	 * @return void
	 */
	private void checkActiveReport(Integer userId, Integer journalId)
	{
		Optional<List<JournalReport>> journalReportsOptional = journalReportRepository.findAllByUserIdAndPostId(userId, journalId);
		if(journalReportsOptional.isPresent()){
			if(journalReportsOptional.get().stream().anyMatch(journalReport -> journalReport.getActiveFlag())){
				throw new InvalidRequestException(INVALID_REPORTEXISTS);
			}
		}
	}

}
