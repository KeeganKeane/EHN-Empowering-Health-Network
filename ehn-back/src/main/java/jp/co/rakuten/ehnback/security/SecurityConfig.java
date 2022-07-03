package jp.co.rakuten.ehnback.security;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// AUTHORIZE
		http.authorizeRequests()
				.mvcMatchers("/journal/post",
									"/journal/sort",
									"/journal/user/{userId}",
									"/journal/comment/{postId}",
									"/journal/search",
									"/journal/filterBy",
									"/user/register",
									"/user/{id}",
									"/frt/search",
									"/frt",
									"/frt/getFood/{foodId}",
									"/frt/comment/{foodId}")
					.permitAll()
				.mvcMatchers("/journal",
									"/journal/{journalId}",
									"/journal/comment",
									"/journal/like",
									"/journal/removeLike",
									"/journal/report",
									"/user/updateInfo",
									"/frt/rate",
									"/frt/comment",
									"/frt/rateHistory",
									"/frt/allRateHistory")
					.hasRole("USER")
				.mvcMatchers("/**")
					.hasRole("ADMIN")
				.anyRequest()
					.authenticated();
		// EXCEPTION
		http.exceptionHandling()
				.authenticationEntryPoint(authenticationEntryPoint())
				.accessDeniedHandler(accessDeniedHandler());
		// LOGIN
		http.formLogin()
				.loginProcessingUrl("/user/login").permitAll()
					.usernameParameter("email")
					.passwordParameter("password")
				.successHandler(authenticationSuccessHandler())
				.failureHandler(authenticationFailureHandler());
		// LOGOUT
		http.logout()
				.logoutUrl("/user/logout")
				.invalidateHttpSession(true)
				.deleteCookies("JSESSIONID")
				.logoutSuccessHandler(logoutSuccessHandler());

		// CORS
		http.cors();

		// CSRF
		http.csrf()
				.ignoringAntMatchers("/user/register", "/user/login", "/user/logout") // disable at login
				.csrfTokenRepository(cookieCsrfTokenRepository());
	}

	@Autowired
	public void configureGlobal(
			AuthenticationManagerBuilder auth,
			@Qualifier("simpleUserDetailsService") UserDetailsService userDetailsService,
			PasswordEncoder passwordEncoder) throws Exception {
		auth.eraseCredentials(true)
				.userDetailsService(userDetailsService)
				.passwordEncoder(passwordEncoder);
	}

	CookieCsrfTokenRepository cookieCsrfTokenRepository() {
		CookieCsrfTokenRepository cookieCsrfTokenRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
		cookieCsrfTokenRepository.setCookiePath("/");
		return cookieCsrfTokenRepository;
	}


	AuthenticationEntryPoint authenticationEntryPoint() {
		return new SimpleAuthenticationEntryPoint();
	}

	AccessDeniedHandler accessDeniedHandler() {
		return new SimpleAccessDeniedHandler();
	}

	AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new SimpleAuthenticationSuccessHandler();
	}

	AuthenticationFailureHandler authenticationFailureHandler() {
		return new SimpleAuthenticationFailureHandler();
	}

	LogoutSuccessHandler logoutSuccessHandler() {
		return new HttpStatusReturningLogoutSuccessHandler();
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}