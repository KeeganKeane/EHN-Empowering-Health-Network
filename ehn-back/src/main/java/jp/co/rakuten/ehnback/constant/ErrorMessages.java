/**
 * Collection of Error Messages for Invalid Requests
 *
 * @author keegan.keane
 */
package jp.co.rakuten.ehnback.constant;

public final class ErrorMessages {
	public static final String INVALID_SORTKEY = "Invalid SortKey: Sortkey must be a String of newest, popular, oldest or an empty String.";
	public static final String 	INVALID_ID = "Invalid ID: ID has an invalid format.";
	public static final String 	INVALID_TITLE = "Invalid Title: Journal title cannot be empty.";
	public static final String 	INVALID_EMPTYCONTENTS = "Invalid Contents: Content cannot be empty.";
	public static final String 	INVALID_TITLELENGTH = "Invalid Contents: Title cannot be longer than 128 characters.";
	public static final String 	INVALID_LENGTHCONTENTS = "Invalid Contents: Content cannot be longer than 4096 characters.";
	public static final String 	INVALID_REPORTLENGTHCONTENTS = "Invalid Contents: Content cannot be longer than 126 characters.";
	public static final String 	INVALID_COMMENTLENGTHCONTENTS = "Invalid Contents: Content cannot be longer than 1024 characters.";

	public static final String 	INVALID_USERID = "Invalid User ID: User ID does not exist.";
	public static final String 	INVALID_JOURNALID = "Invalid Journal ID: The Journal ID does not exist.";
	public static final String 	INVALID_JOURNALBYUSER = "Invalid Journal and User ID Combination: The Journal Id is not associated with this user.";
	public static final String 	INVALID_ALREADYLIKEDJOURNAL = "Invalid Request: This Journal has already been liked by the user.";
	public static final String 	INVALID_NOTLIKEDJOURNAL = "Invalid Request: This Journal cannot be unliked as it needs to be liked by the user first.";
	public static final String 	INVALID_REPORTEXISTS = "Invalid Request: An Active Report for this Journal Already exists for this user.";
	public static final String 	INVALID_JOURNALDELETED = "Invalid Request: This Journal has already been deleted.";

	public static final String 	INVALID_RATING = "Invalid Rating: Rating must be 'Tastes Same' 'Tastes Different' 'Tastes Worse' or 'No Taste'.";
	public static final String 	INVALID_FOODID = "Invalid Food ID: Food ID does not exist.";
	public static final String 	INVALID_ALREADYRATED = "Invalid Request: The User has already rated this food.";
	public static final String 	INVALID_REQUESTEXISTS = "Invalid Request: The User has already submitted the same request.";
	public static final String 	INVALID_REPORTLENGTH = "Invalid Contents: Content cannot be longer than 256 characters.";
	public static final String 	INVALID_COMMENTEXISTS = "Invalid Request: The User has already commented this on the same post.";

	public static final String INVALID_KEYWORD = "Invalid Keyword: Length of Keyword must be ranged from 1 to 128.";
	public static final String INVALID_FILTERKEY = "Invalid FilterKey: FilterKey must be a String of ageGroup, date or rating.";
	public static final String INVALID_LOWERUPPERAGEGROUP = "Invalid Age Group: lowerAgeGroup must be less than upperAgeGroup.";
	public static final String INVALID_FILTER_DATEFORMAT = "Invalid Date Format: Date Format must be 'yyyy-MM-dd'.";
	public static final String INVALID_FILTER_LOWERUPPERDATE = "Invalid Date: lowerDate mush be before of upperDate.";
	public static final String INVALID_FILTER_RATING = "Invalid Rating: Rating must be greater than 0.";
	public static final String INVALID_FILTER_LOWERUPPERRATING = "Invalid Rating: lowerRating must be less than upperRating.";

	public static final String INVALID_USERNAME = "Invalid User name: Length of user name must be 1 to 64 and not blank.";
	public static final String INVALID_EMAIL = "Invalid Email: Length of email must be less than 256 characters. Less than 64 chars before @. The email may have been registered by another user.";
	public static final String INVALID_EMAILFORMAT = "Invalid Email: Email must contain @.";
	public static final String INVALID_PASSWORDLENGTH = "Invalid Password Length: Password length must be 8-32 characters.";
	public static final String INVALID_PASSWORD = "Invalid Password: Password must contain capital, small letter and number.";
	public static final String INVALID_AGEGROUP = "Invalid Age group: Age group must be 0 to 9.";
	public static final String INVALID_VACCINATIONSTATUS = "Invalid vaccination status: Vaccination status must be 0 to 3.";
	public static final String INVALID_DATE = "Invalid positive result date: Positive result date must be before today.";

	public static final String INVALID_LOGININFO = "Invalid login information: Email or password is wrong.";
	public static final String INVALID_LOGINYET = "You must log in.";


	public static final String INVALID_ACCESS = "Invalid Access: Access is denied for the user.";

	public static final String INVALID_IDCOMBINATION = "Invalid ID combination: The ID combination is invalid.";
}

