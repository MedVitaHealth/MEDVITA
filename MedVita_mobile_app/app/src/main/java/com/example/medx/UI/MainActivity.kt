package com.example.medx.UI

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatDelegate
import androidx.core.view.GravityCompat
import androidx.drawerlayout.widget.DrawerLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.example.medx.R
import com.example.medx.databinding.ActivityMainBinding
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.example.medx.UI.database.getData.ApiUtilities
import com.example.medx.UI.fragments.AccountFragment
import com.example.medx.UI.fragments.CartFragment
import com.example.medx.UI.fragments.ChatFragment
import com.example.medx.UI.fragments.HomeFragment
import com.example.medx.UI.model.getModels.GetUserModel
import com.ismaeldivita.chipnavigation.ChipNavigationBar
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var drawerLayout: DrawerLayout
    private var isHomeFragmentVisible = false
    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
        StatusBarUtil.setStatusBarColor(this, R.color.mainColor)

        val bottomNavigationView = binding.navView
        if (savedInstanceState == null) {
            // If the activity is newly created, replace the fragment with HomeFragment
            replaceFragment(HomeFragment())
            bottomNavigationView.setItemSelected(R.id.homeFragment2)
            isHomeFragmentVisible = true
        }


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

        bottomNavigationView.setOnItemSelectedListener { itemId ->
            when (itemId) {
                R.id.homeFragment2 -> {
                    replaceFragment(HomeFragment()) // Replace with your actual HomeFragment class
                    isHomeFragmentVisible = true
                }
                R.id.cartFragment -> {
                    replaceFragment(CartFragment()) // Replace with your actual CartFragment class
                    isHomeFragmentVisible = false
                }
                R.id.chatFragment -> {
                    replaceFragment(ChatFragment()) // Replace with your actual ChatFragment class
                    isHomeFragmentVisible = false
                }
                R.id.accountFragment -> {
                    replaceFragment(AccountFragment()) // Replace with your actual AccountFragment class
                    isHomeFragmentVisible = false
                }
            }
        }

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

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (isHomeFragmentVisible) {
            // If HomeFragment is currently visible, close the app entirely
            finish()
            super.onBackPressed()
        } else {
            // If not, go back to HomeFragment
            replaceFragment(HomeFragment())
            isHomeFragmentVisible = true
            binding.navView.setItemSelected(R.id.homeFragment2)
        }
    }

    private fun replaceFragment(fragment: Fragment) {
        supportFragmentManager.popBackStack(null, FragmentManager.POP_BACK_STACK_INCLUSIVE)
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainerView2, fragment) // Replace with the ID of your fragment container
            .addToBackStack(null)
            .commit()
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