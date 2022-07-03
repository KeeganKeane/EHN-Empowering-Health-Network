package jp.co.rakuten.ehnback.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import jp.co.rakuten.ehnback.dto.LoggedinUserDto;
import jp.co.rakuten.ehnback.entity.User;
import jp.co.rakuten.ehnback.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;


@Slf4j
public class SimpleAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response,
			Authentication auth) throws IOException, ServletException {
		if (response.isCommitted()) {
			log.info("Response has already been committed.");
			return;
		}

		SimpleLoginUser simpleLoginUser = (SimpleLoginUser) auth.getPrincipal();
		User user = simpleLoginUser.getUser();
		Integer userId = user.getId();
		String username = user.getUsername();
		LoggedinUserDto loggedinUserDto = new LoggedinUserDto(true, "login success", user.getId(), user.getUsername(), user.getAdminFlag());

		response.setStatus(HttpStatus.OK.value());
		response.getOutputStream().print(objectMapper.writeValueAsString(loggedinUserDto));

		clearAuthenticationAttributes(request);
	}

	/**
	 * Removes temporary authentication-related data which may have been stored in the
	 * session during the authentication process.
	 */
	private void clearAuthenticationAttributes(HttpServletRequest request) {
		HttpSession session = request.getSession(false);

		if (session == null) {
			return;
		}
		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
	}
}