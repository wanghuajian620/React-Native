package com.rnproject.base;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import androidx.annotation.LayoutRes;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.rnproject.R;

import java.util.HashMap;

public class BaseActivity extends AppCompatActivity {

    private HashMap viewHash;

    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setContentView(R.layout.activity_main_base);
    }

    public final void initView(@LayoutRes int layoutResID) {
        View view = this.getLayoutInflater().inflate(layoutResID, (ViewGroup)null);
        ((RelativeLayout)this.findCachedViewById(R.id.activity_main_child_view)).addView(view);
    }

    public View findCachedViewById(int var1) {
        if (this.viewHash == null) {
            this.viewHash = new HashMap();
        }

        View var2 = (View)this.viewHash.get(var1);
        if (var2 == null) {
            var2 = this.findViewById(var1);
            this.viewHash.put(var1, var2);
        }

        return var2;
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (viewHash != null && viewHash.size() > 0){
            viewHash.clear();
            viewHash = null;
        }
    }
}
