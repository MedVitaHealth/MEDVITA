package com.example.medx.UI

import android.app.Activity
import android.os.Build
import android.view.View
import android.view.Window
import androidx.annotation.ColorRes
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat

object StatusBarUtil {
    @RequiresApi(Build.VERSION_CODES.M)
    fun setStatusBarColor(activity: Activity, @ColorRes colorResId: Int) {
        val window: Window = activity.window
        window.statusBarColor = ContextCompat.getColor(activity, colorResId)
        window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR
    }
}