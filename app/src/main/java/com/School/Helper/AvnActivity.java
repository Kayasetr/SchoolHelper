package com.School.Helper;

import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

public class AvnActivity extends AppCompatActivity {
    public WebView wv;
    public ProgressBar pbar;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_avn);
        wv = findViewById(R.id.webView);
        pbar = findViewById(R.id.progressBar);
        wv.loadUrl("http://avn.knu.kg/AVN_search_st.html");
    }
    public void onStart() {
        super.onStart();
        wv.setVisibility(WebView.GONE);
        pbar.setVisibility(ProgressBar.VISIBLE);
        wv.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);

            }
            @Override
            public void onLoadResource(WebView view, String url) {
                super.onLoadResource(view, url);
                wv.loadUrl("javascript:(function() { document.forms[0].submit();})()");
            }
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                wv.setVisibility(WebView.VISIBLE);
                pbar.setVisibility(ProgressBar.GONE);
                //wv.loadUrl("javascript:(function() { document.forms[0].submit();})()");
            }
        });
        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDefaultTextEncodingName("utf-8");
    }
    @Override
    public void onBackPressed() {
        super.onBackPressed();
        if (wv.canGoBack()){
            wv.goBack();
        } else {
            super.onBackPressed();
        }
    }

}
