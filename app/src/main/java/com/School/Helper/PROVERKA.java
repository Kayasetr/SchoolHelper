package com.School.Helper;

import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.chaos.view.PinView;

public class PROVERKA extends AppCompatActivity {
    int a,b,c,d,a1,b1,c1,d1;
    String s;
    PinView pinView;
    Button check;
    TextView txt;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_proverk);
        pinView = findViewById(R.id.firstPinView);
        txt = findViewById(R.id.textResult);
        check = findViewById(R.id.but_CHECK);
        check.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                s = pinView.getText().toString();
                if (s.length()==4) {
                    a = Integer.parseInt(s.substring(0,1));
                    b = Integer.parseInt(s.substring(1,2));
                    c = Integer.parseInt(s.substring(2,3));
                    d = Integer.parseInt(s.substring(3,4));
                    c1 = a+b;
                    d1 = a-b;
                    if (a+b == c && a-b == d){
                        check.setBackgroundColor(Color.parseColor("#00ff00"));
                        Toast.makeText(PROVERKA.this, "Сейф взломан! 10 миллионов ваши!!!", Toast.LENGTH_SHORT).show();
                        txt.setText("");
                    }else if (c1>=10 || d1<0 /*|| (c1!=c && d1 != d)*/) {
                        txt.setText("ПИН-код не соответсвует формуле!");
                        check.setBackgroundColor(Color.parseColor("#ff0000"));
                    }else if(a+b == c && a-b != d){
                        txt.setText("Цифра в 4 ячейке не верна! Код должен выглядеть так: "+a+b+c1+d1);
                        check.setBackgroundColor(Color.parseColor("#ff0000"));
                    }else if(a+b != c && a-b == d){
                        txt.setText("Цифра в 3 ячейке не верна! Код должен выглядеть так: "+a+b+c1+d1);
                        check.setBackgroundColor(Color.parseColor("#ff0000"));
                    }else if(c - a == a - d){
                        b1 = c-a;
                        check.setBackgroundColor(Color.parseColor("#ff0000"));
                        txt.setText("Цифра в 2 ячейке не верна! Код должен выглядеть так: "+a+b1+c+d);
                    }else if(c - b == b + d ){
                        a1 = c-b;
                        check.setBackgroundColor(Color.parseColor("#ff0000"));
                        txt.setText("Цифра в 1 ячейке не верна! Код должен выглядеть так: "+a1+b+c+d);
                    }else {
                        txt.setText("ПИН-код не соответсвует формуле!");
                        check.setBackgroundColor(Color.parseColor("#ff0000"));
                    }
                } else {

                    Toast.makeText(PROVERKA.this, "Введите ПИН-код от сейфа!", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
