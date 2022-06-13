package com.example.combinedkeywords.pojo;

public class Pojo
{
    private String[] arraylist;
    private String symbol;
    private String symbol2;

    public Pojo(String[] arraylist, String symbol, String symbol2) {
        this.arraylist = arraylist;
        this.symbol = symbol;
        this.symbol2 = symbol2;
    }

    public Pojo() {
    }

    public String[] getArraylist() {
        return arraylist;
    }

    public void setArraylist(String[] arraylist) {
        this.arraylist = arraylist;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getSymbol2() {
        return symbol2;
    }

    public void setSymbol2(String symbol2) {
        this.symbol2 = symbol2;
    }
}
