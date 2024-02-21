package com.example.medx.UI

import android.content.Context
import android.os.Build
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.CalendarView
import android.widget.PopupWindow
import androidx.annotation.RequiresApi
import com.example.medx.R
import java.time.LocalDate
import java.time.ZoneId

@RequiresApi(Build.VERSION_CODES.O)
class VaccinationPopupWindow(context: Context, birthDate: LocalDate,
                             onCompleteListener: (LocalDate) -> Unit) {

    private val popupView: View =
        LayoutInflater.from(context).inflate(R.layout.immunzation_popup_window_layout, null)
    private val popupWindow = PopupWindow(
        popupView,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        ViewGroup.LayoutParams.WRAP_CONTENT,
        true
    )

    private val calendarView: CalendarView = popupView.findViewById(R.id.calendar_view)
    private val completeButton: Button = popupView.findViewById(R.id.complete_button)
    private var selectedDate: LocalDate = LocalDate.now()

    init {

        val birthDateMillis = birthDate.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli()
        val todayMillis = LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli()

        calendarView.minDate = birthDateMillis
        calendarView.maxDate = todayMillis

        calendarView.setOnDateChangeListener { _, year, month, dayOfMonth ->
            // Adjust month value (+1) because CalendarView months are 0-based (January is 0)
            selectedDate = LocalDate.of(year, month + 1, dayOfMonth)
        }


        completeButton.setOnClickListener {
            onCompleteListener.invoke(selectedDate)
            popupWindow.dismiss()
        }
    }

    fun show(anchorView: View) {
        popupWindow.showAtLocation(anchorView, Gravity.CENTER, 0, 0)
    }
}
