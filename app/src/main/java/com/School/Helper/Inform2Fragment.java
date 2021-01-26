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


public class Inform2Fragment extends Fragment {

    public static final String Tag = "Inform2";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container2,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_inform2, container2, false);
    }

    @Override
    public void onStart() {
        super.onStart();
        Button button = (Button) getView().findViewById(R.id.button2);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TextView rezpreobp = (TextView) getView().findViewById(R.id.textView12);
                EditText chislo = (EditText) getView().findViewById(R.id.editText9);
                if (chislo.getText().toString().matches("")) {
                    Toast toast = Toast.makeText(getActivity(),
                            "Введите число",
                            Toast.LENGTH_SHORT);
                    toast.show();
                } else {
                    int a = Integer.parseInt(chislo.getText().toString());
                        String convert = Integer.toOctalString(a);
                        rezpreobp.setText("Результат: " + convert);
                    }
            }
        });
    }
}
