package jp.co.rakuten.ehnback.repository;

import jp.co.rakuten.ehnback.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Optional;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    java.util.Optional<User> findByEmail(String email);

    Boolean existsByEmailAndIdNot(String email, Integer id);

    Optional<User> findById(Integer userId);

    @Query("select activeFlag, count(activeFlag) as cnt from users group by activeFlag")
    List<Object> countUser();

    @Query("select ageGroup, count(ageGroup) from users where activeFlag = true group by ageGroup")
    List<Object> countAgeGroup();

    @Query("select vaccinationStatus, count(vaccinationStatus) from users where activeFlag = true group by vaccinationStatus")
    List<Object> countVaccinationStatus();

    @Query("select parosmiaFlag, count(parosmiaFlag) from users where activeFlag = true group by parosmiaFlag")
    List<Object> countParosmia();



}
