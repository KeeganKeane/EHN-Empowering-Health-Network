package jp.co.rakuten.ehnback.validator;

import jp.co.rakuten.ehnback.dto.RegisterUserDto;
import jp.co.rakuten.ehnback.dto.UpdateUserDto;
import jp.co.rakuten.ehnback.exception.InvalidRequestException;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.Locale;

import static jp.co.rakuten.ehnback.constant.ErrorMessages.*;

@Slf4j
public class UserValidator {

    /**
     * Validator for user name
     *
     * @param userName
     * @return void
     */
    public static void validateUserName(String userName){
        if((userName.length() < 1) || (userName.length() > 64) ||(userName.isBlank())){
            throw new InvalidRequestException(INVALID_USERNAME);
        }
    }

    /**
     * Validator for email
     *
     * @param email
     * @return void
     */
    public static void validateEmail(String email){
        if((email.length() > 256) || (email.length() < 1)){
            throw new InvalidRequestException(INVALID_EMAIL);
        }
        if(!email.contains("@")){
            throw new InvalidRequestException(INVALID_EMAILFORMAT);
        }
        if((email.split("@")[0].length() > 64) ||
                (email.split("@")[0].length() < 1)){
            throw new InvalidRequestException(INVALID_EMAIL);
        }
    }

    /**
     * Validator for password
     *
     * @param password
     * @return void
     */
    public static void validatePassword(String password){
        if((password.length() < 8) || (password.length() > 32)){
            throw new InvalidRequestException(INVALID_PASSWORDLENGTH);
        }
        if((password.toLowerCase().equals(password)) ||
                (password.toUpperCase().equals(password))) {
            throw new InvalidRequestException(INVALID_PASSWORD);
        }
        if(!password.matches(".*[0-9].*")){
            throw new InvalidRequestException(INVALID_PASSWORD);
        }
    }

    /**
     * Validator for age group
     *
     * @param ageGroup
     * @return void
     */
    public static void validateAgeGroup(Integer ageGroup){
        if((ageGroup < 0) || (ageGroup > 9)){
            throw new InvalidRequestException(INVALID_AGEGROUP);
        }
    }

    /**
     * Validator for vaccination status
     *
     * @param vaccinationStatus
     * @return vaid
     */
    public static void validateVaccinationStatus(Integer vaccinationStatus){
        if((vaccinationStatus < 0) || (vaccinationStatus > 3)){
            throw new InvalidRequestException(INVALID_VACCINATIONSTATUS);
        }
    }

    /**
     * Validator for positive result date
     *
     * @param PRdate
     * @return void
     */
    public static void validatePositiveResultDate(Date PRdate){
        if(PRdate.after(new Date())){
            throw new InvalidRequestException(INVALID_DATE);
        }
    }

    /**
     * Validator for RegisterUserDto
     *
     * @param registerUserDto
     * @return void
     */
    public static void validateRegisterUserDto(RegisterUserDto registerUserDto){
        validateUserName(registerUserDto.getUserName());
        validateEmail(registerUserDto.getEmail());
        validatePassword(registerUserDto.getPassword());
        validateAgeGroup(registerUserDto.getAgeGroup());
        if(registerUserDto.getVaccinationStatus() != null){
            validateVaccinationStatus(registerUserDto.getVaccinationStatus());
        }
        if(registerUserDto.getPositiveResultDate() != null) {
            validatePositiveResultDate(registerUserDto.getPositiveResultDate());
        }
    }

    /**
     * Validator for updateUserDto
     *
     * @param updateUserDto
     * @return void
     */
    public static void validateUpdateUserDto(UpdateUserDto updateUserDto){
        validateUserName(updateUserDto.getUserName());
        validateEmail(updateUserDto.getEmail());
        validateAgeGroup(updateUserDto.getAgeGroup());
        if(updateUserDto.getVaccinationStatus() != null){
            validateVaccinationStatus(updateUserDto.getVaccinationStatus());
        }
        if(updateUserDto.getPositiveResultDate() != null) {
            validatePositiveResultDate(updateUserDto.getPositiveResultDate());
        }
    }
}
