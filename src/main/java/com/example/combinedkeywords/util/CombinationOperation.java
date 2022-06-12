package com.example.combinedkeywords.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>This class to do some operation about combination and more</p>
 * <p>https://blog.csdn.net/RobinsStruggle</p>
 *
 * @auhtor Robin
 * @date 2018-06-12 14:04:00
 */
public class CombinationOperation {

    private final static Logger logger = LoggerFactory.getLogger(CombinationOperation.class);

    /**
     * Combination for cross and return an list array;
     * @param param4List afferent parameter
     *                   Careful: This param can't be null, And this son can't be null too;
     * @return
     * @author Robin
     */
    public synchronized static List<List<Object>> combinationByCross(List<List<Object>> param4List) {
        List<List<Object>> resultList = new ArrayList<List<Object>>();
        if (param4List == null || param4List.isEmpty()) {
            logger.error("CombinationOperation ==> combinationByCross: The afferent parameter is null or empty, so return an new ArrayList..");
            return resultList;
        }

        //统计生成的总数
        int sumFrequency = 1;
        for (List<Object> dataSon : param4List) {
            if (dataSon == null || dataSon.isEmpty()) {
                param4List.remove(dataSon);
                continue;
            }

            for (Object dataSon1 : dataSon) {
                if (dataSon1 == null) {
                    dataSon.remove(dataSon1);
                }
            }

            sumFrequency *= dataSon.size();
        }

		//生成每个算法控制实体类，并绑定相应参数
        List<CombinationEntity> dataList4CombinationEntity = new ArrayList<CombinationEntity>();
        int updateFrequency = 1;
        for (List<Object> dataSon : param4List) {
            List<Object> dataList = new ArrayList<Object>();
            CombinationEntity combinationEntity = new CombinationEntity();
            combinationEntity.setSumFrequency(sumFrequency);
            combinationEntity.setNowFrequency(0);
            combinationEntity.setIndex(0);

            for (Object dataSon1 : dataSon) {
                dataList.add(dataSon1);
            }

            updateFrequency *= dataList.size();

            combinationEntity.setData(dataList);
            combinationEntity.setAllFrequency(sumFrequency/updateFrequency);

            dataList4CombinationEntity.add(combinationEntity);
        }

        for (int i = 0; i < sumFrequency; i++) {
            List<Object> dataList4Object = new ArrayList<Object>();

            for (CombinationEntity dataSon : dataList4CombinationEntity) {
                if (dataSon.getNowFrequency() >= dataSon.getAllFrequency()) {
                    dataSon.setNowFrequency(0);
                    //重置index
                    dataSon.setIndex(dataSon.getIndex() + 1 >= dataSon.getData().size()?0:dataSon.getIndex() + 1);
                }

                dataList4Object.add(dataSon.getData().get(dataSon.getIndex()));

                dataSon.setNowFrequency(dataSon.getNowFrequency() + 1);
            }

            resultList.add(dataList4Object);
        }

        return resultList;
    }
}
