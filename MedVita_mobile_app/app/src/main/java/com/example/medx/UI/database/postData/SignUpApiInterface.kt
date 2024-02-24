package com.example.medx.UI.database.postData

import com.example.medx.UI.model.postModels.responseModels.ApiResponse
import com.example.medx.UI.model.postModels.CreateAccountModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface SignUpApiInterface {
    @POST("api/auth/signup")
    fun postData(
        @Body
        createAccountModel: CreateAccountModel
    ): Call<ApiResponse>
}