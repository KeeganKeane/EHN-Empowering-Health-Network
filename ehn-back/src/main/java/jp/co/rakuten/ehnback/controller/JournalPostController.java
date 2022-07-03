package jp.co.rakuten.ehnback.controller;

import java.util.List;
import jp.co.rakuten.ehnback.dto.JournalCommentDTO;
import jp.co.rakuten.ehnback.dto.JournalCommentDisplayDTO;
import jp.co.rakuten.ehnback.dto.JournalCreateDTO;
import jp.co.rakuten.ehnback.dto.JournalDisplayDto;
import jp.co.rakuten.ehnback.dto.JournalLikeDTO;
import jp.co.rakuten.ehnback.dto.JournalReportDTO;
import jp.co.rakuten.ehnback.dto.JournalUpdateDTO;
import jp.co.rakuten.ehnback.dto.SuccessEntity;
import jp.co.rakuten.ehnback.service.JournalPostService;
import jp.co.rakuten.ehnback.service.UserService;
import jp.co.rakuten.ehnback.validator.JournalPostValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JournalPostController {

	@Autowired
	JournalPostService journalPostService;
	@Autowired
	UserService userService;

	/**
	 * End point to get a list of all journal posts. Carries out sort functionality
	 *
	 * @param String sortKey
	 * @return list of JournalPosts
	 */
	@GetMapping(value = "/journal/sort", produces = "application/json")
	public List<JournalDisplayDto> getJournalList(@RequestParam(required = false) String sortKey) {
		JournalPostValidator.validateSortKey(sortKey);
		Integer userId = userService.getUserIdFromAuth();
		return journalPostService.getJournalPosts(sortKey, userId);
	}

	/**
	 * End point to get a list of all journal posts for a specific user
	 *
	 * @param Integer userId
	 * @return list of JournalPosts
	 */
	@GetMapping(value = "/journal/user/{userId}", produces = "application/json")
	public List<JournalDisplayDto> getJournalListUser(@PathVariable Integer userId) {
		JournalPostValidator.validateIdFormat(userId);
		return journalPostService.getJournalPostsUser(userId);
	}

	/**
	 * End point to get a single user specified Journal post
	 *
	 * @param Integer journalId
	 * @return JournalDisplayDto
	 */
	@GetMapping(value = "/journal/post", produces = "application/json")
	public JournalDisplayDto getSingleJournal(@RequestParam Integer journalId) {
		JournalPostValidator.validateIdFormat(journalId);
		Integer userId = userService.getUserIdFromAuth();
		return journalPostService.getSingleJournal(journalId, userId);
	}


	/**
	 * Post a users journal entry
	 *
	 * @param JournalCreateDTO
	 * @return Success entity
	 */
	@PostMapping(value = "/journal", produces = "application/json")
	public SuccessEntity saveJournalPost(@RequestBody JournalCreateDTO journalCreateDTO) {
		JournalPostValidator.validateJournalPost(journalCreateDTO);
		return journalPostService.saveJournalPost(journalCreateDTO);
	}

	/**
	 * Updates a pre-existing user journal entry
	 *
	 * @param JournalUpdateDTO
	 * @return Success entity
	 */
	@PatchMapping(value = "/journal", produces = "application/json")
	public SuccessEntity patchJournalPost(@RequestBody JournalUpdateDTO journalUpdateDTO) {
		JournalPostValidator.validateJournalUpdate(journalUpdateDTO);
		return journalPostService.patchJournalPost(journalUpdateDTO);
	}

	/**
	 * Deletes a pre-existing user journal
	 *
	 * @param Integer journalId
	 * @return Success entity
	 */
	@DeleteMapping(value = "/journal/{journalId}", produces = "application/json")
	public SuccessEntity deleteJournalPost(@PathVariable Integer journalId) {
		JournalPostValidator.validateIdFormat(journalId);
		return journalPostService.deleteJournalPost(journalId);
	}

	/**
	 * Gets a list of comments for a specific journal
	 *
	 * @param Integer postId
	 * @return Success entity
	 */
	@GetMapping(value = "/journal/comment/{postId}", produces = "application/json")
	public List<JournalCommentDisplayDTO> getAllJournalComments(@PathVariable Integer postId) {
		JournalPostValidator.validateIdFormat(postId);
		return journalPostService.getJournalComments(postId);
	}

	/**
	 * Posts a user comment on a Journal
	 *
	 * @param JournalCommentDTO
	 * @return Success entity
	 */
	@PostMapping(value = "/journal/comment", produces = "application/json")
	public SuccessEntity saveJournalPost(@RequestBody JournalCommentDTO journalCommentDTO) {
		JournalPostValidator.validateIdFormat(journalCommentDTO.getUserId());
		JournalPostValidator.validateIdFormat(journalCommentDTO.getJournalId());
		JournalPostValidator.validateJournalComment(journalCommentDTO.getComment());

		return journalPostService.saveJournalComment(journalCommentDTO);
	}

	/**
	 * Retrieve a list of user liked posts
	 *
	 * @param Integer userId
	 * @return Success entity
	 */
	@GetMapping(value = "/journal/like", produces = "application/json")
	public List<JournalDisplayDto> saveJournalLike() {
//		JournalPostValidator.validateIdFormat(userId);
		Integer userId = userService.getUserIdFromAuth();
		return journalPostService.getJournalLikes(userId);
	}

	/**
	 * Likes a journal post
	 *
	 * @param JournalLikeDTO
	 * @return Success entity
	 */
	@PostMapping(value = "/journal/like", produces = "application/json")
	public SuccessEntity saveJournalLike(@RequestBody JournalLikeDTO journalLikeDTO) {
		JournalPostValidator.validateIdFormat(journalLikeDTO.getJournalId());
		Integer userId = userService.getUserIdFromAuth();
		journalLikeDTO.setUserId(userId);
		return journalPostService.saveJournalLike(journalLikeDTO);
	}

	/**
	 * Removes a user's like from a journal post
	 *
	 * @param JournalLikeDTO
	 * @return Success entity
	 */
	@PostMapping(value = "/journal/removeLike", produces = "application/json")
	public SuccessEntity saveJournalUnlike(@RequestBody JournalLikeDTO journalLikeDTO) {
		JournalPostValidator.validateIdFormat(journalLikeDTO.getJournalId());
		Integer userId = userService.getUserIdFromAuth();
		journalLikeDTO.setUserId(userId);
		return journalPostService.saveJournalUnlike(journalLikeDTO);
	}

	/**
	 * Reports a user post
	 *
	 * @param JournalReportDTO
	 * @return Success entity
	 */
	@PostMapping(value = "/journal/report", produces = "application/json")
	public SuccessEntity saveJournalReport(@RequestBody JournalReportDTO journalReportDTO) {
		JournalPostValidator.validateIdFormat(journalReportDTO.getUserId());
		JournalPostValidator.validateIdFormat(journalReportDTO.getJournalId());
		JournalPostValidator.validateReportContents(journalReportDTO.getMessage());
		return journalPostService.saveJournalReport(journalReportDTO);
	}



}
