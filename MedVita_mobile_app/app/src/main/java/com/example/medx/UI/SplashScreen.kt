package com.example.medx.UI

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.Window
import android.view.animation.AnimationUtils
import android.widget.TextView
import com.example.medx.R
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class SplashScreen : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)

        val window: Window = this.window
        window.statusBarColor = this.resources.getColor(R.color.black)

        val textWelcome = findViewById<TextView>(R.id.textWelcome)

        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val userId = sharedPreferences.getString("userId", null)

        CoroutineScope(Dispatchers.Main).launch {
            delay(300)
            textWelcome.visibility = View.VISIBLE
            textWelcome.animation = AnimationUtils.loadAnimation(applicationContext,R.anim.splash_text_anim)
            delay(1900)
            if (userId != null) {
                startActivity(Intent(this@SplashScreen, MainActivity::class.java))
            } else {
                startActivity(Intent(this@SplashScreen, SignUpAccount::class.java))
            }
            finish()
        }
    }
}