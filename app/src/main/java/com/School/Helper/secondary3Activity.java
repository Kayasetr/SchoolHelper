package com.School.Helper;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class secondary3Activity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secondary3);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void OnButton1Click(View v) {
        TextView rezvosst = findViewById(R.id.textView19);
        EditText elem1 = findViewById(R.id.editText6);
        EditText elem2 = findViewById(R.id.editText7);
        double x1 = Float.parseFloat(elem1.getText().toString());
        double x2 = Float.parseFloat(elem2.getText().toString());
        double p1 = -(x1 + x2);
        double q1 = x1 * x2;
        if (p1 > 0 && q1 > 0) {
            if (p1 != Math.round(p1)) {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x+" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²+" + Math.round(p1) + "x+" + String.format("%.1f", q1) + "=0");
            }
            if (q1 != Math.round(q1)) {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x+" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x+" + Math.round(q1) + "=0");
            }
            if (p1 == Math.round(p1) && q1 == Math.round(q1)) {
                rezvosst.setText("x²+" + Math.round(p1) + "x+" + Math.round(q1) + "=0");
            } else {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x+" + String.format("%.1f", q1) + "=0");
            }
        }
        if (p1 < 0 && q1 > 0) {
            if (p1 != Math.round(p1)) {
                rezvosst.setText("x²" + String.format("%.1f", p1) + "x+" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²" + Math.round(p1) + "x+" + String.format("%.1f", q1) + "=0");
            }
            if (q1 != Math.round(q1)) {
                rezvosst.setText("x²" + String.format("%.1f", p1) + "x+" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²" + String.format("%.1f", p1) + "x+" + Math.round(q1) + "=0");
            }
            if (p1 == Math.round(p1) && q1 == Math.round(q1)) {
                rezvosst.setText("x²" + Math.round(p1) + "x+" + Math.round(q1) + "=0");
            } else {
                rezvosst.setText("x²" + String.format("%.1f", p1) + "x+" + String.format("%.1f", q1) + "=0");
            }
        }
        if (p1 > 0 && q1 < 0) {
            if (p1 != Math.round(p1)) {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²+" + Math.round(p1) + "x" + String.format("%.1f", q1) + "=0");
            }
            if (q1 != Math.round(q1)) {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x" + Math.round(q1) + "=0");
            }
            if (p1 == Math.round(p1) && q1 == Math.round(q1)) {
                rezvosst.setText("x²+" + Math.round(p1) + "x" + Math.round(q1) + "=0");
            } else {
                rezvosst.setText("x²+" + String.format("%.1f", p1) + "x" + String.format("%.1f", q1) + "=0");
            }
        }
        if (p1 < 0 && q1 < 0) {
            if (p1 != Math.round(p1)) {
                rezvosst.setText("x²(" + String.format("%.1f", p1) + ")x" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²(" + Math.round(p1) + ")x" + String.format("%.1f", q1) + "=0");
            }
            if (q1 != Math.round(q1)) {
                rezvosst.setText("x²(" + String.format("%.1f", p1) + ")x" + String.format("%.1f", q1) + "=0");
            } else {
                rezvosst.setText("x²(" + String.format("%.1f", p1) + ")x" + Math.round(q1) + "=0");
            }
            if (p1 == Math.round(p1) && q1 == Math.round(q1)) {
                rezvosst.setText("x²(" + Math.round(p1) + ")x" + Math.round(q1) + "=0");
            } else {
                rezvosst.setText("x²(" + String.format("%.1f", p1) + ")x" + String.format("%.1f", q1) + "=0");
            }
        }
    }
}
