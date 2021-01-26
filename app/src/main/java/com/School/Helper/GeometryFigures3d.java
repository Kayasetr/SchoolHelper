package com.School.Helper;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class GeometryFigures3d extends AppCompatActivity {
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
    TextView res11;
    EditText shape1e1;
    EditText shape1e2;
    EditText shape1e3;
    EditText shape1e4;
    EditText shape1e5;
    EditText shape1e6;
    EditText shape2e1;
    EditText shape2e2;
    EditText shape2e3;
    EditText shape2e4;
    EditText shape2e5;
    EditText shape2e6;
    EditText shape3e1;
    EditText shape3e2;
    EditText shape4e1;
    EditText shape4e2;
    EditText shape4e3;
    EditText shape4e4;
    EditText shape5e1;
    EditText shape5e2;
    EditText shape5e3;
    EditText shape5e4;
    EditText shape5e5;
    EditText shape5e6;
    EditText shape6e1;
    EditText shape6e2;
    EditText shape6e3;
    EditText shape6e4;
    EditText shape6e5;
    EditText shape6e6;
    EditText shape6e7;
    EditText shape6e8;
    EditText shape6e9;
    EditText shape7e1;
    EditText shape7e2;
    EditText shape8e1;
    EditText shape8e2;
    EditText shape8e3;
    EditText shape8e4;
    EditText shape9e1;
    EditText shape9e2;
    EditText shape9e3;
    EditText shape9e4;
    EditText shape10e1;
    EditText shape10e2;
    EditText shape11e1;
    EditText shape11e2;
    EditText shape11e3;
    EditText shape11e4;
    EditText shape11e5;
    EditText shape11e6;
    double pi =  3.141592653589793;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_geometry_figures3d);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }
    public void OnShape1click (View v) {
        shape1e1 =  (EditText) findViewById(R.id.shape32edit1);
        shape1e2 =  (EditText) findViewById(R.id.shape32edit2);
        shape1e3 =  (EditText) findViewById(R.id.shape32edit3);
        shape1e4 =  (EditText) findViewById(R.id.shape32edit4);
        shape1e5 =  (EditText) findViewById(R.id.shape32edit5);
        shape1e6 =  (EditText) findViewById(R.id.shape32edit6);
        res1 = (TextView) findViewById(R.id.Otvet1);
        double h, b, a, A, c, theta;
        double res;
        if (shape1e1.getText().toString().matches("") && shape1e2.getText().toString().matches("") && shape1e3.getText().toString().matches("") && shape1e4.getText().toString().matches("") && shape1e5.getText().toString().matches("") && shape1e6.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape1e1.getText().toString().matches("") && !shape1e2.getText().toString().matches("")) {
            A = Float.parseFloat(shape1e1.getText().toString());
            h = Float.parseFloat(shape1e2.getText().toString());
            res = A*h;
            res1.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
        if (!shape1e3.getText().toString().matches("") && !shape1e4.getText().toString().matches("") && !shape1e5.getText().toString().matches("") && !shape1e6.getText().toString().matches("")) {
            a = Float.parseFloat(shape1e3.getText().toString());
            b = Float.parseFloat(shape1e4.getText().toString());
            c = Float.parseFloat(shape1e5.getText().toString());
            theta = Float.parseFloat(shape1e6.getText().toString());
            res = a*b*c*Math.sin(Math.toRadians(theta));
            res1.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }

    }
    public void OnShape2Vclick (View v) {
        shape2e1 =  (EditText) findViewById(R.id.shape33edit1);
        shape2e2 =  (EditText) findViewById(R.id.shape33edit2);
        shape2e3 =  (EditText) findViewById(R.id.shape33edit3);
        res2 = (TextView) findViewById(R.id.Otvet2);
        float a,b,c;
        double res;
        if (shape2e1.getText().toString().matches("") && shape2e2.getText().toString().matches("") && shape2e3.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape2e1.getText().toString().matches("") && !shape2e2.getText().toString().matches("") && !shape2e3.getText().toString().matches("")) {
            a = Float.parseFloat(shape2e1.getText().toString());
            b = Float.parseFloat(shape2e2.getText().toString());
            c = Float.parseFloat(shape2e3.getText().toString());
            res = a*b*c;
            res2.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape2Sclick (View v) {
        shape2e4 =  (EditText) findViewById(R.id.shape33edit4);
        shape2e5 =  (EditText) findViewById(R.id.shape33edit5);
        shape2e6 =  (EditText) findViewById(R.id.shape33edit6);
        res2 = (TextView) findViewById(R.id.Otvet2);
        float a,b,c;
        double res;
        if (shape2e4.getText().toString().matches("") && shape2e5.getText().toString().matches("") && shape2e6.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape2e4.getText().toString().matches("") && !shape2e5.getText().toString().matches("") && !shape2e6.getText().toString().matches("")) {
            a = Float.parseFloat(shape2e4.getText().toString());
            b = Float.parseFloat(shape2e5.getText().toString());
            c = Float.parseFloat(shape2e6.getText().toString());
            res = 2*(a*b+a*c+b*c);
            res2.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape3Vclick (View v) {
        shape3e1 =  (EditText) findViewById(R.id.shape34edit1);
        shape3e2 =  (EditText) findViewById(R.id.shape34edit2);
        res3 = (TextView) findViewById(R.id.Otvet3);
        float A,h;
        double res;
        if (shape3e1.getText().toString().matches("") && shape3e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape3e1.getText().toString().matches("") && !shape3e2.getText().toString().matches("")) {
            A = Float.parseFloat(shape3e1.getText().toString());
            h = Float.parseFloat(shape3e2.getText().toString());
            res = 0.33*A*h;
            res3.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape4Vclick (View v) {
        shape4e1 =  (EditText) findViewById(R.id.shape31edit1);
        shape4e2 =  (EditText) findViewById(R.id.shape31edit2);
        res4 = (TextView) findViewById(R.id.Otvet4);
        float r,h;
        double res;
        if (shape4e1.getText().toString().matches("") && shape4e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape4e1.getText().toString().matches("") && !shape4e2.getText().toString().matches("")) {
            r = Float.parseFloat(shape4e1.getText().toString());
            h = Float.parseFloat(shape4e2.getText().toString());
            res = pi*(r*r)*h;
            res4.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape4Sclick (View v) {
        shape4e3 =  (EditText) findViewById(R.id.shape31edit3);
        shape4e4 =  (EditText) findViewById(R.id.shape31edit4);
        res4 = (TextView) findViewById(R.id.Otvet4);
        float r,h;
        double res;
        if (shape4e3.getText().toString().matches("") && shape4e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape4e3.getText().toString().matches("") && !shape4e4.getText().toString().matches("")) {
            r = Float.parseFloat(shape4e3.getText().toString());
            h = Float.parseFloat(shape4e4.getText().toString());
            res = 2*pi*r*h;
            res4.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape5Lclick (View v) {
        shape5e5 =  (EditText) findViewById(R.id.shape35edit5);
        shape5e6 =  (EditText) findViewById(R.id.shape35edit6);
        res5 = (TextView) findViewById(R.id.Otvet5);
        float r,h;
        double res;
        if (shape5e5.getText().toString().matches("") && shape5e6.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape5e5.getText().toString().matches("") && !shape5e6.getText().toString().matches("")) {
            r = Float.parseFloat(shape5e5.getText().toString());
            h = Float.parseFloat(shape5e6.getText().toString());
            res = Math.sqrt((r*r)+(h*h));
            res5.setText("Ответ: L= "+ String.format("%.2f", res)+ " (см)");
        } 
    }
    public void OnShape5Vclick (View v) {
        shape5e1 =  (EditText) findViewById(R.id.shape35edit1);
        shape5e2 =  (EditText) findViewById(R.id.shape35edit2);
        res5 = (TextView) findViewById(R.id.Otvet5);
        float r,h;
        double res;
        if (shape5e1.getText().toString().matches("") && shape5e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape5e1.getText().toString().matches("") && !shape5e2.getText().toString().matches("")) {
            r = Float.parseFloat(shape5e1.getText().toString());
            h = Float.parseFloat(shape5e2.getText().toString());
            res = 0.33*pi*(h*h)*(3*r-h);
            res5.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape5Sclick (View v) {
        shape5e3 =  (EditText) findViewById(R.id.shape35edit3);
        shape5e4 =  (EditText) findViewById(R.id.shape35edit4);
        res5 = (TextView) findViewById(R.id.Otvet5);
        float r,l;
        double res;
        if (shape5e3.getText().toString().matches("") && shape5e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape5e3.getText().toString().matches("") && !shape5e4.getText().toString().matches("")) {
            r = Float.parseFloat(shape5e3.getText().toString());
            l = Float.parseFloat(shape5e4.getText().toString());
            res = pi*r*l;
            res5.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape6Lclick (View v) {
        shape6e7 =  (EditText) findViewById(R.id.shape36edit7);
        shape6e8 =  (EditText) findViewById(R.id.shape36edit8);
        shape6e9 =  (EditText) findViewById(R.id.shape36edit9);
        res6 = (TextView) findViewById(R.id.Otvet6);
        float a,b,h;
        double res;
        if (shape6e7.getText().toString().matches("") && shape6e8.getText().toString().matches("") && shape6e9.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape6e7.getText().toString().matches("") && !shape6e8.getText().toString().matches("") && !shape6e9.getText().toString().matches("")) {
            a = Float.parseFloat(shape6e7.getText().toString());
            b = Float.parseFloat(shape6e8.getText().toString());
            h = Float.parseFloat(shape6e9.getText().toString());
            res = Math.sqrt((h*h)+Math.pow(b-a, 2));
            res6.setText("Ответ: L= "+ String.format("%.2f", res)+ " (см)");
        }
    }
    public void OnShape6Vclick (View v) {
        shape6e1 =  (EditText) findViewById(R.id.shape36edit1);
        shape6e2 =  (EditText) findViewById(R.id.shape36edit2);
        shape6e3 =  (EditText) findViewById(R.id.shape36edit3);
        res6 = (TextView) findViewById(R.id.Otvet6);
        float a,b,h;
        double res;
        if (shape6e1.getText().toString().matches("") && shape6e2.getText().toString().matches("") && shape6e3.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape6e1.getText().toString().matches("") && !shape6e2.getText().toString().matches("") && !shape6e3.getText().toString().matches("")) {
            a = Float.parseFloat(shape6e1.getText().toString());
            b = Float.parseFloat(shape6e2.getText().toString());
            h = Float.parseFloat(shape6e3.getText().toString());
            res = 0.33*pi*h*((a*a)+a*b+(b*b));
            res6.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape6Sclick (View v) {
        shape6e4 =  (EditText) findViewById(R.id.shape36edit4);
        shape6e5 =  (EditText) findViewById(R.id.shape36edit5);
        shape6e6 =  (EditText) findViewById(R.id.shape36edit6);
        res6 = (TextView) findViewById(R.id.Otvet6);
        float a,b,l;
        double res;
        if (shape6e4.getText().toString().matches("") && shape6e5.getText().toString().matches("") && shape6e6.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape6e4.getText().toString().matches("") && !shape6e5.getText().toString().matches("") && !shape6e6.getText().toString().matches("")) {
            a = Float.parseFloat(shape6e4.getText().toString());
            b = Float.parseFloat(shape6e5.getText().toString());
            l = Float.parseFloat(shape6e6.getText().toString());
            res = pi*(a*b)*l;
            res6.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape7Vclick (View v) {
        shape7e1 = (EditText) findViewById(R.id.shape37edit1);
        res7 = (TextView) findViewById(R.id.Otvet7);
        float r;
        double res;
        if (shape7e1.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
            r = Float.parseFloat(shape7e1.getText().toString());
            res = 1.333*pi*(r*r*r);
            res7.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape7Sclick (View v) {
        shape7e2 = (EditText) findViewById(R.id.shape37edit2);
        res7 = (TextView) findViewById(R.id.Otvet7);
        float r;
        double res;
        if (shape7e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
            r = Float.parseFloat(shape7e2.getText().toString());
            res = 4*pi*(r*r);
            res7.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape8Vclick (View v) {
        shape8e1 =  (EditText) findViewById(R.id.shape38edit1);
        shape8e2 =  (EditText) findViewById(R.id.shape38edit2);
        res8 = (TextView) findViewById(R.id.Otvet8);
        float r,h;
        double res;
        if (shape8e1.getText().toString().matches("") && shape8e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape8e1.getText().toString().matches("") && !shape8e2.getText().toString().matches("")) {
            r = Float.parseFloat(shape8e1.getText().toString());
            h = Float.parseFloat(shape8e2.getText().toString());
            res = 0.33*pi*(h*h)*(3*r-h);
            res8.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape8Sclick (View v) {
        shape8e3 =  (EditText) findViewById(R.id.shape38edit3);
        shape8e4 =  (EditText) findViewById(R.id.shape38edit4);
        res8 = (TextView) findViewById(R.id.Otvet8);
        float r,h;
        double res;
        if (shape8e3.getText().toString().matches("") && shape8e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape8e3.getText().toString().matches("") && !shape8e4.getText().toString().matches("")) {
            r = Float.parseFloat(shape8e3.getText().toString());
            h = Float.parseFloat(shape8e4.getText().toString());
            res = 2*pi*r*h;
            res8.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape9Sclick (View v) {
        shape9e1 =  (EditText) findViewById(R.id.shape39edit1);
        shape9e2 =  (EditText) findViewById(R.id.shape39edit2);
        shape9e3 =  (EditText) findViewById(R.id.shape39edit3);
        shape9e4 =  (EditText) findViewById(R.id.shape39edit4);
        res9 = (TextView) findViewById(R.id.Otvet9);
        float r,a,b,c;
        double res;
        if (shape9e1.getText().toString().matches("") && shape9e2.getText().toString().matches("") && shape9e3.getText().toString().matches("") && shape9e4.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape9e1.getText().toString().matches("") && !shape9e2.getText().toString().matches("")&& !shape9e3.getText().toString().matches("") && !shape9e4.getText().toString().matches("")) {
            a = Float.parseFloat(shape9e1.getText().toString());
            b = Float.parseFloat(shape9e2.getText().toString());
            c = Float.parseFloat(shape9e3.getText().toString());
            r = Float.parseFloat(shape9e4.getText().toString());
            res = (a*b*c-pi)*(r*r);
            res9.setText("Ответ: S= "+ String.format("%.2f", res)+ " (см²)");
        }
    }
    public void OnShape10Vclick (View v) {
        shape10e1 =  (EditText) findViewById(R.id.shape40edit1);
        shape10e2 =  (EditText) findViewById(R.id.shape40edit2);
        res10 = (TextView) findViewById(R.id.Otvet10);
        float a,b;
        double res;
        if (shape10e1.getText().toString().matches("") && shape10e2.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape10e1.getText().toString().matches("") && !shape10e2.getText().toString().matches("")) {
            a = Float.parseFloat(shape10e1.getText().toString());
            b = Float.parseFloat(shape10e2.getText().toString());
            res = 0.5*pi*(b*b)*a;
            res10.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }
    public void OnShape11Vclick (View v) {
        shape11e1 =  (EditText) findViewById(R.id.shape41edit1);
        shape11e2 =  (EditText) findViewById(R.id.shape41edit2);
        shape11e3 =  (EditText) findViewById(R.id.shape41edit3);
        res11 = (TextView) findViewById(R.id.Otvet11);
        float a,b,c;
        double res;
        if (shape11e1.getText().toString().matches("") && shape11e2.getText().toString().matches("") && shape11e3.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        }
        if (!shape11e1.getText().toString().matches("") && !shape11e2.getText().toString().matches("") && !shape11e3.getText().toString().matches("")) {
            a = Float.parseFloat(shape11e1.getText().toString());
            b = Float.parseFloat(shape11e2.getText().toString());
            c = Float.parseFloat(shape11e3.getText().toString());
            res = 1.33*pi*a*b*c;
            res11.setText("Ответ: V= "+ String.format("%.2f", res)+ " (см³)");
        }
    }


}
