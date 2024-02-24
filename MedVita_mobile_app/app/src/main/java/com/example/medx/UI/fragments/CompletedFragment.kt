package com.example.medx.UI.fragments

import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.medx.R
import com.example.medx.UI.VaccinationInfoActivity
import com.example.medx.UI.adapter.CompletedVaccinationAdapter
import com.example.medx.UI.model.VaccinationModel
import com.example.medx.UI.services.VaccinationManager

class CompletedFragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: CompletedVaccinationAdapter
    private lateinit var userId: String

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?,
                              savedInstanceState: Bundle?): View? {
        val view = inflater.inflate(R.layout.fragment_vaccination_list, container, false)

        recyclerView = view.findViewById(R.id.recycler_view)
        recyclerView.layoutManager = LinearLayoutManager(context)

        val sharedPreferences = requireActivity().getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
        userId = sharedPreferences.getString("userId", null).toString()

        VaccinationManager.getCompletedVaccinations(userId) { vaccinations ->
            adapter.submitList(vaccinations)
        }


        adapter = CompletedVaccinationAdapter{ vaccination ->
            openActivity(vaccination)
        }
        recyclerView.adapter = adapter

        return view
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onResume() {
        super.onResume()
        recyclerView.adapter = adapter
        VaccinationManager.getCompletedVaccinations(userId) { vaccinations ->
            adapter.submitList(vaccinations)
        }
    }
    @RequiresApi(Build.VERSION_CODES.O)
    private fun openActivity(vaccination: VaccinationModel) {
        startActivity(Intent(activity, VaccinationInfoActivity::class.java))
    }
}
