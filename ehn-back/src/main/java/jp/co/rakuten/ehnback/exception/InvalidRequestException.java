package jp.co.rakuten.ehnback.exception;
/**
 * Invalid Request Exceptions for the EHN API
 */
public class InvalidRequestException extends RuntimeException{
	public InvalidRequestException(String message) {super(message);}
}