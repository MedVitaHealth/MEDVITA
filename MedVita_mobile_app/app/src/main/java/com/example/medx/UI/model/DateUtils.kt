package com.example.medx.UI.model

import android.os.Build
import android.widget.TextView
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.temporal.ChronoUnit

object DateUtils {
    @RequiresApi(Build.VERSION_CODES.O)
    fun formatTimeRemaining(targetDate: LocalDate, textView: TextView) {
        val currentDate = LocalDate.now()
        val daysBetween = ChronoUnit.DAYS.between(currentDate, targetDate)
        val weeksBetween = ChronoUnit.WEEKS.between(currentDate, targetDate)
        val monthsBetween = ChronoUnit.MONTHS.between(currentDate, targetDate)
        val yearsBetween = ChronoUnit.YEARS.between(currentDate, targetDate)
        textView.setTextColor(textView.resources.getColor(android.R.color.holo_green_dark))

        val remainingText = when {
            yearsBetween > 0 -> "$yearsBetween year(s) left"
            monthsBetween > 0 -> {
                if (monthsBetween == 1L) {
                    textView.setTextColor(textView.resources.getColor(android.R.color.black))
                }
                "$monthsBetween month(s) left"
            }
            weeksBetween > 0 -> {
                if (weeksBetween == 1L) {
                    textView.setTextColor(textView.resources.getColor(android.R.color.holo_red_light))
                }
                "$weeksBetween week(s) left"
            }
            daysBetween > 0 -> {
                if (daysBetween == 1L) {
                    textView.setTextColor(textView.resources.getColor(android.R.color.holo_red_light))
                }
                "$daysBetween day(s) left"
            }
            else -> {
                textView.setTextColor(textView.resources.getColor(android.R.color.holo_red_light))
                "Date expired ${daysBetween * -1} day(s) ago"
            }
        }

        textView.text = remainingText

    }
}
