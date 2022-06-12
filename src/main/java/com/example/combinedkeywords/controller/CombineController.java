package com.example.combinedkeywords.controller;

import com.example.combinedkeywords.pojo.Data;
import com.example.combinedkeywords.util.CombinationOperation;
import com.example.combinedkeywords.util.ExcelUtil;
import com.example.combinedkeywords.util.JsonResult;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 15031
 */
@RestController
public class CombineController {
    List<String> resultArraylist = new ArrayList<>();

    @GetMapping("/combine")
    public JsonResult combine(@RequestParam Object[] arrayLists1, String symbol) {
        List a = new ArrayList<>();
        System.out.println(arrayLists1);
        System.out.println(arrayLists1[0]);
        for (Object temp : arrayLists1) {
            String[] tempArray = ((String) temp).split(",");
            List list = new ArrayList(Arrays.asList(tempArray));
            a.add(list);
        }
        List<List<String>> tempArraylist = CombinationOperation.combinationByCross(a);
        System.out.println(tempArraylist);
        String sTemp = null;
        for (List<String> tempListA : tempArraylist) {
            sTemp = StringUtils.join(tempListA, symbol);
            resultArraylist.add(sTemp);
        }
        Date date = new Date();
        System.out.println(date);
        SimpleDateFormat formatter = new SimpleDateFormat("ddMMyyyyHHmmss");
        String sDate = formatter.format(date);
        System.out.println(a);
        String fileName = sDate + "" + (int) (Math.random() * 100);
        ExcelUtil.creatExcel(resultArraylist, fileName);
        return JsonResult.ok(new Data(resultArraylist, fileName));
    }

    }


