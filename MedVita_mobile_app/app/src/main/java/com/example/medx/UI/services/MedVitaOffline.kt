package com.example.medx.UI.services

import android.app.Application
import com.google.firebase.database.ktx.database
import com.google.firebase.ktx.Firebase

class MedVitaOffline : Application() {

    override fun onCreate() {
        super.onCreate()
        Firebase.database.setPersistenceEnabled(true)
        val userRef = Firebase.database.getReference("users")
        userRef.keepSynced(true)
    }
}