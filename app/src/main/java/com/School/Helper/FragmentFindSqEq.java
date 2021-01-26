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


public class FragmentFindSqEq extends Fragment {

    public static final String Tag = "FindFragmTag";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_fragment_find_sq_eq, container, false);
    }

    @Override
    public void onStart() {
        super.onStart();
        Button button = (Button) getView().findViewById(R.id.button8);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextView rezvosst = (TextView) getView().findViewById(R.id.textView19);
                EditText elem1 = (EditText) getView().findViewById(R.id.editText6);
                EditText elem2 = (EditText) getView().findViewById(R.id.editText7);
                double x1;
                double x2;
                if (elem1.getText().toString().matches("") || elem2.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Введите все числа",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    x1 = Float.parseFloat(elem1.getText().toString());
                    x2 = Float.parseFloat(elem2.getText().toString());
                    if (Math.abs(x1) > 300 || Math.abs(x2) > 300) {
                        Toast toast = Toast.makeText(getActivity(),
                                "Число должно быть от -300 до 300",
                                Toast.LENGTH_SHORT);
                        toast.show();
                    } else {
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
            }
        });
    }
}
