package jp.co.rakuten.ehnback.entity;


import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name="food_ratings")
public class FoodRating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="food_id")
    private Integer foodId;

    @Column(name="user_id")
    private Integer userId;

    @Column(name="rating")
    private Integer rating;


}
