package com.School.Helper;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import com.jjoe64.graphview.GraphView;
import com.jjoe64.graphview.series.DataPoint;
import com.jjoe64.graphview.series.LineGraphSeries;

public class secondaryActivity extends AppCompatActivity {

    LineGraphSeries<DataPoint> series;
    public SeekBar seekBar;
    EditText elem1 ;
    EditText elem2 ;
    EditText elem3 ;
    TextView discr ;
    TextView coren1;
    TextView coren2;
    TextView vershx;
    TextView vershy;
    GraphView graph;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secondary);
        seekBar = (SeekBar) findViewById(R.id.seekBar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener()
        {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                TextView diapaz = (TextView) findViewById(R.id.textView15);
                diapaz.setText("Диапазон в обе стороны: " + String.valueOf(progress));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

    }
  @Override
  protected void onRestoreInstanceState(Bundle savedInstanceState) {
      super.onRestoreInstanceState(savedInstanceState);
      discr = (TextView) findViewById(R.id.textView7);
      coren1 = (TextView) findViewById(R.id.textView8);
      coren2 = (TextView) findViewById(R.id.textView4);
      vershx = (TextView) findViewById(R.id.textView13);
      vershy = (TextView) findViewById(R.id.textView6);
      coren1.setText(savedInstanceState.getString("coren1"));
      coren2.setText(savedInstanceState.getString("coren2"));
      vershx.setText(savedInstanceState.getString("vershx"));
      vershy.setText(savedInstanceState.getString("vershy"));
      discr.setText(savedInstanceState.getString("discr"));

  }

    public void OnButton1Click (View v) {
        elem1 = (EditText) findViewById(R.id.editText);
        elem2 = (EditText) findViewById(R.id.editText2);
        elem3 = (EditText) findViewById(R.id.editText3);
        discr = (TextView) findViewById(R.id.textView7);
        coren1 = (TextView) findViewById(R.id.textView8);
        coren2 = (TextView) findViewById(R.id.textView4);
        vershx = (TextView) findViewById(R.id.textView13);
        vershy = (TextView) findViewById(R.id.textView6);
        graph = (GraphView) findViewById(R.id.graph);
        float a, b, c;
        series = new LineGraphSeries<DataPoint>();
        graph.removeAllSeries();
        graph.addSeries(series);
        graph.getViewport().setScalable(true);
        if (elem1.getText().toString().matches("") || elem2.getText().toString().matches("") ||elem3.getText().toString().matches("")) {
            Toast toast = Toast.makeText(getApplicationContext(),
                    "Введите все числа",
                    Toast.LENGTH_SHORT);
            toast.show();
        } else {
            a = Float.parseFloat(elem1.getText().toString());
            b = Float.parseFloat(elem2.getText().toString());
            c = Float.parseFloat(elem3.getText().toString());
            if (Math.abs(a) > 300 || Math.abs(b) > 300 || Math.abs(c) > 300) {
                Toast toast = Toast.makeText(getApplicationContext(),
                        "Число должно быть от -300 до 300",
                        Toast.LENGTH_SHORT);
                toast.show();
            } else {
                float D = (b * b) - 4 * ((a) * (c));
                double x1 = (-(b) + Math.sqrt(D)) / (2 * (a));
                double x2 = (-(b) - Math.sqrt(D)) / (2 * (a));
                float y0 = -(D) / (4 * a);
                float x0 = -(b) / (2 * a);
                if (D != Math.round(D)) {
                    discr.setText("Дискриминант= " + String.format("%.1f", D));
                } else discr.setText("Дискриминант= " + Math.round(D));
                if (x1 != Math.round(x1)) {
                    coren1.setText("X1= " + String.format("%.3f", x1));
                } else coren1.setText("X1= " + Math.round(x1));
                if (D == 0) {
                    coren2.setText("X2= ---");
                } else
                if (x2 != Math.round(x2)) {
                    coren2.setText("X2= " + String.format("%.3f", x2));
                } else coren2.setText("X2= " + Math.round(x2));
                if (x0 != Math.round(x0)) {
                    vershx.setText("Xo= " + String.format("%.2f", x0));
                } else vershx.setText("Xo= " + Math.round(x0));
                if (y0 != Math.round(y0)) {
                    vershy.setText("Yo= " + String.format("%.2f", y0));
                } else vershy.setText("Yo= " + Math.round(y0));
                double x, y;
                x = -(seekBar.getProgress());
                for (int i = 1; i < (seekBar.getProgress()) * 20; i++) {
                    x = x + 0.1;
                    y = (a * Math.pow(x, 2)) + (b * x) + c;
                    series.appendData(new DataPoint(x, y), true, (seekBar.getProgress()) * 20);
                }
            }
        }
    }
    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        discr = (TextView) findViewById(R.id.textView7);
        coren1 = (TextView) findViewById(R.id.textView8);
        coren2 = (TextView) findViewById(R.id.textView4);
        vershx = (TextView) findViewById(R.id.textView13);
        vershy = (TextView) findViewById(R.id.textView6);
        outState.putString("coren1", coren1.getText().toString());
        outState.putString("coren2", coren2.getText().toString());
        outState.putString("vershx", vershx.getText().toString());
        outState.putString("vershy", vershy.getText().toString());
        outState.putString("discr", discr.getText().toString());
    }
}
