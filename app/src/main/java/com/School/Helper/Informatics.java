package com.School.Helper;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.ScrollView;

public class Informatics extends AppCompatActivity {

    ScrollView inf;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_informatics);
        inf = findViewById(R.id.informaticslayout);
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (Global.nightmode) {
            inf.setBackgroundColor(Color.parseColor("#303030"));
        } else {
            inf.setBackgroundColor(Color.parseColor("#ffffff"));
        }
    }

    public void OnButton1Click(View v) {
        Intent intent = new Intent(this, informCompSostav.class);
        startActivity(intent);
    }
    public void OnButton2Click(View v) {
        Intent intent = new Intent(this, informCalc.class);
        startActivity(intent);
    }
    public void OnButton3Click(View v) {
        Intent intent = new Intent(this, InformPreobrChisla.class);
        startActivity(intent);
    }


}
