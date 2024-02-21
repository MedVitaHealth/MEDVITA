package com.example.medx.UI.database

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface AlarmDao {
    @Insert
    suspend fun insert(alarm: AlarmEntity)

    @Query("SELECT * FROM alarms")
    fun getAllAlarms(): LiveData<List<AlarmEntity>>

    @Delete
    suspend fun delete(alarm: AlarmEntity)

    @Query("SELECT * FROM alarms WHERE time = :time")
    fun getAlarmByTime(time: String): AlarmEntity?

    @Update
    suspend fun update(alarm: AlarmEntity)
}