package com.example.medx.UI

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.medx.R
import com.example.medx.UI.database.postData.ApiUtilities
import com.example.medx.UI.model.postModels.CreateAccountModel
import com.example.medx.UI.model.postModels.responseModels.ApiResponse
import com.example.medx.databinding.ActivitySignUpAccountBinding
import com.github.ybq.android.spinkit.SpinKitView
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class SignUpAccount : AppCompatActivity() {

    private lateinit var binding:ActivitySignUpAccountBinding
    var email: String? = ""
    var name: String? = ""
    var password: String? = ""
    private lateinit var progressBar: SpinKitView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignUpAccountBinding.inflate(layoutInflater)
        setContentView(binding.root)

        StatusBarUtil.setStatusBarColor(this, R.color.createAccountStatusBar)
        progressBar = binding.progressBar

        binding.loginText.setOnClickListener {
            startActivity(Intent(this, LoginAccount::class.java))
        }

        binding.signUpBtn.setOnClickListener {
            this.name = binding.nameText.text.toString()
            this.email = binding.emailText.text.toString()
            this.password = binding.passwordText.text.toString()
            if (name!!.isEmpty()) {
                Toast.makeText(this, "Enter your name", Toast.LENGTH_SHORT).show()
            } else if (email!!.isEmpty()) {
                Toast.makeText(this, "Enter your email", Toast.LENGTH_SHORT).show()
            } else if (password!!.isEmpty()) {
                Toast.makeText(this, "Enter your password", Toast.LENGTH_SHORT).show()
            } else {
                progressBar.visibility = View.VISIBLE
                updateDatabase()
            }
        }


    }

    private fun updateDatabase() {
        val intent = Intent(this, MainActivity::class.java)
        val createAccountModel = CreateAccountModel(
            name.toString(),
            email.toString(),
            password.toString()
        )
        val call = ApiUtilities.getSignUpAPIInterface().postData(createAccountModel)
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

                        // Proceed with your Intent or any other logic as needed
                        intent.putExtra("email", email)
                        intent.putExtra("name", name)
                        Log.d("TAG", "onResponse: ${response.code()}")
                        Log.d("TAG", "onResponse: ${response.message()}")
                        progressBar.visibility = View.INVISIBLE
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
                        startActivity(intent)
                        finish()
                    } else {
                        Toast.makeText(this@SignUpAccount, "Response body is null", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@SignUpAccount, "Unsuccessful response: ${response.code()}", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<ApiResponse>, t: Throwable) {
                Toast.makeText(this@SignUpAccount, t.message.toString(),Toast.LENGTH_LONG).show()
            }

        })

    }
}