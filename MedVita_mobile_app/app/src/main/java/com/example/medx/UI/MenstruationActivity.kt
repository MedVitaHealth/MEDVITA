package com.example.medx.UI

import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.medx.R
import android.os.Build
import android.widget.CalendarView
import android.widget.TextView
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.util.*

class MenstruationActivity : AppCompatActivity() {

    private lateinit var textRemainingDays: TextView
    private lateinit var calendarView: CalendarView

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_menstruation)

        textRemainingDays = findViewById(R.id.textRemainingDays)
        calendarView = findViewById(R.id.calendarView)

        // Get data from shared preferences
        val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
        val lastPeriodDate = LocalDate.parse(sharedPreferences.getString("PERIOD_DATE", ""))
        val avgCycleLength = sharedPreferences.getString("CYCLE_Length", "")?.toInt() ?: 28
        val avgPeriodLength = sharedPreferences.getString("PERIOD_Length", "")?.toInt() ?: 5

        // Calculate important dates
        val ovulationDate = lastPeriodDate.plusDays((avgCycleLength / 2).toLong())
        val fertileStartDate = ovulationDate.minusDays(2)
        val fertileEndDate = ovulationDate.plusDays(2)
        val periodStartDate = lastPeriodDate
        val periodEndDate = lastPeriodDate.plusDays(avgPeriodLength.toLong())

        // Calculate remaining days until the next period
        val currentDate = LocalDate.now()
        val remainingDays = periodEndDate.until(currentDate).days

        // Set text for remaining days
        textRemainingDays.text = "Remaining Days: $remainingDays"

        // Set calendar markings
        calendarView.setOnDateChangeListener { view, year, month, dayOfMonth ->
            val selectedDate = LocalDate.of(year, month + 1, dayOfMonth)

            // Check and mark days based on conditions
//            if (selectedDate.isAfter(periodStartDate) && selectedDate.isBefore(periodEndDate)) {
//                // Mark days of last period with continuous pink color
//                val pinkColor = Color.parseColor("#FFC0CB") // Adjust the color as needed
//                calendarView.setDateCellBackgroundColor(selectedDate.toEpochDay() * 24 * 60 * 60 * 1000, pinkColor)
//            }
//
//            if (selectedDate.isEqual(ovulationDate)) {
//                // Mark ovulation day with continuous purple color
//                val purpleColor = Color.parseColor("#800080") // Adjust the color as needed
//                calendarView.setDateCellBackgroundColor(selectedDate.toEpochDay() * 24 * 60 * 60 * 1000, purpleColor)
//            }
//
//            if (selectedDate.isAfter(fertileStartDate) && selectedDate.isBefore(fertileEndDate)) {
//                // Mark fertile days with hollow purple color
//                val hollowPurpleColor = Color.parseColor("#800080") // Adjust the color as needed
//                calendarView.setDateTextAppearance((selectedDate.toEpochDay() * 24 * 60 * 60 * 1000).toInt(), R.style.HollowDayTextAppearance)
//                calendarView.setDateCellBackgroundColor(selectedDate.toEpochDay() * 24 * 60 * 60 * 1000, Color.TRANSPARENT)
//                calendarView.addDateCellSpan(CustomSpan(hollowPurpleColor), selectedDate.toEpochDay() * 24 * 60 * 60 * 1000)
//            }
        }
    }
}
