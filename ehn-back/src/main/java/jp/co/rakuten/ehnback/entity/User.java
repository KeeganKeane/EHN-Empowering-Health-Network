package jp.co.rakuten.ehnback.entity;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

@Data
@Entity(name = "users")
@Table(name = "users")
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "age_group")
    private Integer ageGroup;
    @Column(name = "vaccination_status")
    private Integer vaccinationStatus;
    @Column(name = "positive_result_date")
    private Date positiveResultDate;
    @Column(name = "last_logged_in")
    private Date lastLoggedIn;
    @Column(name = "current_infected_flag")
    private Boolean currentInfectedFlag;
    @Column(name = "admin_flag")
    private Boolean adminFlag;
    @Column(name = "parosmia_flag")
    private Boolean parosmiaFlag;
    @Column(name = "active_flag")
    private Boolean activeFlag;

}
