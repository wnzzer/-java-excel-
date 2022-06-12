package com.example.combinedkeywords.util;

import java.util.List;

/**
 * <p>This entity use to algorithm for combination</p>
 * <p>https://blog.csdn.net/RobinsStruggle</p>
 *
 * @author Robin
 * @date 2018-06-12 13:59:00
 */
public class CombinationEntity {

    //总数
    private int sumFrequency;

    //组当前所处的频率
    private int nowFrequency;

    //组的频率
    private int allFrequency;

    //data中当前获取的数据的下标
    private int index;

    //存储的数据
    private List<Object> data;

    public int getSumFrequency() {
        return sumFrequency;
    }

    public void setSumFrequency(int sumFrequency) {
        this.sumFrequency = sumFrequency;
    }

    public int getNowFrequency() {
        return nowFrequency;
    }

    public void setNowFrequency(int nowFrequency) {
        this.nowFrequency = nowFrequency;
    }

    public int getAllFrequency() {
        return allFrequency;
    }

    public void setAllFrequency(int allFrequency) {
        this.allFrequency = allFrequency;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }
}
