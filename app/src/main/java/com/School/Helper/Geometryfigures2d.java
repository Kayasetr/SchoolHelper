package com.School.Helper;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


public class Geometryfigures2d extends AppCompatActivity {
    TextView res1;
    TextView res2;
    TextView res3;
    TextView res4;
    TextView res5;
    TextView res6;
    TextView res7;
    TextView res8;
    TextView res9;
    TextView res10;
    EditText shape1e1;
    EditText shape1e2;
    EditText shape1e3;
    EditText shape1e4;
    EditText shape1e5;
    EditText shape2e1;
    EditText shape2e2;
    EditText shape2e3;
    EditText shape2e4;
    EditText shape3e1;
    EditText shape3e2;
    EditText shape3e3;
    EditText shape3e4;
    EditText shape3e5;
    EditText shape3e6;
    EditText shape3e7;
    EditText shape4e1;
    EditText shape4e2;
    EditText shape4e3;
    EditText shape4e4;
    EditText shape4e5;
    EditText shape4e6;
    EditText shape4e7;
    EditText shape4e8;
    EditText shape5e1;
    EditText shape5e2;
    EditText shape6e1;
    EditText shape6e2;
    EditText shape6e3;
    EditText shape6e4;
    EditText shape7e1;
    EditText shape7e2;
    EditText shape8e1;
    EditText shape8e2;
    EditText shape8e3;
    EditText shape8e4;
    EditText shape9e1;
    EditText shape9e2;
    EditText shape10e1;
    EditText shape10e2;
    EditText shape10e3;
    EditText shape10e4;
    double pi =  3.141592653589793;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_geometryfigures2d);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }
    public void onShape1Sclick (View v) {
        shape1e1 = (EditText) findViewById(R.id.shape21edit1);
        shape1e2 = (EditText) findViewById(R.id.shape21edit2);
        shape1e3 = (EditText) findViewById(R.id.shape21edit3);
        shape1e4 = (EditText) findViewById(R.id.shape21edit4);
        shape1e5 = (EditText) findViewById(R.id.shape21edit5);
        res1 = (TextView) findViewById(R.id.Otvet1);
        double h, b, a, d, e;
        double res;
        if (shape1e1.getText().toString().matches("") && shape1e2.getText().toString().matches("") && shape1e3.getText().toString().matches("") && shape1e4.getText().toString().matches("") && shape1e5.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape1e1.getText().toString().matches("") && !shape1e2.getText().toString().matches("")) {
            h = Float.parseFloat(shape1e1.getText().toString());
            b = Float.parseFloat(shape1e2.getText().toString());
            res = 0.5*h*b;
            res1.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
        if (!shape1e3.getText().toString().matches("") && !shape1e4.getText().toString().matches("") && !shape1e5.getText().toString().matches("")) {
            a = Float.parseFloat(shape1e3.getText().toString());
            d = Float.parseFloat(shape1e4.getText().toString());
            e = Float.parseFloat(shape1e5.getText().toString());
            b = d;
            res = 0.5*a*b*Math.sin(Math.toRadians(e));
            res1.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void onShape2Sclick (View v) {
        shape2e1 = (EditText) findViewById(R.id.shape22edit1);
        shape2e2 = (EditText) findViewById(R.id.shape22edit2);
        res2 = (TextView) findViewById(R.id.Otvet2);
        if (shape2e1.getText().toString().matches("") || shape2e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape2e1.getText().toString().matches("") && !shape2e2.getText().toString().matches("")) {
            float a, b, res;
            a = Float.parseFloat(shape2e1.getText().toString());
            b = Float.parseFloat(shape2e2.getText().toString());
            res = a * b;
            res2.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }
    }
    public void onShape2Pclick (View v) {
        shape2e3 = (EditText) findViewById(R.id.shape22edit3);
        shape2e4 = (EditText) findViewById(R.id.shape22edit4);
        res2 = (TextView) findViewById(R.id.Otvet2);
        if (shape2e3.getText().toString().matches("") || shape2e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape2e3.getText().toString().matches("") && !shape2e4.getText().toString().matches("")) {
            float a, b, res;
            a = Float.parseFloat(shape2e3.getText().toString());
            b = Float.parseFloat(shape2e4.getText().toString());
            res = 2 * a + 2 * b;
            res2.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");
        }
    }
    public void onShape3Sclick (View v) {
        shape3e1 = (EditText) findViewById(R.id.shape23edit1);
        shape3e2 = (EditText) findViewById(R.id.shape23edit2);
        shape3e3 = (EditText) findViewById(R.id.shape23edit3);
        shape3e4 = (EditText) findViewById(R.id.shape23edit4);
        shape3e5 = (EditText) findViewById(R.id.shape23edit5);
        res3 = (TextView) findViewById(R.id.Otvet3);
        double h, b, a, d, e;
        double res;
        if (shape3e1.getText().toString().matches("") && shape3e2.getText().toString().matches("") && shape3e3.getText().toString().matches("") && shape3e4.getText().toString().matches("") && shape3e5.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape3e1.getText().toString().matches("") && !shape3e2.getText().toString().matches("")) {
            h = Float.parseFloat(shape1e1.getText().toString());
            b = Float.parseFloat(shape1e2.getText().toString());
            res = h*b;
            res3.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
        if (!shape3e3.getText().toString().matches("") && !shape3e4.getText().toString().matches("") && !shape3e5.getText().toString().matches("")) {
            a = Float.parseFloat(shape1e3.getText().toString());
            d = Float.parseFloat(shape1e4.getText().toString());
            e = Float.parseFloat(shape1e5.getText().toString());
            b = d;
            res = a*b*Math.sin(Math.toRadians(e));
            res3.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void onShape3Pclick (View v) {
        shape3e6 = (EditText) findViewById(R.id.shape23edit6);
        shape3e7 = (EditText) findViewById(R.id.shape23edit7);
        res3 = (TextView) findViewById(R.id.Otvet3);
        if (shape3e6.getText().toString().matches("") || shape3e7.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape3e6.getText().toString().matches("") && !shape3e7.getText().toString().matches("")) {
            float a, b, res;
            a = Float.parseFloat(shape3e6.getText().toString());
            b = Float.parseFloat(shape3e7.getText().toString());
            res = 2 * a + 2 * b;
            res3.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");
        }
    }
    public void onShape4Sclick (View v) {
        shape4e1 = (EditText) findViewById(R.id.shape24edit1);
        shape4e2 = (EditText) findViewById(R.id.shape24edit2);
        shape4e3 = (EditText) findViewById(R.id.shape24edit3);
        res4 = (TextView) findViewById(R.id.Otvet4);

        if (shape4e1.getText().toString().matches("") || shape4e2.getText().toString().matches("") || shape4e3.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape4e1.getText().toString().matches("") && !shape4e2.getText().toString().matches("") && !shape4e3.getText().toString().matches("")) {
            float h, b, a;
            double res;
            a = Float.parseFloat(shape4e1.getText().toString());
            b = Float.parseFloat(shape4e2.getText().toString());
            h = Float.parseFloat(shape4e3.getText().toString());
            res = 0.5*h*(a+b);
            res4.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }

    }
    public void onShape4Pclick (View v) {
        shape4e4 = (EditText) findViewById(R.id.shape24edit4);
        shape4e5 = (EditText) findViewById(R.id.shape24edit5);
        shape4e6 = (EditText) findViewById(R.id.shape24edit6);
        shape4e7 = (EditText) findViewById(R.id.shape24edit7);
        shape4e8 = (EditText) findViewById(R.id.shape24edit8);
        res4 = (TextView) findViewById(R.id.Otvet4);

        if (shape4e4.getText().toString().matches("") || shape4e5.getText().toString().matches("") || shape4e6.getText().toString().matches("")|| shape4e7.getText().toString().matches("") || shape4e8.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape4e4.getText().toString().matches("") && !shape4e5.getText().toString().matches("") && !shape4e6.getText().toString().matches("")&& !shape4e7.getText().toString().matches("") && !shape4e8.getText().toString().matches("")) {
            float a,b,c,d,h;
            double res;
            h = Float.parseFloat(shape4e4.getText().toString());
            a = Float.parseFloat(shape4e5.getText().toString());
            b = Float.parseFloat(shape4e6.getText().toString());
            c = Float.parseFloat(shape4e7.getText().toString());
            d = Float.parseFloat(shape4e8.getText().toString());
            res = a+b+h*(1/Math.sin(Math.toRadians(c))+(1/Math.sin(Math.toRadians(d))));
            res4.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");

        }
    }
    public void onShape5Sclick (View v) {
        shape5e1 = (EditText) findViewById(R.id.shape25edit1);
        res5 = (TextView) findViewById(R.id.Otvet5);
        if (shape5e1.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape5e1.getText().toString().matches("")) {
            float r;
            double res;
            r = Float.parseFloat(shape5e1.getText().toString());
            res = pi*Math.pow(r, 2);
            res5.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }

    }
    public void onShape5Pclick (View v) {
        shape5e2 = (EditText) findViewById(R.id.shape25edit2);
        res5 = (TextView) findViewById(R.id.Otvet5);
        if (shape5e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape5e2.getText().toString().matches("")) {
            float r;
            double res;
            r = Float.parseFloat(shape5e2.getText().toString());
            res = 2*pi*r;
            res5.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");
        }
    }
    public void onShape6Sclick (View v) {
        shape6e1 = (EditText) findViewById(R.id.shape26edit1);
        shape6e2 = (EditText) findViewById(R.id.shape26edit2);
        res6 = (TextView) findViewById(R.id.Otvet6);
        if (shape6e1.getText().toString().matches("") || shape6e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape6e1.getText().toString().matches("") && !shape6e2.getText().toString().matches("")) {
            float r, theta;
            double res;
            r = Float.parseFloat(shape6e1.getText().toString());
            theta = Float.parseFloat(shape6e2.getText().toString());
            res = 0.5*Math.pow(r, 2)*Math.sin(Math.toRadians(theta));
            res6.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }
    }
    public void onShape6Pclick (View v) {
        shape6e3 = (EditText) findViewById(R.id.shape26edit3);
        shape6e4 = (EditText) findViewById(R.id.shape26edit4);
        res6 = (TextView) findViewById(R.id.Otvet6);
        if (shape6e3.getText().toString().matches("") || shape6e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape6e3.getText().toString().matches("") && !shape6e4.getText().toString().matches("")) {
            float r, theta;
            double res;
            r = Float.parseFloat(shape6e3.getText().toString());
            theta = Float.parseFloat(shape6e4.getText().toString());
            res = r*Math.sin(Math.toRadians(theta));
            res6.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");
        }
    }
    public void onShape7Sclick (View v) {
        shape7e1 = (EditText) findViewById(R.id.shape27edit1);
        shape7e2 = (EditText) findViewById(R.id.shape27edit2);
        res7 = (TextView) findViewById(R.id.Otvet7);
        if (shape7e1.getText().toString().matches("") || shape7e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape7e1.getText().toString().matches("") && !shape7e2.getText().toString().matches("")) {
            float r, theta;
            double res;
            r = Float.parseFloat(shape7e1.getText().toString());
            theta = Float.parseFloat(shape7e2.getText().toString());
            res = 0.5*Math.pow(r, 2)*(theta-Math.sin(Math.toRadians(theta)));
            res7.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }
    }
    public void onShape8Sclick (View v) {
        shape8e1 = (EditText) findViewById(R.id.shape28edit1);
        shape8e2 = (EditText) findViewById(R.id.shape28edit2);
        res8 = (TextView) findViewById(R.id.Otvet8);
        if (shape8e1.getText().toString().matches("") || shape8e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape8e1.getText().toString().matches("") && !shape8e2.getText().toString().matches("")) {
            float n, b;
            double res;
            n = Float.parseFloat(shape8e1.getText().toString());
            b = Float.parseFloat(shape8e2.getText().toString());
            res = (n*(b*b))/(4*Math.tan(Math.toRadians(180)/n));
            res8.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }
    }
    public void onShape8Pclick (View v) {
        shape8e3 = (EditText) findViewById(R.id.shape28edit3);
        shape8e4 = (EditText) findViewById(R.id.shape28edit4);
        res8 = (TextView) findViewById(R.id.Otvet8);
        if (shape8e3.getText().toString().matches("") || shape8e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape8e3.getText().toString().matches("") && !shape8e4.getText().toString().matches("")) {
            float n, b;
            double res;
            n = Float.parseFloat(shape8e3.getText().toString());
            b = Float.parseFloat(shape8e4.getText().toString());
            res = n*b;
            res8.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");
        }
    }
    public void onShape9Sclick (View v) {
        shape9e1 = (EditText) findViewById(R.id.shape29edit1);
        shape9e2 = (EditText) findViewById(R.id.shape29edit2);
        res9 = (TextView) findViewById(R.id.Otvet9);
        if (shape9e1.getText().toString().matches("") || shape9e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape9e1.getText().toString().matches("") && !shape9e2.getText().toString().matches("")) {
            float a, b;
            double res;
            a = Float.parseFloat(shape9e1.getText().toString());
            b = Float.parseFloat(shape9e2.getText().toString());
            res = 0.333*a*b;
            res9.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }
    }
    public void onShape10Sclick (View v) {
        shape10e1 = (EditText) findViewById(R.id.shape30edit1);
        shape10e2 = (EditText) findViewById(R.id.shape30edit2);
        res10 = (TextView) findViewById(R.id.Otvet10);
        if (shape10e1.getText().toString().matches("") || shape10e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape10e1.getText().toString().matches("") && !shape10e2.getText().toString().matches("")) {
            float a, b;
            double res;
            a = Float.parseFloat(shape10e1.getText().toString());
            b = Float.parseFloat(shape10e2.getText().toString());
            res = pi*a*b;
            res10.setText("Ответ: S= " + String.format("%.2f", res) + " (см²)");
        }
    }
    public void onShape10Pclick (View v) {
        shape10e3 = (EditText) findViewById(R.id.shape30edit3);
        shape10e4 = (EditText) findViewById(R.id.shape30edit4);
        res10 = (TextView) findViewById(R.id.Otvet10);
        if (shape10e3.getText().toString().matches("") || shape10e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape10e3.getText().toString().matches("") && !shape10e4.getText().toString().matches("")) {
            float a, b;
            double res;
            a = Float.parseFloat(shape10e3.getText().toString());
            b = Float.parseFloat(shape10e4.getText().toString());
            res = 2*pi*Math.sqrt(0.5*((a*a)+(b*b)));
            res10.setText("Ответ: P= " + String.format("%.2f", res) + " (см)");
        }
    }
}
