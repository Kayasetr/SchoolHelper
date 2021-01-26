package com.School.Helper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;


public class Inform4Fragment extends Fragment {
    private TextView chislo;

    public static final String Tag = "Inform4";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_inform4, container, false);
    }
    @Override
    public void onStart() {
        super.onStart();
        Button button = (Button) getView().findViewById(R.id.button2);
        Button button0 = (Button) getView().findViewById(R.id.button0);
        Button button1 = (Button) getView().findViewById(R.id.button1);
        chislo = getView().findViewById(R.id.textView13);
        chislo.setText("");
        button0.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                chislo.setText(chislo.getText().toString() +"0");
            }
        });
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                chislo.setText(chislo.getText().toString() +"1");
            }
        });
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextView rezpreobp = (TextView) getView().findViewById(R.id.textView12);
                TextView chislo = (TextView) getView().findViewById(R.id.textView13);
                if (chislo.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Введите число",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    int a = Integer.parseInt(chislo.getText().toString(), 2);
                    rezpreobp.setText("Результат: " + a);
                }
            }
        });
    }


}
