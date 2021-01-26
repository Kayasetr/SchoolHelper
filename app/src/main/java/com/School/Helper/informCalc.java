package com.School.Helper;

import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

public class informCalc extends AppCompatActivity {
    private Inform1Fragment Inf1fragment;
    private Inform2Fragment Inf2fragment;
    private Inform3Fragment Inf3fragment;
    private Inform4Fragment Inf4fragment;
    private FragmentManager fm;
    private FragmentTransaction ft;
    private ImageView im1, im2, im3, im4;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inform_calc);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        im1 = (ImageView) findViewById(R.id.img1);
        im2 = (ImageView) findViewById(R.id.img2);
        im3 = (ImageView) findViewById(R.id.img3);
        im4 = (ImageView) findViewById(R.id.img4);
        Inf1fragment = new Inform1Fragment();
        Inf2fragment = new Inform2Fragment();
        Inf3fragment = new Inform3Fragment();
        Inf4fragment = new Inform4Fragment();
        fm = getSupportFragmentManager();
    }

    public void OnClickInforFrag(View view) {
        ft = fm.beginTransaction();
        switch (view.getId()) {
            case R.id.CardView1:
                if (fm.findFragmentByTag(Inform1Fragment.Tag) == null) {
                    ft.add(R.id.container1, Inf1fragment, Inform1Fragment.Tag);
                    im1.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(Inform1Fragment.Tag) != null){
                    im1.setImageResource(R.drawable.arrdn);
                    ft.remove(Inf1fragment);
                }
                break;
            case R.id.CardView2:
                if (fm.findFragmentByTag(Inform2Fragment.Tag) == null) {
                    ft.add(R.id.container2, Inf2fragment, Inform2Fragment.Tag);
                    im2.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(Inform2Fragment.Tag) != null){
                    im2.setImageResource(R.drawable.arrdn);
                    ft.remove(Inf2fragment);
                }
                break;
            case R.id.CardView3:
                if (fm.findFragmentByTag(Inform3Fragment.Tag) == null) {
                    ft.add(R.id.container3, Inf3fragment, Inform3Fragment.Tag);
                    im3.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(Inform3Fragment.Tag) != null){
                    im3.setImageResource(R.drawable.arrdn);
                    ft.remove(Inf3fragment);
                }
                break;
            case R.id.CardView4:
                if (fm.findFragmentByTag(Inform4Fragment.Tag) == null) {
                    ft.add(R.id.container4, Inf4fragment, Inform4Fragment.Tag);
                    im4.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(Inform4Fragment.Tag) != null){
                    im4.setImageResource(R.drawable.arrdn);
                    ft.remove(Inf4fragment);
                }
                break;
        }
        ft.commit();
    }
}
