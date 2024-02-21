package com.example.medx.UI

import android.app.AlarmManager
import android.app.AlertDialog
import android.app.PendingIntent
import android.app.TimePickerDialog
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.Window
import android.widget.EditText
import android.widget.TimePicker
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.medx.R
import com.example.medx.UI.adapter.AlarmAdapter
import com.example.medx.UI.database.AlarmEntity
import com.example.medx.UI.model.AlarmViewModel
import com.example.medx.UI.services.AlarmReceiver
import com.example.medx.UI.services.BackgroundSoundService
import com.example.medx.databinding.ActivityPillsReminderBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

class PillsReminderActivity : AppCompatActivity(), AlarmAdapter.OnAlarmSwitchListener {

    private lateinit var binding: ActivityPillsReminderBinding
    private lateinit var alarmViewModel: AlarmViewModel
    private lateinit var adapter: AlarmAdapter
    var pendingIntent: PendingIntent? = null
    var alarmManager: AlarmManager? = null

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPillsReminderBinding.inflate(layoutInflater)
        setContentView(binding.root)

        StatusBarUtil.setStatusBarColor(this, R.color.mainColor)

        alarmManager = this.getSystemService(AlarmManager::class.java)

        alarmViewModel = ViewModelProvider(this).get(AlarmViewModel::class.java)

        adapter = AlarmAdapter(this)

        val recyclerView: RecyclerView = binding.alarmRecyclerView
        recyclerView.layoutManager = LinearLayoutManager(this)
        recyclerView.adapter = adapter

        // Observe LiveData for updates in alarms
        alarmViewModel.allAlarms.observe(this) { alarms ->
            adapter.submitList(alarms)
        }

        // Button to open a dialog for adding a new alarm
        binding.addButton.setOnClickListener {
            showTimePicker()
        }

        binding.stopButton.setOnClickListener {
            val intent1 = Intent(this@PillsReminderActivity, BackgroundSoundService::class.java)
            stopService(intent1)
        }

        binding.deleteButton.setOnClickListener {
            deleteSelectedAlarms(adapter.getSelectedAlarms())
        }

        val activityRootView: View = findViewById(android.R.id.content)

        // Click listener for the root view to deselect alarms when clicking outside
        activityRootView.setOnClickListener {
            adapter.clearSelectedAlarms()
        }

        // Observe changes in selected alarms to show/hide the delete button
        adapter.registerAdapterDataObserver(object : RecyclerView.AdapterDataObserver() {
            override fun onChanged() {
                super.onChanged()
                updateDeleteButtonVisibility()
            }
        })
    }

    private fun showTimePicker() {

        val dialogView = layoutInflater.inflate(R.layout.dialog_timepicker_with_details, null)
        val timePicker = dialogView.findViewById<TimePicker>(R.id.timePicker)
        val detailsEditText = dialogView.findViewById<EditText>(R.id.detailsEditText)

        val timePickerDialog = AlertDialog.Builder(this)
            .setTitle("Set Alarm Time")
            .setView(dialogView)
            .setPositiveButton("Set") { _, _ ->
                val selectedHour = timePicker.hour
                val selectedMinute = timePicker.minute
                val selectedTime = String.format("%02d:%02d", selectedHour, selectedMinute)
                val details = detailsEditText.text.toString()

                if (details.isNotBlank()) {
//                     Check if the selected time already exists in the database
                    lifecycleScope.launch {
                        val existingAlarm = withContext(Dispatchers.IO) {
                            alarmViewModel.getAlarmByTime(selectedTime)
                        }
                        if (existingAlarm != null) {
                            // Alarm with the same time already exists
                            Toast.makeText(this@PillsReminderActivity, "Alarm at this time already exist",Toast.LENGTH_SHORT).show()                       } else {
                            // Insert the new alarm into the database
                            val alarm = AlarmEntity(0, selectedTime, details, false)
                            withContext(Dispatchers.IO) {
                                alarmViewModel.insert(alarm)
                            }
                        }
                    }
                }
                else {
                    Toast.makeText(this@PillsReminderActivity, "Details cannot be empty", Toast.LENGTH_SHORT).show()
                }
            }
            .setNegativeButton("Cancel", null)
            .create()

        timePickerDialog.show()
    }

    private fun deleteSelectedAlarms(selectedAlarms: Set<AlarmEntity>) {
        for (alarm in selectedAlarms) {
            alarmViewModel.delete(alarm)
        }
        adapter.clearSelectedAlarms() // Clear selected alarms after deletion
    }

    private fun updateDeleteButtonVisibility() {
        val selectedAlarms = adapter.getSelectedAlarms()
        if (selectedAlarms.isNotEmpty()) {
            binding.deleteButton.visibility = View.VISIBLE
        } else {
            binding.deleteButton.visibility = View.GONE
        }
    }
    override fun onSwitchOn(alarmId: Int, alarmTime: String, isChecked: Boolean) {

        val intent = Intent(this, AlarmReceiver::class.java)
        pendingIntent = PendingIntent.getBroadcast(applicationContext, alarmId, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)

        val currentPendingIntent = pendingIntent

        if (currentPendingIntent != null) {
            val time = timeToMillis(alarmTime)
            if (isChecked) {
                // Schedule the alarm if the switch is turned on
                Toast.makeText(this@PillsReminderActivity, "ALARM ON at $alarmTime", Toast.LENGTH_SHORT).show()
                alarmManager!!.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, time, currentPendingIntent)
            } else {
                // Cancel the alarm if the switch is turned off
                Toast.makeText(this@PillsReminderActivity, "ALARM at $alarmTime is cancelled", Toast.LENGTH_SHORT).show()
                alarmManager!!.cancel(currentPendingIntent)
            }
        }
        lifecycleScope.launch {
            val alarm = withContext(Dispatchers.IO) {
                alarmViewModel.getAlarmByTime(alarmTime)
            }
            if (alarm != null) {
                alarm.isSwitchedOn = isChecked
                alarmViewModel.update(alarm)
            }
        }
    }

    private fun timeToMillis(time: String): Long {
        val sdf = SimpleDateFormat("HH:mm", Locale.getDefault())
        val selectedDate = Calendar.getInstance()
        val selectedTime = sdf.parse(time)

        if (selectedTime != null) {
            val selectedCalendar = Calendar.getInstance()
            selectedCalendar.time = selectedTime

            selectedDate.set(Calendar.HOUR_OF_DAY, selectedCalendar.get(Calendar.HOUR_OF_DAY))
            selectedDate.set(Calendar.MINUTE, selectedCalendar.get(Calendar.MINUTE))
            selectedDate.set(Calendar.SECOND, 0)

            return selectedDate.timeInMillis
        }

        return 0
    }
}