package com.School.Helper;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ImageView;

import com.github.chrisbanes.photoview.PhotoView;

public class ChemTab extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chem_tab2);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

    }
}
