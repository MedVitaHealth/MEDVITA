package com.example.medx.UI.database.postData

import com.example.medx.UI.model.postModels.ChatRequestBody
import com.example.medx.UI.model.postModels.responseModels.ChatResponseModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST

interface ChatApiInterface {
    @POST("v1/chat/completions")
    fun postData(
        @Header("Content-Type") type: String,
        @Header("Authorization") token: String,
        @Body chatRequestBody: ChatRequestBody
    ): Call<ChatResponseModel>
}