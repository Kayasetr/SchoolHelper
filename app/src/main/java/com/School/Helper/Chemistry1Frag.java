package com.School.Helper;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class Chemistry1Frag extends Fragment {
    public static final String Tag = "Chem1";
    public WebView wv;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_chemistry1, container, false);
    }

    @Override
    public void onStart() {
        super.onStart();
    wv = (WebView) getView().findViewById(R.id.webView);
        wv.setWebViewClient(new WebViewClient());
        wv.loadUrl("file:///android_asset/kek.html");
        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDefaultTextEncodingName("utf-8");
    }

}
