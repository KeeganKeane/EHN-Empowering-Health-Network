package jp.co.rakuten.ehnback.security;

import org.springframework.security.core.userdetails.UserDetails;
import jp.co.rakuten.ehnback.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("simpleUserDetailsService")
public class SimpleUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	public SimpleUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(final String email) {
		return userRepository.findByEmail(email)
				.map(SimpleLoginUser::new)
				.orElseThrow(() -> new UsernameNotFoundException("user not found"));
	}
}