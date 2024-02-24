package com.example.medx.UI

import android.content.Context
import android.os.Build
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.PopupWindow
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.example.medx.R
import com.example.medx.UI.database.postData.ApiUtilities
import com.example.medx.UI.model.postModels.responseModels.ApiResponse
import com.example.medx.UI.model.postModels.MapDataModel
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@RequiresApi(Build.VERSION_CODES.O)
class MapsPopUpWindow(context: Context, disease: String, lat: String, lng: String, creator: String, userToken: String) {

    private val popupView: View =
        LayoutInflater.from(context).inflate(R.layout.maps_popup_window_layout, null)
    private val popupWindow = PopupWindow(
        popupView,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        true
    )


    private val completeButton: Button = popupView.findViewById(R.id.complete_button)

    init {
        completeButton.setOnClickListener {
            addLocation(context, disease, lat, lng, creator, userToken)

            popupWindow.dismiss()
        }
    }

    private fun addLocation(context: Context, disease: String, lat: String, lng: String, creator:String, userToken: String) {
        val mapDataModel = MapDataModel(
            disease,
            lat,
            lng,
            creator
        )
        val call = ApiUtilities.getMapAPIInterface().postData("Bearer $userToken", mapDataModel)
        Log.d("TAG", "addLocation: $userToken")
        call.enqueue(object : Callback<ApiResponse> {
            override fun onResponse(call: Call<ApiResponse>, response: Response<ApiResponse>) {
                if (response.isSuccessful) {
                    Toast.makeText(context, "Successfully added location", Toast.LENGTH_SHORT).show()
                }
                else {
                    Toast.makeText(
                        context,
                        "Unsuccessful response: ${response.code()}",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }

            override fun onFailure(call: Call<ApiResponse>, t: Throwable) {
                Toast.makeText(context, t.message.toString(), Toast.LENGTH_LONG).show()
            }

        })
    }

    fun show(anchorView: View) {
        popupWindow.showAtLocation(anchorView, Gravity.CENTER, 0, 0)
    }
}
