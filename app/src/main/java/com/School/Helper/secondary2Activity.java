package com.School.Helper;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class secondary2Activity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secondary2);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void OnButton1Click(View v) {
        EditText pervperem = findViewById(R.id.editText4);
        EditText vtorperem = findViewById(R.id.editText5);
        TextView result = findViewById(R.id.textView4);
        float a = Float.parseFloat(pervperem.getText().toString());
        float b = Float.parseFloat(vtorperem.getText().toString());
        float res = a - b;
        result.setText(Float.toString(res));
    }
    public void OnButton2Click(View v) {
        EditText pervperem = findViewById(R.id.editText4);
        EditText vtorperem = findViewById(R.id.editText5);
        TextView result = findViewById(R.id.textView4);
        float a = Float.parseFloat(pervperem.getText().toString());
        float b = Float.parseFloat(vtorperem.getText().toString());
        float res = a + b;
        result.setText(Float.toString(res));
    }
    public void OnButton3Click(View v) {
        EditText pervperem =  findViewById(R.id.editText4);
        EditText vtorperem =  findViewById(R.id.editText5);
           TextView result =  findViewById(R.id.textView4);
        float a = Float.parseFloat(pervperem.getText().toString());
        float b = Float.parseFloat(vtorperem.getText().toString());
        if (b==0) {
            Toast.makeText(secondary2Activity.this, "На ноль делить не надо!", Toast.LENGTH_SHORT);
        } else if (b!=0){
            float res = a / b;
            result.setText(Float.toString(res));
        }
    }
    public void OnButton4Click(View v) {
        EditText pervperem = findViewById(R.id.editText4);
        EditText vtorperem = findViewById(R.id.editText5);
        TextView result = findViewById(R.id.textView4);
        float a = Float.parseFloat(pervperem.getText().toString());
        float b = Float.parseFloat(vtorperem.getText().toString());
        float res = a * b;
        result.setText(Float.toString(res));
    }
}
