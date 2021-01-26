package com.School.Helper;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;


public class ChemReacEq extends AppCompatActivity {
    public WebView wv;
    public ProgressBar pbar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chem_reac_eq);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    @Override
    public void onBackPressed() {
        if (wv.canGoBack()){
            wv.goBack();
        } else {
            super.onBackPressed();
        }
    }

    public void onStart() {
        super.onStart();
        wv = findViewById(R.id.webView);
        pbar = findViewById(R.id.progressBar);
        wv.loadUrl("http://chemequations.com/ru/");
        wv.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                wv.setVisibility(WebView.GONE);
                pbar.setVisibility(ProgressBar.VISIBLE);

            }

            @Override
            public void onLoadResource(WebView view, String url) {
                super.onLoadResource(view, url);
                wv.loadUrl("javascript:(function() { " +
                        "document.getElementsByClassName('kontejner container-fluid')[0].style.display='none'; })()");
                wv.loadUrl("javascript:(function() { " +
                        "document.getElementsByClassName('nad-carou kontejner')[0].style.display='none'; })()");
            }
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
               wv.setVisibility(WebView.VISIBLE);
                pbar.setVisibility(ProgressBar.GONE);
            }
        });
        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDefaultTextEncodingName("utf-8");
    }
}
