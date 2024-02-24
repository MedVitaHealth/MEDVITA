package com.example.medx.UI


import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.applandeo.materialcalendarview.CalendarDay
import com.applandeo.materialcalendarview.CalendarView
import com.applandeo.materialcalendarview.EventDay
import com.example.medx.R
import com.example.medx.databinding.ActivityMenstruationBinding
import java.time.LocalDate
import java.time.ZoneId
import java.util.*

class MenstruationActivity : AppCompatActivity() {

    private lateinit var textRemainingDays: TextView
    private lateinit var customCalendarView: CalendarView
    private lateinit var binding: ActivityMenstruationBinding

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMenstruationBinding.inflate(layoutInflater)
        setContentView(binding.root)
        StatusBarUtil.setStatusBarColor(this, R.color.mainColor)

        binding.backBtn.setOnClickListener {
            finish()
        }

        textRemainingDays = binding.textRemainingDays
        customCalendarView = binding.calendarView

        // Get data from shared preferences
        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val lastPeriodEndDate = LocalDate.parse(sharedPreferences.getString("PERIOD_DATE", ""))
        val avgCycleLength = sharedPreferences.getString("CYCLE_Length", "")?.toInt() ?: 28
        val avgPeriodLength = sharedPreferences.getString("PERIOD_Length", "")?.toInt() ?: 5

        // Calculate important dates
        val lastPeriodStartDate = lastPeriodEndDate.minusDays(avgPeriodLength.toLong()-1)
        val ovulationDate = lastPeriodEndDate.plusDays((avgCycleLength / 2).toLong())
        val fertileStartDate = ovulationDate.minusDays(3)
        val fertileEndDate = ovulationDate.plusDays(2)
        val periodStartDate = lastPeriodStartDate.plusDays(avgCycleLength.toLong())
        val periodEndDate = periodStartDate.plusDays(avgPeriodLength.toLong()-1)

        Log.d("TAG", "onCreateMenstruation: $lastPeriodStartDate, $lastPeriodEndDate")

        // Calculate remaining days until the next period
        val currentDate = LocalDate.now()
        val remainingDays = currentDate.until(periodStartDate).days

        // Set text for remaining days
        textRemainingDays.text = remainingDays.toString()

        // List to store EventDay objects for marking specific dates
        val events = mutableListOf<EventDay>()

        var date = lastPeriodStartDate
        while (!date.isAfter(lastPeriodEndDate)) {
            events.add(EventDay(date.toDate(), R.drawable.period))
            date = date.plusDays(1)
        }

        date = periodStartDate
        while (!date.isAfter(periodEndDate)) {
            events.add(EventDay(date.toDate(), R.drawable.expected_period_days))
            date = date.plusDays(1)
        }

        date = fertileStartDate
        while (!date.isAfter(fertileEndDate)) {
            if(date != ovulationDate)
                events.add(EventDay(date.toDate(), R.drawable.fertilisation))
            date = date.plusDays(1)
        }

        events.add(EventDay(ovulationDate.toDate(), R.drawable.ovulation))


        // Set the events to the CalendarView
        customCalendarView.setEvents(events)

    }
    @RequiresApi(Build.VERSION_CODES.O)
    fun LocalDate.toDate(): java.util.Calendar {
        val calendar = java.util.Calendar.getInstance()
        calendar.set(this.year, this.monthValue - 1, this.dayOfMonth)
        return calendar
    }
}