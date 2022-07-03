package jp.co.rakuten.ehnback.entity;
import java.util.Date;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "post_comments")
public class JournalComment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "post_id")
	private Integer postId;

	@Column(name = "user_id")
	private Integer userId;

	@Column(name = "comment_content")
	private String commentContent;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "active_flag")
	private Boolean activeFlag;
}
