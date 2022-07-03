package jp.co.rakuten.ehnback.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_LOGINYET;


public class SimpleAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void commence(HttpServletRequest request,
			HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		if (response.isCommitted()) {
//			log.info("Response has already been committed.");
			return;
		}
//		response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase());

		response.setStatus(HttpStatus.UNAUTHORIZED.value());

		Map<String, Object> data = new HashMap<>();
		data.put("message", INVALID_LOGINYET);
		response.getOutputStream().print(objectMapper.writeValueAsString(data));
	}

}