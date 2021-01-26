package com.School.Helper;

import android.content.Intent;
import android.graphics.Color;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.view.View;
import android.widget.ImageView;
import android.widget.ScrollView;

public class algebra extends AppCompatActivity {
    private FragmentFindSqEq Ffragment;
    private GeometryCalcFrag Gfragment;
    private FragmentManager fm;
    private FragmentTransaction ft;
    private ImageView im1;
    private ImageView im2;
    private CardView card;
    private ScrollView alg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_algebra);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        im1 = findViewById(R.id.img1);
        im2 = findViewById(R.id.img2);
        Gfragment = new GeometryCalcFrag();
        Ffragment = new FragmentFindSqEq();
        alg = findViewById(R.id.algebralayout);
        fm = getSupportFragmentManager();
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (Global.nightmode) {
            alg.setBackgroundColor(Color.parseColor("#303030"));
        } else {
            alg.setBackgroundColor(Color.parseColor("#ffffff"));
        }
    }

    public void OnButton1Click(View v) {
        Intent intent = new Intent(this, secondaryActivity.class);
        startActivity(intent);
    }
    public void OnButton10Click(View v) {
        Intent intent = new Intent(this, FinMath.class);
        startActivity(intent);
    }
    public void OnButton4Click(View v) {
        Intent intent = new Intent(this, GeometrySqeq.class);
        startActivity(intent);
    }
    public void OnClickFr(View view) {
        ft = fm.beginTransaction();
        card = findViewById(R.id.CardView7);
        switch (view.getId()) {
            case R.id.CardView7:
                if (fm.findFragmentByTag(FragmentFindSqEq.Tag) == null) {
                    ft.add(R.id.Container, Ffragment, FragmentFindSqEq.Tag);
                    im1.setImageResource(R.drawable.arrup);
                    card.setCardBackgroundColor(Color.parseColor("#eeeeee"));
                } else if (fm.findFragmentByTag(FragmentFindSqEq.Tag) != null){
                    ft.remove(Ffragment);
                    im1.setImageResource(R.drawable.arrdn);
                    card.setCardBackgroundColor(Color.parseColor("#ffffff"));
                }
                break;
            case R.id.CardView6:
                if (fm.findFragmentByTag(GeometryCalcFrag.Tag) == null) {
                    ft.add(R.id.Container1, Gfragment, GeometryCalcFrag.Tag);
                    im2.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(GeometryCalcFrag.Tag) != null){
                    ft.remove(Gfragment);
                    im2.setImageResource(R.drawable.arrdn);
                }
                break;
        }
        ft.commit();
    }
}
