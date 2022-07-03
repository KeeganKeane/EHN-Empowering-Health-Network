package jp.co.rakuten.ehnback.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.INVALID_ACCESS;


public class SimpleAccessDeniedHandler implements AccessDeniedHandler {

	private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void handle(HttpServletRequest request,
			HttpServletResponse response,
			AccessDeniedException exception) throws IOException, ServletException {
//		response.sendError(HttpStatus.FORBIDDEN.value(), HttpStatus.FORBIDDEN.getReasonPhrase());

		response.setStatus(HttpStatus.FORBIDDEN.value());

		Map<String, Object> data = new HashMap<>();
		data.put("message", INVALID_ACCESS);
		response.getOutputStream().print(objectMapper.writeValueAsString(data));
	}

}