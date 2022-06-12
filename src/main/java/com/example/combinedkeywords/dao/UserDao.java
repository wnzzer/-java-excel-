package com.example.combinedkeywords.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author 15031
 */
@Mapper
public interface UserDao {
    /**
     *注册
     * 把账号密码注册
     * @param name
     * @param password
     * @return 1||0
     *
     */
    @Insert("insert into user (username,password) values (#{name},#{password})" )
    public Integer register(@Param("name")String name,@Param("password")String password);
    /**
     *登陆
     * 把账号密码验证
     * @param name
     * @param password
     * @return 数字
     *
     */
    @Select("SELECT COUNT(id) FROM `user` \n" +
            "WHERE username=#{name}  AND password =#{password}" )
    public Integer login(@Param("name")String name,@Param("password")String password);
    /**
     *验证
     * 验证账号是否存在
     * @param name
     * @return 1||0
     *
     */
    @Select("SELECT COUNT(id) FROM `user` \n" +
            "WHERE username=#{name}" )
    public Integer exist(@Param("name")String name);

}
