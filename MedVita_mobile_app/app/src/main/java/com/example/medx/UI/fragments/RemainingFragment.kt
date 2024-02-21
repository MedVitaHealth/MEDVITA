package com.example.medx.UI.fragments

import android.content.Context
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.medx.R
import com.example.medx.UI.VaccinationPopupWindow
import com.example.medx.UI.adapter.RemainingVaccinationAdapter
import com.example.medx.UI.model.VaccinationModel
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import java.time.LocalDate
import java.time.format.DateTimeFormatter

class RemainingFragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: RemainingVaccinationAdapter
    private lateinit var userId: String

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_vaccination_list, container, false)

        recyclerView = view.findViewById(R.id.recycler_view)
        recyclerView.layoutManager = LinearLayoutManager(context)

        val sharedPreferences = requireActivity().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        userId = sharedPreferences.getString("userId", null).toString()

        val childName = sharedPreferences.getString("CHILD_NAME", null).toString()
        val birthDate = sharedPreferences.getString("BIRTH_DATE", null)
        val flag = sharedPreferences.getString("FLAG", null)
        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
        val localDate = LocalDate.parse(birthDate, formatter)

        val remainingVaccinationsRef = FirebaseDatabase.getInstance().reference
            .child("users").child(userId).child("remainingVaccinations")

        remainingVaccinationsRef.addListenerForSingleValueEvent(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                if (snapshot.exists()) {
                    //If user already had a remaining vaccination list, don't create a new one
                    VaccinationManager.getRemainingVaccinations(userId) { vaccinations ->
                        adapter.submitList(vaccinations)
                    }

                    adapter = RemainingVaccinationAdapter { vaccination ->
                        showPopupWindow(localDate, vaccination)
                    }
                    recyclerView.adapter = adapter
                } else {
                    //create a new vaccination list
                    if(flag == null){
                        VaccinationManager.initializeVaccinations(userId,localDate,childName)
                        val editor = sharedPreferences.edit()
                        editor.putString("FLAG", "DONE")
                        editor.apply()
                    }
                }
            }

            override fun onCancelled(error: DatabaseError) {
                // Handle error
            }
        })

//        if(flag == null){
//            VaccinationManager.initializeVaccinations(userId,localDate,childName)
//            val editor = sharedPreferences.edit()
//            editor.putString("FLAG", "DONE")
//            editor.apply()
//        }

//        VaccinationManager.getRemainingVaccinations(userId) { vaccinations ->
//            adapter.submitList(vaccinations)
//        }
//
//        adapter = RemainingVaccinationAdapter { vaccination ->
//            showPopupWindow(localDate, vaccination)
//        }
//        recyclerView.adapter = adapter


        return view
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun showPopupWindow(birthDate:LocalDate, vaccination: VaccinationModel) {
        val popupWindow = VaccinationPopupWindow(requireContext(), birthDate) { selectedDate ->
            VaccinationManager.completeVaccination(userId, vaccination, selectedDate)

            VaccinationManager.getRemainingVaccinations(userId) { vaccinations ->
                adapter.submitList(vaccinations)
            }
        }

        popupWindow.show(requireView())
    }
}
