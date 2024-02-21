package com.example.medx.UI.database

import androidx.room.Entity
import androidx.room.PrimaryKey


@Entity(tableName = "alarms")
data class AlarmEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Int,
    var time: String,
    var details: String,
    var isSwitchedOn: Boolean
)


