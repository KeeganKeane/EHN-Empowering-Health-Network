package jp.co.rakuten.ehnback.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "foods")
@Table(name="foods")
public class Food {

    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="photo_address")
    private String photoAddress;

    @Column(name="tastes_same_count")
    private Integer tastesSameCount;

    @Column(name="tastes_different_count")
    private Integer tastesDifferentCount;

    @Column(name="tastes_worse_count")
    private Integer tastesWorseCount;

    @Column(name="no_tastes_count")
    private Integer noTastesCount;

    @Column(name="active_flag")
    private Boolean activeFlag;


}
