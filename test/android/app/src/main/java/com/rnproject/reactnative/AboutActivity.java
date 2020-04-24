package com.rnproject.reactnative;

import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.cib.library.sp.SPEncryptedUtils;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.view.SimpleDraweeView;
import com.rnproject.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class AboutActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_about);
        LinearLayout back = (LinearLayout) findViewById(R.id.setting_back_ll);
        String appid = getIntent().getStringExtra("appid");
        String weapps = SPEncryptedUtils.getInstance(this).getDecryptedData("weapps");

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        try {
            JSONArray object = new JSONArray(weapps);
            int length = object.length();
            for (int i = 0; i < length; i++) {
                JSONObject o = (JSONObject) object.get(i);
                JSONArray minfos = o.getJSONArray("minfos");
                for (int i1 = 0; i1 < minfos.length(); i1++) {
                    JSONObject jsonObject = minfos.getJSONObject(i1);
                    String appid1 = jsonObject.getString("appid");
                    if (appid.equalsIgnoreCase(appid1)) {
                        SimpleDraweeView imageView = (SimpleDraweeView) findViewById(R.id.icon_view);
                        //"yytb"
                        Fresco.initialize(this);
                        imageView.setImageURI(Uri.parse(jsonObject.getString("yytb")));
                        TextView nameView = (TextView) findViewById(R.id.name_view);
                        TextView descriptionView = (TextView) findViewById(R.id.description_view);
                        nameView.setText(jsonObject.getString("yymc"));
                        descriptionView.setText(jsonObject.getString("yyms"));
                        break;
                    }

                }

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }
}
