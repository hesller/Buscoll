package com.buscoll;

import android.os.Bundle;
import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;
import com.microsoft.appcenter.distribute.Distribute;

import com.facebook.react.ReactActivity;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AppCenter.start(getApplication(), "3bd75f7c-e97b-469d-8240-ed9bf3e710bd",
                Analytics.class, Crashes.class, Distribute.class);
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    
    @Override
    protected String getMainComponentName() {
        return "buscouVersion015";
    }
}
