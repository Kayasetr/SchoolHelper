package com.School.Helper;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

import static java.lang.StrictMath.cos;
import static java.lang.StrictMath.sin;

public class demonstrActivity extends AppCompatActivity {
    int tag;
    LineGraphSeries<DataPoint> series;
    public SeekBar seekBar2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demonstr);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        RadioGroup radioGroup = (RadioGroup)findViewById(R.id.radioGroup);
        radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                TextView formula = (TextView) findViewById(R.id.textView21);
                switch(checkedId) {
                    case R.id.radioButton:
                        {
                            tag = 1;
                            formula.setText("Формула: Y = kx+b (b=1)");
                        }
                        break;
                    case R.id.radioButton2:
                        {
                            tag = 2;
                            formula.setText("Формула: Y = x^k");
                        }
                        break;
                    case R.id.radioButton3:
                        {
                            tag = 3;
                            formula.setText("Формула: Y = x^2");
                        }
                        break;
                    case R.id.radioButton5:
                        {
                            tag = 4;
                            formula.setText("Формула: Y = k/x");
                        }
                        break;
                    case R.id.radioButton6:
                        {
                            tag = 5;
                            formula.setText("Формула: Y = sin(x)");
                        }
                        break;
                    case R.id.radioButton7:
                        {
                            tag = 6;
                            formula.setText("Формула: Y = cos(x)");
                        }
                        break;
                }
            }
        });
        seekBar2 = (SeekBar) findViewById(R.id.seekBar2);
        seekBar2.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                TextView diapaz2 = (TextView) findViewById(R.id.textView20);
                diapaz2.setText("Диапазон в обе стороны: " + String.valueOf(progress));
            }
            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }
            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
            }
        });
    }
    public void OnButton10Click (View v) {

        EditText koef = (EditText) findViewById(R.id.editText8);
        GraphView graph = (GraphView) findViewById(R.id.graph2);
        if (koef.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите K",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
        series = new LineGraphSeries<DataPoint>();
        graph.removeAllSeries();
        graph.addSeries(series);
        graph.getViewport().setScalable(true);
        double x, y;
        float k = Float.parseFloat(koef.getText().toString());
        x = -(seekBar2.getProgress());
        for (int i = 1; i < (seekBar2.getProgress()) * 20; i++) {
            x = x + 0.1;
            y = 1;
            switch (tag) {
                case 1:
                    y = k*x+1;
                    break;
                case 2:
                    y = Math.pow(x, k);
                    break;
                case 3:
                    y = Math.pow(x, 2);
                    break;
                case 4:
                    y = k/x;
                    break;
                case 5:
                    y = sin(x);
                    break;
                case 6:
                    y = cos(x);
                    break;
                default:
                    break;

            }
            series.appendData(new DataPoint(x, y), true, (seekBar2.getProgress()) * 20);
        }
    }
    }
}
