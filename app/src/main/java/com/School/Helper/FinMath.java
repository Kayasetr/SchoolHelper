package com.School.Helper;


import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

public class FinMath extends AppCompatActivity {
    EditText Procents;
    EditText Pervvznos;
    EditText SrokVyplat;
    EditText DobEdit;
    TextView result, dobavlenn, pervonvz;
    TextView srok;
    CheckBox check;
    Button btn2;
    double dob[] = new double[80];
    int tag=1;
    int Dobavl=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fin_math);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        check = findViewById(R.id.checkBox1);
        pervonvz = findViewById(R.id.textView2);
        RadioGroup radioGroup = findViewById(R.id.radioGroup);
        result = findViewById(R.id.TextView10);
        btn2 = findViewById(R.id.Button1);
        DobEdit = findViewById(R.id.EditText4);
        btn2.setEnabled(false);
        DobEdit.setEnabled(false);
        check.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                if (b) {
                    btn2.setEnabled(true);
                    DobEdit.setEnabled(true);
                } else {
                    btn2.setEnabled(false);
                    DobEdit.setEnabled(false);
                }
            }
        });
        radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                srok = findViewById(R.id.textView4);

                switch (checkedId) {
                    case R.id.radioButton1: {
                        tag = 1;
                        srok.setText("Срок выплат (лет)");
                        pervonvz.setText("Первоначальный взнос");
                        btn2.setEnabled(false);
                        DobEdit.setEnabled(false);
                        check.setEnabled(true);
                        check.setChecked(false);
                    }
                    break;
                    case R.id.radioButton2: {
                        tag = 2;
                        srok.setText("Срок вклада (лет)");
                        pervonvz.setText("Первоначальный взнос");
                        btn2.setEnabled(false);
                        DobEdit.setEnabled(false);
                        check.setEnabled(false);
                        check.setChecked(false);
                    }
                    break;
                    case R.id.radioButton3: {
                        tag = 3;
                        srok.setText("Срок вклада (лет)");
                        pervonvz.setText("Первоначальный взнос");
                        btn2.setEnabled(false);
                        DobEdit.setEnabled(false);
                        check.setEnabled(false);
                        check.setChecked(false);
                    }
                    break;
                    case R.id.radioButton4: {
                        tag = 4;
                        srok.setText("Срок кредита/ипотеки");
                        pervonvz.setText("Сумма кредита/ипотеки");
                        btn2.setEnabled(false);
                        DobEdit.setEnabled(false);
                        check.setEnabled(false);
                        check.setChecked(false);
                    }
                    break;
                    case R.id.radioButton5: {
                        tag = 5;
                        srok.setText("Срок инвестиции");
                        pervonvz.setText("Сумма инвестиции");
                        btn2.setEnabled(true);
                        DobEdit.setEnabled(true);
                        check.setEnabled(false);
                        check.setChecked(false);
                    }
                    break;
                }
            }
        });
    }
    public void OnButton1Click (View v) {
        if (DobEdit.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Заполните поле",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
            dobavlenn = findViewById(R.id.TextView11);
            dob[Dobavl] = Float.parseFloat(DobEdit.getText().toString());
            DobEdit.setText("");
            if (tag == 5) {
                dobavlenn.setText(dobavlenn.getText().toString()+"доход за "+ Dobavl + " год: " + dob[Dobavl] + "сом"+"\n");
            } else {
                dobavlenn.setText(dobavlenn.getText().toString()+"вклад за "+ Dobavl + " год: " + dob[Dobavl] + "сом"+"\n");
            }
            Dobavl++;
        }
    }
    public void OnButtonClick (View v) {
        Pervvznos = findViewById(R.id.EditText1);
        Procents =  findViewById(R.id.EditText2);
        SrokVyplat = findViewById(R.id.EditText3);

        double arr[] = new double[80];
        double T,t0,pr;
        if (Pervvznos.getText().toString().matches("") || Procents.getText().toString().matches("") || SrokVyplat.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Заполните поля",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
            t0 = Float.parseFloat(Pervvznos.getText().toString());
            pr = Float.parseFloat(Procents.getText().toString())/100;
            T = Float.parseFloat(SrokVyplat.getText().toString());
            double credit;
            arr[0]=t0;
            result.setText("");
            switch (tag) {
                case 1:
                    if (Dobavl>0) {
                        T = Dobavl;
                        arr[0] = dob[0];
                        for (int i = 1; i <= T; i++) {
                            if (dob[i] < 0) {
                                arr[i] = arr[i - 1] + dob[i] + t0;
                                result.setText(result.getText().toString() + i + " год: " + String.format("%.1f", arr[i]) + " сом" + "\n");
                            } else {
                                arr[i] = arr[i - 1] + (arr[i - 1] * pr) + dob[i];
                                result.setText(result.getText().toString() + i + " год: " + String.format("%.1f", arr[i]) + " сом" + "\n");
                            }
                        }
                    } else {
                        for (int i = 1; i <= T; i++) {
                            arr[i] = arr[i - 1] + (arr[i - 1] * pr) + t0;
                            result.setText(result.getText().toString() + i + " год: " + String.format("%.1f", arr[i]) + " сом" + "\n");
                        }
                    }

                    break;
                case 2:
                    for (int i = 1; i <= T; i++) {
                        arr[i] = arr[i-1] + (t0*pr);
                        result.setText(result.getText().toString() + i + " год: " + String.format("%.1f", arr[i])+" сом"  + "\n");
                    }
                    break;
                case 3:
                    for (int i = 1; i <= T; i++) {
                        arr[i] = arr[i-1] + (arr[i-1] * pr);
                        result.setText(result.getText().toString() + i + " год: " + String.format("%.1f", arr[i])+" сом" + "\n");
                    }
                    break;
                case 4:
                    T*=12;
                    pr/=12;
                    double prvstep = Math.pow((1+pr), T);
                    credit = t0*(pr*(prvstep)/(prvstep-1));
                    double raznitsa = credit * T - t0;
                    double vyplsum = t0 + raznitsa;
                            result.setText("Сумма оплаты каждый месяц "+ String.format("%.1f",credit)+ " сом "+
                                    "Выплаченная сумма " + String.format("%.1f",vyplsum) + " сом" +
                                    "\n Разница " + String.format("%.1f",raznitsa) +" сом");

                    break;
                case 5:
                    T = Dobavl;
                    for (int i = 1; i <= T; i++) {
                        arr[i] = arr[i-1] - (arr[i-1] * pr) - dob[i-1];
                        result.setText(result.getText().toString() + i + " год: " + String.format("%.1f", arr[i])+" сом" + "\n");
                    }
                    break;
            }
        }
    }
}