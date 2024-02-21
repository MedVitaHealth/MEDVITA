package com.example.medx.UI.database.postData

import com.example.medx.UI.model.ApiResponse
import com.example.medx.UI.model.MapDataModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface MapApiInterface {
    @POST("api/maps/add-to-map")
    fun postData(
        @Header("Authorization") token: String,
        @Body mapDataModel: MapDataModel
    ): Call<ApiResponse>
}