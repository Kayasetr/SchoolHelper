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

public class Chemistry extends AppCompatActivity {
    private Chemistry1Frag Chem1frag;
    private ChemValent Chemvalent;
    private FragmentManager fm;
    private FragmentTransaction ft;
    private ImageView im1, im2;
    ScrollView chem;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chemistry);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        Chem1frag = new Chemistry1Frag();
        Chemvalent = new ChemValent();
        im1 = findViewById(R.id.img1);
        im2 = findViewById(R.id.img2);
        fm = getSupportFragmentManager();
        chem = findViewById(R.id.chemistrylayout);
    }

    @Override
    protected void onStart() {
        super.onStart();
        if (Global.nightmode) {
            chem.setBackgroundColor(Color.parseColor("#303030"));
        } else {
            chem.setBackgroundColor(Color.parseColor("#ffffff"));
        }
    }

    public void OnClickChemFrag(View view) {
        ft = fm.beginTransaction();
        switch (view.getId()) {
            case R.id.CardView2:
                if (fm.findFragmentByTag(ChemValent.Tag) == null) {
                    ft.add(R.id.container3, Chemvalent, ChemValent.Tag);
                    im1.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(ChemValent.Tag) != null) {
                    im1.setImageResource(R.drawable.arrdn);
                    ft.remove(Chemvalent);
                }
                break;
            case R.id.CardView3:
                if (fm.findFragmentByTag(Chemistry1Frag.Tag) == null) {
                    ft.add(R.id.container, Chem1frag, Chemistry1Frag.Tag);
                    im2.setImageResource(R.drawable.arrup);
                } else if (fm.findFragmentByTag(Chemistry1Frag.Tag) != null) {
                    im2.setImageResource(R.drawable.arrdn);
                    ft.remove(Chem1frag);
                }
                break;
        }
        ft.commit();
    }

    public void OnButton1Click(View v) {
        Intent intent = new Intent(this, ChemTab.class);
        startActivity(intent);
    }

    public void OnButton2Click(View v) {
        Intent intent = new Intent(this, ChemReacEq.class);
        startActivity(intent);
    }

    public void OnButton3Click(View v) {
        Intent intent = new Intent(this, ChemSvoisKisl.class);
        startActivity(intent);
    }

    public void OnButton4Click(View v) {
        Intent intent = new Intent(this, ChemSvoisOsnov.class);
        startActivity(intent);
    }
}

