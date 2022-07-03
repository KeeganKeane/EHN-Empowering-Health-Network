package jp.co.rakuten.ehnback.entity;

import java.util.Date;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "posts")
public class JournalPost {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "create_user_id")
	private Integer createUserId;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "updated_at")
	private Date updatedAt;

	@Column(name = "title")
	private String title;

	@Column(name = "content")
	private String content;

	@Column(name = "like_count")
	private Integer likeCount;

	@Column(name = "active_flag")
	private Boolean activeFlag;
}
