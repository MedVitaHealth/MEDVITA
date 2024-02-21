package com.example.medx.UI.model

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.viewModelScope
import com.example.medx.UI.database.AlarmDatabase
import com.example.medx.UI.database.AlarmEntity
import com.example.medx.UI.repository.AlarmRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class AlarmViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: AlarmRepository
    val allAlarms: LiveData<List<AlarmEntity>>

    init {
        val alarmDao = AlarmDatabase.getDatabase(application).alarmDao()
        repository = AlarmRepository(alarmDao)
        allAlarms = repository.allAlarms
    }

    fun insert(alarm: AlarmEntity) = viewModelScope.launch {
        repository.insert(alarm)
    }

    fun delete(alarm: AlarmEntity) = viewModelScope.launch {
        repository.delete(alarm)
    }

    fun update(alarm: AlarmEntity) = viewModelScope.launch(Dispatchers.IO) {
        repository.update(alarm)
    }

    suspend fun getAlarmByTime(time: String): AlarmEntity? {
        return repository.getAlarmByTime(time)
    }
}

