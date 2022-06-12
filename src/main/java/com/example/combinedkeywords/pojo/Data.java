package com.example.combinedkeywords.pojo;

/**
 * @author 15031
 */
public class Data {
    private Object dataInner;
    private Object dataInner2;

    public Data(Object dataInner, Object dataInner2) {
        this.dataInner = dataInner;
        this.dataInner2 = dataInner2;
    }

    public Data() {
    }

    public Object getDataInner() {
        return dataInner;
    }

    public void setDataInner(Object dataInner) {
        this.dataInner = dataInner;
    }

    public Object getDataInner2() {
        return dataInner2;
    }

    public void setDataInner2(Object dataInner2) {
        this.dataInner2 = dataInner2;
    }
}
