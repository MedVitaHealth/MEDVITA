package com.example.medx.UI.fragments

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.cardview.widget.CardView
import androidx.fragment.app.Fragment
import com.example.medx.R
import com.example.medx.UI.PillsReminderActivity
import com.example.medx.UI.model.getModels.GetUserModel
import com.example.medx.UI.database.getData.ApiUtilities
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class AccountFragment : Fragment() {

    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val view: View = inflater.inflate(R.layout.fragment_account, container, false)

        sharedPreferences = requireActivity().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)

        view.findViewById<CardView>(R.id.pillsReminderBtn).setOnClickListener {
            startActivity(Intent(activity, PillsReminderActivity::class.java))
        }

        val userToken = sharedPreferences.getString("userToken", null)
        val userId = sharedPreferences.getString("userId", null)
        val userEmail = sharedPreferences.getString("userEmail", null)
        val userName = sharedPreferences.getString("userName", null)

//        if (userName == null || userEmail == null) {
//            // If userName or userEmail is not stored, make the API call
//            if (userToken != null && userId != null) {
//                getUserData(userToken, userId)
//            }
//        } else {
//            // If userName and userEmail are already stored, update the UI
//            updateUserUI(userName, userEmail)
//        }
        if (userToken != null && userId != null) {
            getUserData(userToken, userId)
        }

        return view
    }

    private fun getUserData(userToken: String, userId: String) {
        val call = ApiUtilities.getUserAPIInterface()
            ?.getUserData("Bearer ${userToken.toString()}", userId.toString())
        call?.enqueue(object : Callback<GetUserModel> {
            override fun onResponse(call: Call<GetUserModel>, response: Response<GetUserModel>) {
                if (response.isSuccessful) {
                    val user = response.body()?.user
                    val editor = sharedPreferences.edit()
                    editor.putString("userName", user?.name)
                    editor.apply()
                    val userEmail = sharedPreferences.getString("userEmail", null).toString()
                    val userName = sharedPreferences.getString("userName", null).toString()
                    updateUserUI(userName,userEmail)
                } else {
                    Toast.makeText(context,"Response unsuccessful", Toast.LENGTH_SHORT).show()
                }
            }

            override fun onFailure(call: Call<GetUserModel>, t: Throwable) {
                Toast.makeText(context, t.message.toString(), Toast.LENGTH_SHORT).show()
            }
        })
    }

    private fun updateUserUI(userName:String, userEmail:String) {
//        requireActivity().runOnUiThread {
//            Toast.makeText(context, "$userName, $userEmail", Toast.LENGTH_SHORT).show()
        view?.findViewById<TextView>(R.id.name)?.text = userName
        view?.findViewById<TextView>(R.id.email)?.text = userEmail
//    }
    }
}
