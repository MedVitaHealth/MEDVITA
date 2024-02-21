package com.example.medx.UI.database.getData

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiUtilities {
    private var retrofit: Retrofit?=null
    private var retrofitMap: Retrofit? = null
    var BASE_URL = "https://medvita-auth-api.onrender.com/"
    var MAP_BASE_URL = "https://medvita-community-api.onrender.com/"
    fun getUserAPIInterface():UserApiInterface?{
        if(retrofit==null){
            retrofit=Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofit!!.create(UserApiInterface::class.java)
    }

    fun getMapAPIInterface(): MapApiInterface? {
        if (retrofitMap == null) {
            retrofitMap = Retrofit.Builder().baseUrl(MAP_BASE_URL).addConverterFactory(GsonConverterFactory.create()).build()
        }
        return retrofitMap!!.create(MapApiInterface::class.java)
    }

}