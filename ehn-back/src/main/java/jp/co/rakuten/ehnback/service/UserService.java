package jp.co.rakuten.ehnback.service;

import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.entity.User;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import jp.co.rakuten.ehnback.exception.NotFoundException;
import jp.co.rakuten.ehnback.repository.UserRepository;
import jp.co.rakuten.ehnback.security.SimpleLoginUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.*;


@Slf4j
@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Get user information
     *
     * @param id
     * @return UserInformationDto
     */
    public UserInformationDto getUserInformation(Integer id){
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()){
            throw new InvalidRequestException(INVALID_USERID);
        }

        return getUserInformationDto(user.get());
    }

    /**
     * Login
     *
     * @param email
     * @param password
     * @return LoggedinUserDto
     */
    public LoggedinUserDto login(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        LoggedinUserDto loggedinUserDto = LoggedinUserDto.builder().build();

        if(userOpt.isPresent()) {
            User user = userOpt.get();
			//Security Encryption
			PasswordEncoder encoder = new BCryptPasswordEncoder();
			user.setPassword(encoder.encode(user.getPassword()));

            if (user.getPassword().equals(password)) {
                loggedinUserDto.setSuccess(true);
                loggedinUserDto.setStatus("login success");
                loggedinUserDto.setUserName(user.getUsername());
                loggedinUserDto.setUserId(user.getId());
                loggedinUserDto.setAdminFlag(user.getAdminFlag());
                return loggedinUserDto;
            }
        }

        throw new InvalidRequestException(INVALID_LOGININFO);
    }

    /**
     * Register a user
     *
     * @param registerUserDto
     * @return LoggedinUserDto
     */
    public LoggedinUserDto register(RegisterUserDto registerUserDto){

        LoggedinUserDto loggedinUserDto =
                LoggedinUserDto.builder().success(false).build();

        // Confirm that the email is not registered yet
        Optional<User> userOpt = userRepository.findByEmail(registerUserDto.getEmail());
        if (userOpt.isEmpty()){
			//Security Encryption
			PasswordEncoder encoder = new BCryptPasswordEncoder();
			registerUserDto.setPassword(encoder.encode(registerUserDto.getPassword()));
			//Logic
            User user = getUser(registerUserDto);
            User registeredUser = userRepository.save(user);
            loggedinUserDto.setSuccess(true);
            loggedinUserDto.setStatus("register success");
            loggedinUserDto.setUserId(registeredUser.getId());
            loggedinUserDto.setUserName(registeredUser.getUsername());
            loggedinUserDto.setAdminFlag(registeredUser.getAdminFlag());
        }else{
            throw new InvalidRequestException(INVALID_EMAIL);
        }

        return loggedinUserDto;
    }

    /**
     * Update a user information
     *
     * @param updateUserDto
     * @return LoggedinUserDto
     */
    public LoggedinUserDto update(Integer userId, UpdateUserDto updateUserDto){

        // Confirm that userId is already exist
        Boolean userExistFlag = userRepository.existsById(userId);

        // Confirm that email is not registered by other user
        Boolean emailRegisterFlag = userRepository.existsByEmailAndIdNot(updateUserDto.getEmail(), userId);

        LoggedinUserDto loggedinUserDto =
                LoggedinUserDto.builder().success(false).build();

        if ((userExistFlag) && (!emailRegisterFlag)){
            //Get user and update info
            Optional<User> userOpt = userRepository.findById(userId);
            User user = userOpt.get();  // here, user is always exist
            user.setUsername(updateUserDto.getUserName());
            user.setEmail(updateUserDto.getEmail());
            user.setAgeGroup(updateUserDto.getAgeGroup());
            user.setVaccinationStatus(updateUserDto.getVaccinationStatus());
            user.setPositiveResultDate(updateUserDto.getPositiveResultDate());
            user.setParosmiaFlag(updateUserDto.getParosmia());
            user.setCurrentInfectedFlag(updateUserDto.getCurrentlyInfected());
            User registeredUser = userRepository.save(user);

            //Return user info
            loggedinUserDto.setSuccess(true);
            loggedinUserDto.setStatus("update success");
            loggedinUserDto.setUserId(registeredUser.getId());
            loggedinUserDto.setUserName(registeredUser.getUsername());
            loggedinUserDto.setAdminFlag(registeredUser.getAdminFlag());
        }else if (!userExistFlag){
            throw new InvalidRequestException(INVALID_USERID);
        }else if (emailRegisterFlag){
            throw new InvalidRequestException(INVALID_EMAIL);
        }

        return loggedinUserDto;

    }

    /**
     * Get analytics
     *
     * @return Analytics Dto
     */
    public AnalyticsDto analytics(){

        // Logic
        //define count list
        Integer[] activeCountList = {0,0};
        Integer[] ageCountList = {0,0,0,0,0,0,0,0,0,0};
        Integer[] vaccinationCountList = {0,0,0,0};
        Integer[] parosmiaCountList = {0,0};

        // count user information
        List<User> userList = userRepository.findAll();
        for(User user : userList){
            if (user.getActiveFlag()){
                activeCountList[0] += 1;
                if(user.getAgeGroup() != null) {
                    ageCountList[user.getAgeGroup()] += 1;
                }
                if(user.getVaccinationStatus() != null) {
                    vaccinationCountList[user.getVaccinationStatus()] += 1;
                }
                if(user.getParosmiaFlag() != null) {
                    int parosmiaIdx = user.getParosmiaFlag() ? 0 : 1;
                    parosmiaCountList[parosmiaIdx] += 1;
                }
            }else{
                activeCountList[1] += 1;
            }
        }

        // convert list to map
        HashMap<String, Integer> userCountMap = new HashMap<>();
        userCountMap.put("active", activeCountList[0]);
        userCountMap.put("notActive", activeCountList[1]);

        // convert list to map
        HashMap<String, Integer> ageCountMap = new HashMap<>();
        for (int i = 0; i < 10; i++){
            ageCountMap.put(Integer.valueOf(i).toString(), ageCountList[i]);
        }

        // convert list to map
        HashMap<String, Integer> vaccinationCountMap = new HashMap<>();
        for (int i = 0; i < 4; i++){
            vaccinationCountMap.put(Integer.valueOf(i).toString(), vaccinationCountList[i]);
        }

        // convert list to map
        HashMap<String, Integer> parosmiaCountMap = new HashMap<>();
        parosmiaCountMap.put("Yes", parosmiaCountList[0]);
        parosmiaCountMap.put("No", parosmiaCountList[1]);

        return AnalyticsDto.builder()
                .users(userCountMap)
                .ageGroup(ageCountMap)
                .vaccinationStatus(vaccinationCountMap)
                .parosmia(parosmiaCountMap)
                .build();
    }

    /**
     * Method to get the user ID whose currently logged In
     *
     * @return user ID (Integer)
     */
    public Integer getUserIdFromAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth instanceof AnonymousAuthenticationToken) {
            return null;
        }
        else {
            SimpleLoginUser simpleLoginUser = (SimpleLoginUser) auth.getPrincipal();
            User user = simpleLoginUser.getUser();
            return user.getId();
        }
    }


    private User getUser(RegisterUserDto registerUserDto){
        User user = new User();
        user.setUsername(registerUserDto.getUserName());
        user.setEmail(registerUserDto.getEmail());
        user.setPassword(registerUserDto.getPassword());
        user.setAgeGroup(registerUserDto.getAgeGroup());
        user.setVaccinationStatus(registerUserDto.getVaccinationStatus());
        user.setPositiveResultDate(registerUserDto.getPositiveResultDate());
        user.setLastLoggedIn(new Date());
        user.setCurrentInfectedFlag(registerUserDto.getCurrentlyInfected());
        user.setAdminFlag(false);
        user.setParosmiaFlag(registerUserDto.getParosmia());
        user.setActiveFlag(true);
        return user;
    }

    private UserInformationDto getUserInformationDto(User user){
        return UserInformationDto.builder()
                .userId(user.getId())
                .userName(user.getUsername())
                .email(user.getEmail())
                .ageGroup(user.getAgeGroup())
                .vaccinationStatus(user.getVaccinationStatus())
                .positiveResultDate(user.getPositiveResultDate())
                .parosmia(user.getParosmiaFlag())
                .currentlyInfected(user.getCurrentInfectedFlag())
                .build();
    }
}
