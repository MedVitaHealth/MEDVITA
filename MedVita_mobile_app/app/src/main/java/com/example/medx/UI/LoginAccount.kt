package com.example.medx.UI

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.medx.R
import com.example.medx.UI.database.postData.ApiUtilities
import com.example.medx.UI.model.postModels.LoginDataModel
import com.example.medx.UI.model.postModels.responseModels.ApiResponse
import com.example.medx.databinding.ActivityLoginAccountBinding
import com.github.ybq.android.spinkit.SpinKitView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginAccount : AppCompatActivity() {

    private lateinit var binding: ActivityLoginAccountBinding
    var email: String? = ""
    var password: String? = ""
    private lateinit var progressBar:SpinKitView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginAccountBinding.inflate(layoutInflater)
        setContentView(binding.root)

        StatusBarUtil.setStatusBarColor(this, R.color.createAccountStatusBar)
        progressBar = binding.progressBar

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
                progressBar.visibility = View.VISIBLE
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
                        progressBar.visibility = View.INVISIBLE
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
                        startActivity(intent)
                        finish()
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