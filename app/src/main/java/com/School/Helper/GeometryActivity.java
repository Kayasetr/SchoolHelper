package com.School.Helper;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.ScrollView;

public class GeometryActivity extends AppCompatActivity {
    private FragmentFindSqEq Ffragment;
    private GeometryCalcFrag Gfragment;
    private FragmentManager fm;
    private FragmentTransaction ft;
    private ImageView im1, im2;
    ScrollView geom;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_geometry);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        im1 = findViewById(R.id.img1);
        im2 = findViewById(R.id.img2);
        Gfragment = new GeometryCalcFrag();
        Ffragment = new FragmentFindSqEq();
        fm = getSupportFragmentManager();
        geom = findViewById(R.id.geometrylayout);

    }

    @Override
    protected void onStart() {
        super.onStart();
        if (Global.nightmode) {
            geom.setBackgroundColor(Color.parseColor("#303030"));
        } else {
            geom.setBackgroundColor(Color.parseColor("#ffffff"));
        }
    }
    public void OnButton9Click(View v) {
        Intent intent = new Intent(this, demonstrActivity.class);
        startActivity(intent);
    }
    public void OnButton7Click(View v) {
        Intent intent = new Intent(this, GeometryFigures3d.class);
        startActivity(intent);
    }
    public void OnButton6Click(View v) {
        Intent intent = new Intent(this, Geometryfigures2d.class);
        startActivity(intent);
    }
    public void OnClickFr(View view) {
        ft = fm.beginTransaction();
        switch (view.getId()) {
            case R.id.CardView7:
                if (fm.findFragmentByTag(FragmentFindSqEq.Tag) == null) {
                    ft.add(R.id.Container, Ffragment, FragmentFindSqEq.Tag);
                    im1.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(FragmentFindSqEq.Tag) != null){
                    ft.remove(Ffragment);
                    im1.setImageResource(R.drawable.arrdn);
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
