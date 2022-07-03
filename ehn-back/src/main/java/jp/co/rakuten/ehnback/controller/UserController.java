package jp.co.rakuten.ehnback.controller;


import jp.co.rakuten.ehnback.dto.*;
import jp.co.rakuten.ehnback.service.UserService;
import jp.co.rakuten.ehnback.validator.UserValidator;
import lombok.AllArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {

    UserService userService;

    /**
     * End point to get user information
     *
     * @param id (Integer)
     * @return UserInformationDto
     */
    @GetMapping("/{id}")
    public UserInformationDto getUserinfo(@PathVariable Integer id){

//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        System.out.println("Jt_pass_1 " + passwordEncoder.encode("Jt_pass_1"));
//        System.out.println("Mt_pass_1 '" + passwordEncoder.encode("Mt_pass_1"));
//        System.out.println("Rr_pass_1 " + passwordEncoder.encode("Rr_pass_1"));
//        System.out.println("Pr_pass_1 " + passwordEncoder.encode("Pr_pass_1"));
//        System.out.println("Dj_pass_1 " + passwordEncoder.encode("Dj_pass_1"));
//        System.out.println("Ad_pass_1 " + passwordEncoder.encode("Ad_pass_1"));

        return userService.getUserInformation(id);
    }

    /**
     * End point to register
     *
     * @param registerUserDto (RegisterUserDto)
     * @return LoggedinUserDto
     */
    @PostMapping("/register")
    public LoggedinUserDto register(@RequestBody RegisterUserDto registerUserDto){
        UserValidator.validateRegisterUserDto(registerUserDto);
        return userService.register(registerUserDto);
    }

    /**
     * End point to update user information
     *
     * @param updateUserDto
     * @return
     */
    @PatchMapping("/updateInfo")
    public LoggedinUserDto updateInfo(@RequestBody UpdateUserDto updateUserDto){
        UserValidator.validateUpdateUserDto(updateUserDto);
        Integer userId = userService.getUserIdFromAuth();
        return userService.update(userId, updateUserDto);
    }
}
