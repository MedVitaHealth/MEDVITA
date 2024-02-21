package com.example.medx.UI

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.Window
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import com.example.medx.R
import com.example.medx.databinding.ActivityMainBinding
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.example.medx.UI.database.getData.ApiUtilities
import com.example.medx.UI.model.GetUserModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var drawerLayout: DrawerLayout
    lateinit var mGoogleSignInClient: GoogleSignInClient
    private lateinit var sharedPreferences: SharedPreferences

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        StatusBarUtil.setStatusBarColor(this, R.color.mainColor)

        sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)

        val userToken = sharedPreferences.getString("userToken", null)
        val userId = sharedPreferences.getString("userId", null)
        val userEmail = sharedPreferences.getString("userEmail", null)
        val userName = sharedPreferences.getString("userName", null)

//        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
//            .requestIdToken(getString(123))
//            .requestEmail()
//            .build()
//        mGoogleSignInClient = GoogleSignIn.getClient(this, gso)

        val bottomNavigationView = findViewById<BottomNavigationView>(R.id.nav_view)
        val navController = findNavController(R.id.fragmentContainerView2)
        bottomNavigationView.setupWithNavController(navController)

        binding.profileImg.setOnClickListener {
            drawerLayout.openDrawer(GravityCompat.START)
        }

        drawerLayout = binding.container
        val navView1: NavigationView = binding.navViewMenu
        val headerView = navView1.getHeaderView(0)
        val nameTextView = headerView.findViewById<TextView>(R.id.name)
        val emailTextView = headerView.findViewById<TextView>(R.id.email)
        if (userToken != null && userId != null) {
            getUserData(userToken, userId,nameTextView,emailTextView)
        }

        navView1.setNavigationItemSelectedListener {
            when (it.itemId) {
                R.id.about_us -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }

                R.id.online_pharmacy -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }

                R.id.home_nursing_care -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }

                R.id.elderly_care -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }

                R.id.lab_collection -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }

                R.id.all_services -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }
                R.id.logout -> {
                    logout()
                }
                R.id.share_app -> {
                    Toast.makeText(this@MainActivity, "Not yet implemented", Toast.LENGTH_SHORT)
                        .show()
                }
            }
            true
        }

    }

    private fun getUserData(userToken: String, userId: String, nameTextView: TextView?, emailTextView: TextView?) {
        val call = ApiUtilities.getUserAPIInterface()?.getUserData("Bearer ${userToken.toString()}", userId.toString())
        call?.enqueue(object : Callback<GetUserModel> {
            override fun onResponse(call: Call<GetUserModel>, response: Response<GetUserModel>) {
                if (response.isSuccessful) {
                    val user = response.body()?.user
                    val editor = sharedPreferences.edit()
                    editor.putString("userName", user?.name)
                    editor.apply()
                    val userEmail = sharedPreferences.getString("userEmail", null).toString()
                    val userName = sharedPreferences.getString("userName", null).toString()
                    updateUserUI(userName,userEmail, nameTextView, emailTextView)
                } else {
                    Toast.makeText(this@MainActivity,"Response unsuccessful", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<GetUserModel>, t: Throwable) {
                Toast.makeText(this@MainActivity, t.message.toString(), Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun updateUserUI(userName: String, userEmail: String, nameTextView: TextView?, emailTextView: TextView?) {
        nameTextView?.text = userName
        emailTextView?.text = userEmail
    }

    private fun logout() {

        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val editor = sharedPreferences.edit()

        editor.remove("userId")
        editor.remove("userEmail")
        editor.remove("userToken")
        editor.apply()

        val intent = Intent(this, LoginAccount::class.java)
        startActivity(intent)
        finish()
    }

}