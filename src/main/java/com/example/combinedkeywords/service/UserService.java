package com.example.combinedkeywords.service;

import com.example.combinedkeywords.util.JsonResult;


public interface UserService {
    /**
     * 注册
     * 将用户信息注册
     * @param name
     * @param password
     * @return JsonResult
     */
    public JsonResult register(String name,String password);
    /**
     * 登陆
     * 将用户信息登陆
     * @param name
     * @param password
     * @return JsonResult
     */
    public JsonResult login(String name,String password);
}
