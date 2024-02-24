package com.example.medx.UI.database.postData

import com.example.medx.UI.model.postModels.responseModels.ApiResponse
import com.example.medx.UI.model.postModels.LoginDataModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface LoginApiInterface {
    @POST("api/auth/login")
    fun postData(
        @Body
        loginDataModel: LoginDataModel
    ): Call<ApiResponse>
}