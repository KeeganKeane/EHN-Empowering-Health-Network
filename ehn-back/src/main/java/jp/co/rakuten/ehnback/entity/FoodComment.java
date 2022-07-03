package jp.co.rakuten.ehnback.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "food_comments")
public class FoodComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="food_id")
    private Integer foodId;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="comment_content")
    private String commentContent;

    @Column(name="created_at")
    private Date createdAt;

}
