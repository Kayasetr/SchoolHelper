package com.School.Helper;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ScrollView;



public class MainActivity extends AppCompatActivity {


    ScrollView mainlayout;
    CardView card1, card2, card3, card4, card5, card6;
    SharedPreferences sPref;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        Global.nightmode = false;
        mainlayout = findViewById(R.id.Layout_main);
        card1 = findViewById(R.id.CardView1);
        card2 = findViewById(R.id.CardView2);
        card3 = findViewById(R.id.CardView3);
        card4 = findViewById(R.id.CardView4);
        card5 = findViewById(R.id.CardView5);
        card6 = findViewById(R.id.CardView6);
    }
    @Override
    protected void onStart() {
        super.onStart();
        loadText();
        if (Global.nightmode) {
            mainlayout.setBackgroundColor(Color.parseColor("#303030"));
            card1.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
            card2.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
            card3.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
            card4.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
            card5.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
            card6.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
        } else {
            mainlayout.setBackgroundColor(Color.parseColor("#ffffff"));
            card1.setCardBackgroundColor(Color.parseColor("#ffffff"));
            card2.setCardBackgroundColor(Color.parseColor("#ffffff"));
            card3.setCardBackgroundColor(Color.parseColor("#ffffff"));
            card4.setCardBackgroundColor(Color.parseColor("#ffffff"));
            card5.setCardBackgroundColor(Color.parseColor("#ffffff"));
            card6.setCardBackgroundColor(Color.parseColor("#ffffff"));
        }

    }

  @Override
  public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.item1:
                if (!Global.nightmode) {
                    Global.nightmode = true;
                    item.setChecked(true);
                    mainlayout.setBackgroundColor(Color.parseColor("#303030"));
                    card1.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
                    card2.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
                    card3.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
                    card4.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
                    card5.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
                    card6.setCardBackgroundColor(Color.parseColor("#a3a3a3"));
                } else {
                    Global.nightmode = false;
                    item.setChecked(false);
                    mainlayout.setBackgroundColor(Color.parseColor("#ffffff"));
                    card1.setCardBackgroundColor(Color.parseColor("#ffffff"));
                    card2.setCardBackgroundColor(Color.parseColor("#ffffff"));
                    card3.setCardBackgroundColor(Color.parseColor("#ffffff"));
                    card4.setCardBackgroundColor(Color.parseColor("#ffffff"));
                    card5.setCardBackgroundColor(Color.parseColor("#ffffff"));
                    card6.setCardBackgroundColor(Color.parseColor("#ffffff"));
                }

                return true;
            case R.id.item2:
                finish();
            default:
                return super.onOptionsItemSelected(item);
        }
     }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        saveText();
    }

    public void OnButton1Click(View v) {
        Intent intent = new Intent(this, Informatics.class);
        startActivity(intent);
    }
    public void OnButton2Click(View v) {
        Intent intent = new Intent(this, GeometryActivity.class);
        startActivity(intent);
    }
    public void OnButton3Click(View v) {
        Intent intent = new Intent(this, Chemistry.class);
        startActivity(intent);
    }
    public void OnButton4Click(View v) {
        Intent intent = new Intent(this, algebra.class);
        startActivity(intent);
    }
    public void OnButton5Click(View v) {
        Intent intent = new Intent(this, Physics.class);
        startActivity(intent);
    }
    public void OnButton6Click(View v) {
        Intent intent = new Intent(this, AvnActivity.class);
        startActivity(intent);
    }
    public void OnButtonProverka(View v) {
        Intent intent = new Intent(this, PROVERKA.class);
        startActivity(intent);
    }
    public void OnButtonMaps(View v) {
        Intent intent = new Intent(this, MapsActivity.class);
        startActivity(intent);
    }
    void saveText() {
        sPref = getPreferences(MODE_PRIVATE);
        SharedPreferences.Editor ed = sPref.edit();
        ed.putBoolean("nightmode", Global.nightmode);
        ed.commit();
    }

    void loadText() {
        sPref = getPreferences(MODE_PRIVATE);
        Boolean nghtmd = sPref.getBoolean("nightmode", Global.nightmode);
        Global.nightmode = nghtmd;
    }
}


