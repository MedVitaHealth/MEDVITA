package com.example.medx.UI.model

import java.time.LocalDate


data class VaccinationModel(
    val id: String,
    val name: String,
    val targetDate: LocalDate
)

