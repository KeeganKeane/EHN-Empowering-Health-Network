package jp.co.rakuten.ehnback.security;

import java.util.Collections;
import java.util.List;
import jp.co.rakuten.ehnback.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

public class SimpleLoginUser extends org.springframework.security.core.userdetails.User {

	private User user;

	public User getUser() {
		return user;
	}

	public SimpleLoginUser(User user) {
		super(user.getEmail(), user.getPassword(), determineRoles(user.getAdminFlag()));
		this.user = user;
	}

	private static final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");
	private static final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");

	private static List<GrantedAuthority> determineRoles(boolean isAdmin) {
		return isAdmin ? ADMIN_ROLES : USER_ROLES;
	}
}