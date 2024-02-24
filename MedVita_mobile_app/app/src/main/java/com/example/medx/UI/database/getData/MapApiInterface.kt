package com.example.medx.UI.database.getData

import com.example.medx.UI.model.getModels.DiseaseLocationResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface MapApiInterface {
    @GET("/api/maps/get-disease-locations/{disease}")
    fun getDiseaseLocations(
        @Path("disease") disease: String
    ): Call<DiseaseLocationResponse>
}