package com.example.medx.UI.database.postData

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiUtilities {
    private var retrofit:Retrofit?=null
    private var retrofitMap:Retrofit?=null
    private var retrofitChat:Retrofit?=null

    var AUTH_BASE_URL = "https://medvita-auth-api.onrender.com/"
    var MAP_BASE_URL = "https://medvita-community-api.onrender.com/"
    var CHAT_BASE_URL = "https://api.openai.com/"

    fun getSignUpAPIInterface() : SignUpApiInterface {
        if(retrofit ==null){
            retrofit =Retrofit.Builder().baseUrl(AUTH_BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofit!!.create(SignUpApiInterface::class.java)
    }
    fun getLoginAPIInterface() : LoginApiInterface {
        if(retrofit ==null){
            retrofit =Retrofit.Builder().baseUrl(AUTH_BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofit!!.create(LoginApiInterface::class.java)
    }

    fun getMapAPIInterface() : MapApiInterface {
        if(retrofitMap ==null){
            retrofitMap =Retrofit.Builder().baseUrl(MAP_BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofitMap!!.create(MapApiInterface::class.java)
    }

    fun getChatAPIInterface() : ChatApiInterface {
        if(retrofitChat ==null){
            retrofitChat =Retrofit.Builder().baseUrl(CHAT_BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofitChat!!.create(ChatApiInterface::class.java)
    }
}