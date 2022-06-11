package com.example.combinedkeywords.controller;

import com.example.combinedkeywords.service.UserService;
import com.example.combinedkeywords.util.JsonResult;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @author 15031
 */
@RestController
public class UserController {
    @Resource
    private UserService userService;
    public JsonResult register(String name,String password){
        return userService.register(name,password);
    }
    public JsonResult login(String name,String password){
        return login(name, password);
    }

}
