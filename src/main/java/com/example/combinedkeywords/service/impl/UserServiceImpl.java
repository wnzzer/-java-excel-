package com.example.combinedkeywords.service.impl;

import com.example.combinedkeywords.dao.UserDao;
import com.example.combinedkeywords.service.UserService;
import com.example.combinedkeywords.util.JsonResult;

import javax.annotation.Resource;

/**
 * @author 15031
 */
public class UserServiceImpl implements UserService {
    @Resource
    private UserDao userDao;
    @Override
    public JsonResult register(String name, String password) {
        if (name == null || password == null){
            return JsonResult.errorMsg("账号或密码未输入");
        }
        Integer state=userDao.register(name, password);
        if (state==1){
            return JsonResult.ok();
        }
        else {
            return JsonResult.errorMsg("注册失败，请重试");
        }
    }

    @Override
    public JsonResult login(String name, String password) {
        if (name == null || password == null){
            return JsonResult.errorMsg("账号或密码未输入");
        }
        Integer state=userDao.login(name, password);
        if (state==1){
            return JsonResult.ok();
        }
        else {
            return JsonResult.errorMsg("登陆失败，请重试");
        }
    }
}

