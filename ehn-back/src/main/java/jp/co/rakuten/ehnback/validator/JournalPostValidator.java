package jp.co.rakuten.ehnback.validator;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_COMMENTLENGTHCONTENTS;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_EMPTYCONTENTS;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_ID;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_LENGTHCONTENTS;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_REPORTLENGTHCONTENTS;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_SORTKEY;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_TITLE;
import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_TITLELENGTH;


import jp.co.rakuten.ehnback.dto.JournalCreateDTO;
import jp.co.rakuten.ehnback.dto.JournalUpdateDTO;
import jp.co.rakuten.ehnback.exception.ErrorMessage;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JournalPostValidator {
	/**
	 * Validator for the Journal GET call
	 *
	 * @param String
	 *
	 * @return void
	 */
	public static void validateSortKey(String sortKey) {
		if (!sortKey.isEmpty() && !sortKey.equals("newest") && !sortKey.equals("popular") && !sortKey.equals("oldest")) {
			throw new InvalidRequestException(INVALID_SORTKEY);
		}
	}

	/**
	 * Validator for the JournalCreateDTO
	 *
	 * @param JournalCreateDTO
	 *
	 * @return void
	 */
	public static void validateJournalPost(JournalCreateDTO journalCreateDTO) {
		validateIdFormat(journalCreateDTO.getUserId());
		validateTitle(journalCreateDTO.getTitle());
		validateContents(journalCreateDTO.getContent());
	}

	/**
	 * Validator for the JournalUpdateDTO
	 *
	 * @param JournalUpdateDTO
	 *
	 * @return void
	 */
	public static void validateJournalUpdate (JournalUpdateDTO journalUpdateDTO) {
		validateIdFormat(journalUpdateDTO.getUserId());
		validateIdFormat(journalUpdateDTO.getJournalId());
		validateTitle(journalUpdateDTO.getTitle());
		validateContents(journalUpdateDTO.getContent());
	}

	/**
	 * Validator for the Journal Comment Contents
	 *
	 * @param String
	 *
	 * @return void
	 */
	public static void validateJournalComment(String contents) {
		if (contents.length() > 1024) {
			throw new InvalidRequestException(INVALID_COMMENTLENGTHCONTENTS);
		}
		else if(contents.isBlank())
		{
			throw new InvalidRequestException(INVALID_EMPTYCONTENTS);
		}

	}

	/**
	 * Validator for the Journal Contents
	 *
	 * @param String
	 *
	 * @return void
	 */
	public static void validateContents(String contents) {
		if (contents.isBlank()) {
			throw new InvalidRequestException(INVALID_EMPTYCONTENTS);
		}
		else if(contents.length() > 4096)
		{
			throw new InvalidRequestException(INVALID_LENGTHCONTENTS);
		}
	}

	/**
	 * Validator for the Journal Report Contents
	 *
	 * @param String
	 *
	 * @return void
	 */
	public static void validateReportContents(String contents) {
		if (contents.isBlank()) {
			throw new InvalidRequestException(INVALID_EMPTYCONTENTS);
		}
		else if(contents.length() > 126)
		{
			throw new InvalidRequestException(INVALID_REPORTLENGTHCONTENTS);
		}
	}

	/**
	 * Validator for the Journal Title
	 *
	 * @param String
	 *
	 * @return void
	 */
	public static void validateTitle(String title) {
		if (title.isBlank()) {
			throw new InvalidRequestException(INVALID_TITLE);
		}
		else if(title.length() > 128)
		{
			throw new InvalidRequestException(INVALID_TITLELENGTH);
		}
	}

	/**
	 * Validator for the ID
	 *
	 * @param Integer
	 *
	 * @return void
	 */
	public static void validateIdFormat(Integer id) {
		if (id == 0 || id == null) {
			throw new InvalidRequestException(INVALID_ID);
		}
	}


}