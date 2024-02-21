package com.example.medx.UI.repository

import androidx.lifecycle.LiveData
import com.example.medx.UI.database.AlarmDao
import com.example.medx.UI.database.AlarmEntity

class AlarmRepository(private val alarmDao: AlarmDao) {
    val allAlarms: LiveData<List<AlarmEntity>> = alarmDao.getAllAlarms()

    suspend fun insert(alarm: AlarmEntity) {
        alarmDao.insert(alarm)
    }

    suspend fun delete(alarm: AlarmEntity) {
        alarmDao.delete(alarm)
    }

    suspend fun update(alarm: AlarmEntity) {
        alarmDao.update(alarm)
    }

    suspend fun getAlarmByTime(time: String): AlarmEntity? {
        return alarmDao.getAlarmByTime(time)
    }
}


