package com.example.combinedkeywords.controller;

import com.example.combinedkeywords.service.UserService;
import com.example.combinedkeywords.util.JsonResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author 15031
 */
@RestController
public class UserController {
    @Resource
    private UserService userService;
    @PutMapping("/register")
    public JsonResult register(String name,String password){
        return userService.register(name,password);
    }
    @PostMapping("/login")
    public JsonResult login(String name,String password){
        return userService.login(name, password);
    }

}
