package com.School.Helper;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.math.BigInteger;

public class GeometrySqeq extends AppCompatActivity {

    EditText elem1;
    EditText elem2;
    EditText elem3;
    TextView discr;
    TextView coren1;
    TextView coren2;
    TextView chiscor1;
    TextView chiscor2;
    TextView znamcor1;
    TextView znamcor2;
    TextView atext;
    TextView btext;
    TextView ctext;
    ImageView img;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_geometry_sqeq);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void onButtonClick(View v) {
        TextView txtv = (TextView) findViewById(R.id.textView13);
        img = (ImageView) findViewById(R.id.imageView3);
        discr = (TextView) findViewById(R.id.textView14);
        coren1 = (TextView) findViewById(R.id.textView39);
        coren2 = (TextView) findViewById(R.id.textView38);
        chiscor1 = (TextView) findViewById(R.id.textView19);
        chiscor2 = (TextView) findViewById(R.id.textView36);
        znamcor1 = (TextView) findViewById(R.id.textView30);
        znamcor2 = (TextView) findViewById(R.id.textView37);
        elem1 = (EditText) findViewById(R.id.editText);
        elem2 = (EditText) findViewById(R.id.editText2);
        elem3 = (EditText) findViewById(R.id.editText3);
        atext = (TextView) findViewById(R.id.a);
        btext = (TextView) findViewById(R.id.b);
        ctext = (TextView) findViewById(R.id.c);
        float a, b, c;
        if (elem1.getText().toString().matches("") || elem2.getText().toString().matches("") || elem3.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите все числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
            a = Float.parseFloat(elem1.getText().toString());
            b = Float.parseFloat(elem2.getText().toString());
            c = Float.parseFloat(elem3.getText().toString());
            if (Math.abs(a) > 50 || Math.abs(b) > 50 || Math.abs(c) > 50) {
                Toast toast = Toast.makeText(getApplicationContext(),
                        "Число должно быть от -50 до 50",
                        Toast.LENGTH_SHORT);
                toast.show();
            } else {
                if (a != Math.round(a)) {
                    atext.setText("a= " + String.format("%.1f", a) + ", ");
                } else atext.setText("a= " + Math.round(a) + ", ");
                if (b != Math.round(b)) {
                    btext.setText("b= " + String.format("%.1f", b) + ", ");
                } else btext.setText("b= " + Math.round(b) + ", ");
                if (c != Math.round(c)) {
                    ctext.setText("c= " + String.format("%.1f", c) + ";");
                } else ctext.setText("c= " + Math.round(c) + ";");
                float D = (b * b) - 4 * ((a) * (c));
                if (D < 0) {
                    discr.setText("D= " + String.format("%.1f", D) + ", Дискриминант меньше 0, действительных корней нет");
                } else {
                    if (a != Math.round(a) || b != Math.round(b) || c != Math.round(c) || D != Math.round(D)) {
                        if (a > 0 && c > 0){
                            discr.setText("D=" + String.format("%.1f", b) + "²-4•" + String.format("%.1f", a) + "•" + String.format("%.1f", c) + "=" + String.format("%.1f", D));
                        }
                        if (a < 0 && c > 0) {
                            discr.setText("D=" + String.format("%.1f", b) + "²-4•(" + String.format("%.1f", a) + ")•" + String.format("%.1f", c) + "=" + String.format("%.1f", D));
                        }
                        if (a < 0 && c < 0) {
                            discr.setText("D=" + String.format("%.1f", b) + "²-4•(" + String.format("%.1f", a) + ")•(" + String.format("%.1f", c) + ")=" + String.format("%.1f", D));
                        }
                    } else {
                        if (a > 0 && c > 0){
                            discr.setText("D=" + Math.round(b) + "²-4•" + Math.round(a) + "•" + Math.round(c) + "=" + Math.round(D));
                        }
                        if (a < 0 && c > 0) {
                            discr.setText("D=" + Math.round(b) + "²-4•(" + Math.round(a) + ")•" + Math.round(c) + "=" + Math.round(D));
                        }
                        if (a < 0 && c < 0) {
                            discr.setText("D=" + Math.round(b) + "²-4•(" + Math.round(a) + ")•(" + Math.round(c) + ")=" + Math.round(D));
                        }
                    }
                    double x1 = (-(b) + Math.sqrt(D)) / (2 * (a));
                    double x2 = (-(b) - Math.sqrt(D)) / (2 * (a));
                    if (a != Math.round(a) || b != Math.round(b) || c != Math.round(c)) {
                        chiscor1.setText("-(" + String.format("%.1f", b) + ")+ √" + String.format("%.1f", D));
                        chiscor2.setText("-(" + String.format("%.1f", b) + ")- √" + String.format("%.1f", D));
                        znamcor1.setText("2 • " + String.format("%.1f", a));
                        znamcor2.setText("2 • " + String.format("%.1f", a));
                    } else {
                        chiscor1.setText("-(" + Math.round(b) + ")+ √" + Math.round(D));
                        chiscor2.setText("-(" + Math.round(b) + ")- √" + Math.round(D));
                        znamcor1.setText("2 • " + Math.round(a));
                        znamcor2.setText("2 • " + Math.round(a));
                    }
                    if (x1 != Math.round(x1)) {
                        coren1.setText("= " + String.format("%.3f", x1));
                    } else coren1.setText("= " + Math.round(x1));
                    if (D == 0) {
                        coren2.setText("D=0, корень один");
                        znamcor2.setVisibility(View.INVISIBLE);
                        chiscor2.setVisibility(View.INVISIBLE);
                        img.setVisibility(View.INVISIBLE);
                        txtv.setVisibility(View.INVISIBLE);
                    } else if (x2 != Math.round(x2)) {
                        coren2.setText("= " + String.format("%.3f", x2));
                        znamcor2.setVisibility(View.VISIBLE);
                        chiscor2.setVisibility(View.VISIBLE);
                        img.setVisibility(View.VISIBLE);
                        txtv.setVisibility(View.VISIBLE);
                    } else {
                        coren2.setText("= " + Math.round(x2));
                        znamcor2.setVisibility(View.VISIBLE);
                        chiscor2.setVisibility(View.VISIBLE);
                        img.setVisibility(View.VISIBLE);
                        txtv.setVisibility(View.VISIBLE);
                    }
                }
            }
        }

    }
}
