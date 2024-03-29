package com.example.combinedkeywords.controller;

import com.example.combinedkeywords.pojo.Data;
import com.example.combinedkeywords.pojo.Pojo;
import com.example.combinedkeywords.util.CombinationOperation;
import com.example.combinedkeywords.util.ExcelUtil;
import com.example.combinedkeywords.util.JsonResult;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author 15031
 */
@RestController
public class CombineController {
    @PostMapping ("/combine")
    public JsonResult combine(@RequestBody Pojo pojo) {
        String symbol=pojo.getSymbol();
        String symbol2= pojo.getSymbol2();
        List<String> resultArraylist = new ArrayList<>();
        List a = new ArrayList<>();
        String[]arrayLists1=pojo.getArraylist();
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
            if (symbol2!=null){
                sTemp=symbol2+sTemp+symbol2;
                System.out.println(sTemp);
            }
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

    @GetMapping("/downloadFile")

    private String downloadFile(HttpServletResponse response,String fileName){
        String downloadFilePath = "/root/fileSavePath/";

        fileName=fileName+".xls";
        File file = new File(fileName);
        if (file.exists()) {
            response.setContentType("application/force-download");
            response.addHeader("Content-Disposition", "attachment;fileName=" + fileName);
            byte[] buffer = new byte[1024];
            FileInputStream fis = null;
            BufferedInputStream bis = null;
            try {
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                OutputStream outputStream = response.getOutputStream();
                int i = bis.read(buffer);
                while (i != -1) {
                    outputStream.write(buffer, 0, i);
                    i = bis.read(buffer);
                }

                return "下载成功";
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (bis != null) {
                    try {
                        bis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                if (fis != null) {
                    try {
                        fis.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        return "下载失败";
    }

    }


