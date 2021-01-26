package com.School.Helper;

import android.graphics.Color;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class Physics extends AppCompatActivity {
    private Mechanika Physfrag1;
    private Thermdynanamic Physfrag2;
    private electrodynamic Physfrag3;
    private physSTO Physfrag4;
    private LinearLayout Physlayout;
    private FragmentManager fm;
    private FragmentTransaction ft;
    private ImageView im1, im2, im3, im4;
    private CardView card,card2,card3,card4;
    private TextView txt1, txt2, txt3, txt4;
    /*
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        switch (item.getItemId()) {
            case R.id.item1:
                if (!item.isChecked()) {
                    Physlayout.setBackgroundColor(Color.parseColor("#303030"));
                } else {
                    Physlayout.setBackgroundColor(Color.parseColor("#ffffff"));
                }
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }*/
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_physics);
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            Physlayout = findViewById(R.id.layoutphysics);
            Physfrag1 = new Mechanika();
            Physfrag2 = new Thermdynanamic();
            Physfrag3 = new electrodynamic();
            Physfrag4 = new physSTO();
            im1 = findViewById(R.id.img1);
            im2 = findViewById(R.id.img2);
            im3 = findViewById(R.id.img3);
            im4 = findViewById(R.id.img4);
            fm = getSupportFragmentManager();
        }

    @Override
    protected void onStart() {
        super.onStart();
        if (Global.nightmode) {
            Physlayout.setBackgroundColor(Color.parseColor("#303030"));
        } else {
            Physlayout.setBackgroundColor(Color.parseColor("#ffffff"));
        }
    }

    public void OnClickPhysFrag(View view) {
            card = findViewById(R.id.CardView1);
            card2 = findViewById(R.id.CardView2);
            card3 = findViewById(R.id.CardView3);
            card4 = findViewById(R.id.CardView4);
            txt1 = findViewById(R.id.textView24);
            txt2 = findViewById(R.id.textView25);
            txt3 = findViewById(R.id.textView26);
            txt4 = findViewById(R.id.textView27);
            ft = fm.beginTransaction();
            switch (view.getId()) {
                case R.id.CardView1:
                    if (fm.findFragmentByTag(Mechanika.Tag) == null) {
                        ft.add(R.id.container1, Physfrag1, Mechanika.Tag);
                        im1.setImageResource(R.drawable.arrup);
                        card.setCardBackgroundColor(Color.parseColor("#303030"));
                        txt1.setTextColor(Color.parseColor("#ffffff"));
                    } else if (fm.findFragmentByTag(Mechanika.Tag) != null) {
                        im1.setImageResource(R.drawable.arrdn);
                        ft.remove(Physfrag1);
                        card.setCardBackgroundColor(Color.parseColor("#ffffff"));
                        txt1.setTextColor(Color.parseColor("#000000"));
                    }
                    break;
                case R.id.CardView2:
                    if (fm.findFragmentByTag(Thermdynanamic.Tag) == null) {
                        ft.add(R.id.container2, Physfrag2, Thermdynanamic.Tag);
                        im2.setImageResource(R.drawable.arrup);
                        card2.setCardBackgroundColor(Color.parseColor("#303030"));
                        txt2.setTextColor(Color.parseColor("#ffffff"));
                    } else if (fm.findFragmentByTag(Thermdynanamic.Tag) != null) {
                        im2.setImageResource(R.drawable.arrdn);
                        ft.remove(Physfrag2);
                        card2.setCardBackgroundColor(Color.parseColor("#ffffff"));
                        txt2.setTextColor(Color.parseColor("#000000"));
                    }
                    break;
                case R.id.CardView3:
                    if (fm.findFragmentByTag(electrodynamic.Tag) == null) {
                        ft.add(R.id.container3, Physfrag3, electrodynamic.Tag);
                        im3.setImageResource(R.drawable.arrup);
                        card3.setCardBackgroundColor(Color.parseColor("#303030"));
                        txt3.setTextColor(Color.parseColor("#ffffff"));
                    } else if (fm.findFragmentByTag(electrodynamic.Tag) != null) {
                        im3.setImageResource(R.drawable.arrdn);
                        ft.remove(Physfrag3);
                        card3.setCardBackgroundColor(Color.parseColor("#ffffff"));
                        txt3.setTextColor(Color.parseColor("#000000"));
                    }
                    break;
                case R.id.CardView4:
                    if (fm.findFragmentByTag(physSTO.Tag) == null) {
                        ft.add(R.id.container4, Physfrag4, physSTO.Tag);
                        im4.setImageResource(R.drawable.arrup);
                        card4.setCardBackgroundColor(Color.parseColor("#303030"));
                        txt4.setTextColor(Color.parseColor("#ffffff"));
                    } else if (fm.findFragmentByTag(physSTO.Tag) != null){
                        im4.setImageResource(R.drawable.arrdn);
                        ft.remove(Physfrag4);
                        card4.setCardBackgroundColor(Color.parseColor("#ffffff"));
                        txt4.setTextColor(Color.parseColor("#000000"));
                    }
                    break;
            }
            ft.commit();
        }
}
