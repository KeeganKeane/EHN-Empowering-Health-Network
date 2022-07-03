package jp.co.rakuten.ehnback.entity;
import java.util.Date;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity(name = "post_reports")
@Table(name = "post_reports")
public class JournalReport {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "post_id")
	private Integer postId;

	@Column(name = "user_id")
	private Integer userId;

	@Column
	private String message;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "active_flag")
	private Boolean activeFlag;

}