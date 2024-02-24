package com.example.medx.UI.database.getData

import com.example.medx.UI.model.getModels.GetUserModel
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface UserApiInterface {
    @GET("/api/auth/get_user/{userId}")
    fun getUserData(
        @Header("Authorization") bearerToken: String,
        @Path("userId") userId: String
    ): Call<GetUserModel>
}
