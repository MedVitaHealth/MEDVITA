package com.example.medx.UI.services

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.example.medx.UI.model.VaccinationModel
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import java.time.LocalDate
import java.time.DayOfWeek
import java.time.temporal.TemporalAdjusters

@RequiresApi(Build.VERSION_CODES.O)
class VaccinationManager {

    companion object {
        private lateinit var remainingVaccinations: MutableList<VaccinationModel>
        private lateinit var completedVaccinations: MutableList<VaccinationModel>

        @RequiresApi(Build.VERSION_CODES.O)
        fun initializeVaccinations(userId: String, birthDate: LocalDate, childName: String) {
            if (!Companion::remainingVaccinations.isInitialized) {
                remainingVaccinations = mutableListOf(
                    VaccinationModel("VID1", "BCG", birthDate),
                    VaccinationModel("VID2", "Hep B1", birthDate),
                    VaccinationModel("VID3", "OPV", birthDate),
                    VaccinationModel("VID4", "DTwP/DTaP1", birthDate.plusWeeks(6)),
                    VaccinationModel("VID5", "Hib-1", birthDate.plusWeeks(6)),
                    VaccinationModel("VID6", "IPV-1", birthDate.plusWeeks(6)),
                    VaccinationModel("VID7", "Hep B2", birthDate.plusWeeks(6)),
                    VaccinationModel("VID8", "PCV 1", birthDate.plusWeeks(6)),
                    VaccinationModel("VID9", "Rota-1", birthDate.plusWeeks(6)),
                    VaccinationModel("VID10", "DTwP/DTaP2", birthDate.plusWeeks(10)),
                    VaccinationModel("VID11", "Hib-2", birthDate.plusWeeks(10)),
                    VaccinationModel("VID12", "IPV-2", birthDate.plusWeeks(10)),
                    VaccinationModel("VID13", "Hep B3", birthDate.plusWeeks(10)),
                    VaccinationModel("VID14", "PCV 2", birthDate.plusWeeks(10)),
                    VaccinationModel("VID15", "Rota-2", birthDate.plusWeeks(10)),
                    VaccinationModel("VID16", "DTwP/DTaP3", birthDate.plusWeeks(14)),
                    VaccinationModel("VID17", "Hib-3", birthDate.plusWeeks(14)),
                    VaccinationModel("VID18", "IPV-3", birthDate.plusWeeks(14)),
                    VaccinationModel("VID19", "Hep B4", birthDate.plusWeeks(14)),
                    VaccinationModel("VID20", "PCV 3", birthDate.plusWeeks(14)),
                    VaccinationModel("VID21", "Rota-3", birthDate.plusWeeks(14)),
                    VaccinationModel("VID22", "Influenza-1", birthDate.plusMonths(6)),
                    VaccinationModel("VID23", "Influenza-2", birthDate.plusMonths(7)),
                    VaccinationModel("VID24", "Typhoid Conjugate Vaccine", birthDate.plusMonths(6).with(TemporalAdjusters.firstInMonth(DayOfWeek.MONDAY))),
                    VaccinationModel("VID25", "MMR 1", birthDate.plusMonths(9)),
                    VaccinationModel("VID26", "Hepatitis A-1", birthDate.plusMonths(12)),
                    VaccinationModel("VID27", "PCV Booster", birthDate.plusMonths(15)),
                    VaccinationModel("VID28", "MMR 2", birthDate.plusMonths(15)),
                    VaccinationModel("VID29", "Varicella", birthDate.plusMonths(15)),
                    VaccinationModel("VID30", "DTwP/DTaP Booster", birthDate.plusMonths(18)),
                    VaccinationModel("VID31", "Hib Booster", birthDate.plusMonths(18)),
                    VaccinationModel("VID32", "IPV Booster", birthDate.plusMonths(18)),
                    VaccinationModel("VID33", "Hepatitis A-2", birthDate.plusMonths(19)),
                    VaccinationModel("VID34", "Varicella 2", birthDate.plusMonths(19)),
                    VaccinationModel("VID35", "Annual Influenza Vaccine", birthDate.plusYears(2)),
                    VaccinationModel("VID36", "Annual Influenza Vaccine", birthDate.plusYears(3)),
                    VaccinationModel("VID37", "DTwP/DTaP", birthDate.plusYears(4)),
                    VaccinationModel("VID38", "IPV", birthDate.plusYears(4)),
                    VaccinationModel("VID39", "MMR 3", birthDate.plusYears(4)),
                    VaccinationModel("VID40", "Annual Influenza Vaccine", birthDate.plusYears(4)),
                    VaccinationModel("VID41", "Annual Influenza Vaccine", birthDate.plusYears(5)),
                    VaccinationModel("VID42", "HPV (first dose)", birthDate.plusYears(9)),
                    VaccinationModel("VID43", "HPV (second dose)", birthDate.plusYears(10)),
                    VaccinationModel("VID44", "Tdap/Td", birthDate.plusYears(10))
                )

                completedVaccinations = mutableListOf()
                val remainingVaccinationsRef = FirebaseDatabase.getInstance().reference
                    .child("users").child(userId).child("remainingVaccinations")
                remainingVaccinations.forEach { vaccination ->
                    remainingVaccinationsRef.child(vaccination.id).setValue(
                        mapOf(
                            "name" to vaccination.name,
                            "targetDate" to vaccination.targetDate.toString()
                        )
                    )
                }

                FirebaseDatabase.getInstance().reference.child("users").child(userId)
                    .child("birthDate").setValue(birthDate.toString())
                FirebaseDatabase.getInstance().reference.child("users").child(userId)
                    .child("childName").setValue(childName)

                completedVaccinations = mutableListOf()
            }
        }

        fun getRemainingVaccinations(userId: String, callback: (List<VaccinationModel>) -> Unit) {
            val remainingVaccinationsRef = FirebaseDatabase.getInstance().reference
                .child("users").child(userId).child("remainingVaccinations")
            remainingVaccinations = mutableListOf()

            remainingVaccinationsRef.addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val remainingVaccinationsList = mutableListOf<VaccinationModel>()
                    for (vaccinationSnapshot in snapshot.children) {
                        val name = vaccinationSnapshot.child("name").getValue(String::class.java) ?: ""
                        val targetDateStr = vaccinationSnapshot.child("targetDate").getValue(String::class.java) ?: ""
                        val targetDate = LocalDate.parse(targetDateStr)
                        val vaccination = VaccinationModel(vaccinationSnapshot.key!!, name, targetDate)
                        remainingVaccinationsList.add(vaccination)
                    }
                    remainingVaccinations = remainingVaccinationsList
                    callback(remainingVaccinationsList.sortedBy { it.targetDate })
                    Log.d("TAG", "onDataChange: 1")
                }

                override fun onCancelled(error: DatabaseError) {
                }
            })
            Log.d("TAG", "onDataChange: 2")
        }


        fun getCompletedVaccinations(userId: String, callback: (List<VaccinationModel>) -> Unit) {
            val completedVaccinationsRef = FirebaseDatabase.getInstance().reference
                .child("users").child(userId).child("completedVaccinations")

            val completedVaccinations = mutableListOf<VaccinationModel>()

            completedVaccinationsRef.addListenerForSingleValueEvent(object : ValueEventListener {
                override fun onDataChange(snapshot: DataSnapshot) {
                    val completedVaccinationsList = mutableListOf<VaccinationModel>()
                    for (vaccinationSnapshot in snapshot.children) {
                        val name = vaccinationSnapshot.child("name").getValue(String::class.java) ?: ""
                        val completedDateStr = vaccinationSnapshot.child("completedDate").getValue(String::class.java) ?: ""
                        val completedDate = LocalDate.parse(completedDateStr)
                        val vaccination = VaccinationModel(vaccinationSnapshot.key!!, name, completedDate)
                        completedVaccinationsList.add(vaccination)
                    }
                    completedVaccinations.addAll(completedVaccinationsList)
                    callback(completedVaccinationsList.sortedBy { it.targetDate }) // Notify the caller when the data is ready
                }

                override fun onCancelled(error: DatabaseError) {
                }
            })
        }


        fun completeVaccination(userId: String, vaccination: VaccinationModel, completionDate: LocalDate) {
            val completedVaccinationRef = FirebaseDatabase.getInstance().reference
                .child("users").child(userId).child("completedVaccinations").child(vaccination.id)
            completedVaccinationRef.setValue(
                mapOf(
                    "name" to vaccination.name,
                    "completedDate" to completionDate.toString()
                )
            )

            val remainingVaccinationsRef = FirebaseDatabase.getInstance().reference.child("users").child(userId)
                .child("remainingVaccinations").child(vaccination.id)
            remainingVaccinationsRef.removeValue()
        }
    }
}
