package com.example.medx.UI

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.medx.R
import android.content.Intent
import android.os.Build
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.example.medx.UI.database.postData.ApiUtilities
import com.example.medx.UI.model.ApiResponse
import com.example.medx.UI.model.LoginDataModel
import com.example.medx.databinding.ActivityLoginAccountBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginAccount : AppCompatActivity() {

    private lateinit var binding: ActivityLoginAccountBinding
    var email: String? = ""
    var password: String? = ""

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginAccountBinding.inflate(layoutInflater)
        setContentView(binding.root)

        StatusBarUtil.setStatusBarColor(this, R.color.createAccountStatusBar)

        binding.signUpText.setOnClickListener {
            finish()
        }

        binding.logIn.setOnClickListener {
            this.email = binding.emailText.text.toString()
            this.password = binding.passwordText.text.toString()
            if (email!!.isEmpty()) {
                Toast.makeText(this, "Enter your email", Toast.LENGTH_SHORT).show()
            } else if (password!!.isEmpty()) {
                Toast.makeText(this, "Enter your password", Toast.LENGTH_SHORT).show()
            } else {
                logIn()
            }
        }

    }

    private fun logIn() {
        val intent = Intent(this, MainActivity::class.java)
        val loginDataModel = LoginDataModel(
            email.toString(),
            password.toString()
        )
        val call = ApiUtilities.getLoginAPIInterface().postData(loginDataModel)
        call.enqueue(object : Callback<ApiResponse> {
            override fun onResponse(call: Call<ApiResponse>, response: Response<ApiResponse>) {
                if (response.isSuccessful) {
                    val responseBody = response.body()
                    if (responseBody != null) {
                        val userId = responseBody.userId
                        val userEmail = responseBody.email
                        val userToken = responseBody.token

                        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
                        val editor = sharedPreferences.edit()
                        editor.putString("userId", userId)
                        editor.putString("userEmail", userEmail)
                        editor.putString("userToken", userToken)
                        editor.apply()
                        startActivity(intent)
                    } else {
                        Toast.makeText(this@LoginAccount, "Response body is null", Toast.LENGTH_LONG).show()
                    }
                } else {
                    if(response.code()==403)
                        Toast.makeText(this@LoginAccount, "Wrong Password", Toast.LENGTH_SHORT).show()
                    else
                        Toast.makeText(this@LoginAccount, "Unsuccessful response: ${response.code()}", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<ApiResponse>, t: Throwable) {
                Toast.makeText(this@LoginAccount, t.message.toString(),Toast.LENGTH_LONG).show()
            }

        })
    }
}