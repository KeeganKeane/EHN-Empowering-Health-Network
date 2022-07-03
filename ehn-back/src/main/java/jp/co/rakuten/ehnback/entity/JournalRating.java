package jp.co.rakuten.ehnback.entity;
import java.util.Date;
import lombok.Data;
import javax.persistence.*;

@Data
@Entity
@Table(name = "post_ratings")
public class JournalRating {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "post_id")
	private Integer postId;

	@Column(name = "user_id")
	private Integer userId;

	@Column
	private Integer rating;

	@Column(name = "created_at")
	private Date createdAt;
}
