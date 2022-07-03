package jp.co.rakuten.ehnback.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Model for the Error Messages
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorMessage {

	private String message;
}