package com.School.Helper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;


public class GeometryCalcFrag extends Fragment {

    public static final String Tag = "Geom2";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_geometry_calc, container, false);
    }

    @Override
    public void onStart() {
        super.onStart();
        Button button1 = (Button) getView().findViewById(R.id.button15);
        Button button2 = (Button) getView().findViewById(R.id.button16);
        Button button3 = (Button) getView().findViewById(R.id.button17);
        Button button4 = (Button) getView().findViewById(R.id.button18);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText pervperem = (EditText) getView().findViewById(R.id.editText1);
                EditText vtorperem = (EditText) getView().findViewById(R.id.editText2);
                TextView result = (TextView) getView().findViewById(R.id.textView1);
                if (pervperem.getText().toString().matches("") || vtorperem.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Заполните поля",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    float a = Float.parseFloat(pervperem.getText().toString());
                    float b = Float.parseFloat(vtorperem.getText().toString());
                    double res = a - b;
                    if (res != Math.round(res)) {
                        result.setText("Ответ:" + String.format("%.5f", res));
                    } else {
                        result.setText("Ответ:" + (Math.round(res)));
                    }
                }
            }
        });
        button2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText pervperem = (EditText) getView().findViewById(R.id.editText1);
                EditText vtorperem = (EditText) getView().findViewById(R.id.editText2);
                TextView result = (TextView) getView().findViewById(R.id.textView1);
                if (pervperem.getText().toString().matches("") || vtorperem.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Заполните поля",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    float a = Float.parseFloat(pervperem.getText().toString());
                    float b = Float.parseFloat(vtorperem.getText().toString());
                    double res = a + b;
                    if (res != Math.round(res)) {
                        result.setText("Ответ:" + String.format("%.5f", res));
                    } else {
                        result.setText("Ответ:" + (Math.round(res)));
                    }
                }
            }
        });
        button3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText pervperem = (EditText) getView().findViewById(R.id.editText1);
                EditText vtorperem = (EditText) getView().findViewById(R.id.editText2);
                TextView result = (TextView) getView().findViewById(R.id.textView1);
                if (pervperem.getText().toString().matches("") || vtorperem.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Заполните поля",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    float a = Float.parseFloat(pervperem.getText().toString());
                    float b = Float.parseFloat(vtorperem.getText().toString());
                    if (b == 0) {
                        Toast toast = Toast.makeText(getActivity(), "На ноль делить не надо!", Toast.LENGTH_SHORT);
                        toast.show();
                    } else if (b != 0) {
                        double res = a / b;
                        if (res != Math.round(res)) {
                            result.setText("Ответ:" + String.format("%.5f", res));
                        } else {
                            result.setText("Ответ:" + (Math.round(res)));
                        }
                    }
                }
            }
        });
        button4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                EditText pervperem = (EditText) getView().findViewById(R.id.editText1);
                EditText vtorperem = (EditText) getView().findViewById(R.id.editText2);
                TextView result = (TextView) getView().findViewById(R.id.textView1);
                if (pervperem.getText().toString().matches("") || vtorperem.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Заполните поля",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    float a = Float.parseFloat(pervperem.getText().toString());
                    float b = Float.parseFloat(vtorperem.getText().toString());
                    double res = a * b;
                    if (res != Math.round(res)) {
                        result.setText("Ответ:" + String.format("%.5f", res));
                    } else {
                        result.setText("Ответ:" + (Math.round(res)));
                    }
                }
            }
        });

    }
}


