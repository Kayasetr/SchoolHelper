package com.School.Helper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;


public class ChemValent extends Fragment {
    public ImageView Img;
    public static final String Tag = "Chem1";

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_chem_valent, container, false);
    }
    @Override
    public void onStart() {
        super.onStart();
        Img = (ImageView) getView().findViewById(R.id.imageView);
        Img.setImageResource(R.drawable.valentnost);
    }

}
