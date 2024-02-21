package com.example.medx.UI.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.example.medx.R
import com.example.medx.UI.ImmunizationActivity
import com.example.medx.UI.ImmunizationStartActivity
import com.example.medx.UI.MapsActivity
import com.example.medx.UI.MenstruationStartActivity
import com.google.firebase.database.FirebaseDatabase

class HomeFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view : View =  inflater.inflate(R.layout.fragment_home, container, false)
        view.findViewById<CardView>(R.id.diseaseRadar).setOnClickListener {
            startActivity(Intent(activity, MapsActivity::class.java))
        }
        view.findViewById<CardView>(R.id.menstruation).setOnClickListener {
            startActivity(Intent(activity, MenstruationStartActivity::class.java))
        }
        val sharedPreferences = requireActivity().getSharedPreferences("MyPrefs", AppCompatActivity.MODE_PRIVATE)
        val flag = sharedPreferences.getString("FLAG_IMMUNIZATION_START", null)
        val birthDate = sharedPreferences.getString("BIRTH_DATE", null)
        view.findViewById<CardView>(R.id.immunization).setOnClickListener {
            if(flag == null && birthDate == null) {
                startActivity(Intent(activity, ImmunizationStartActivity::class.java))
            }
            else
                startActivity(Intent(activity, ImmunizationActivity::class.java))
        }
        return view

    }
}