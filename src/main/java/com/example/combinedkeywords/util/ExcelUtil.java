package com.example.combinedkeywords.util;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import java.io.File;
import java.util.List;

/**
 * @author 15031
 */
public class ExcelUtil
{
   public static void creatExcel(List<String> list,String name)
   {
        try
        {
//打开文件
            WritableWorkbook book=
                    Workbook.createWorkbook(new File(name+".xls"));

//生成名为“第一页”的工作表，参数0表示这是第一页
            WritableSheet sheet=book.createSheet("第一页",0);

//在Label对象的构造子中指名单元格位置是第一列第一行(0,0)
//以及单元格内容为test
            Label label=new Label(0,0,"编号");
            Label label1=new Label(1,0,"组合");

//将定义好的单元格添加到工作表中
            sheet.addCell(label);
            sheet.addCell(label1);

/*生成一个保存数字的单元格
必须使用Number的完整包路径，否则有语法歧义
单元格位置是第二列，第一行，值为789.123*/
            Integer r=1;
            for (String temp : list)
            {
                jxl.write.Label tempLabel = new jxl.write.Label(0,r,""+r);
                jxl.write.Label tempLabel2 = new jxl.write.Label(1,r,temp);
                sheet.addCell(tempLabel);
                sheet.addCell(tempLabel2);
                r++;
            }

//写入数据并关闭文件
            book.write();
            book.close();

        }catch(Exception e)
        {
            System.out.println(e);
        }
   }
}

