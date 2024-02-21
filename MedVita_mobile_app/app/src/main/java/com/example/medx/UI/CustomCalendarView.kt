package com.example.medx.UI

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.os.Build
import android.util.AttributeSet
import android.widget.CalendarView
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.ZoneId

class CustomCalendarView : CalendarView {
    private val customSpans: MutableMap<Long, CustomSpan> = HashMap()

    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet) : super(context, attrs)

    @RequiresApi(Build.VERSION_CODES.O)
    fun addCustomSpan(date: LocalDate, color: Int) {
        val epochMillis = date.atStartOfDay(ZoneId.systemDefault()).toInstant().toEpochMilli()
        customSpans[epochMillis] = CustomSpan(color)
        invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        for ((date, span) in customSpans) {
            drawSpan(canvas, date, span)
        }
    }

    private fun drawSpan(canvas: Canvas, date: Long, span: CustomSpan) {
        val dayMillis = 24 * 60 * 60 * 1000
        val dayStart = date - date % dayMillis
        val dayEnd = dayStart + dayMillis

        // Retrieve baseline using Paint.FontMetrics
        val paint = Paint(Paint.ANTI_ALIAS_FLAG)
        val fontMetrics = paint.fontMetrics
        val baseline = height / 2 + (fontMetrics.descent - fontMetrics.ascent) / 2 - fontMetrics.descent

        drawBackground(canvas, span, dayStart, dayEnd, 0, baseline.toInt(), 0)
    }



    private fun drawBackground(
        canvas: Canvas, span: CustomSpan,
        left: Long, right: Long, top: Int, baseline: Int, bottom: Int
    ) {
        val paint = Paint(Paint.ANTI_ALIAS_FLAG)
        span.drawBackground(
            canvas, paint,
            left.toInt(), right.toInt(), top, baseline, bottom,
            "", 0, 0, 0
        )
    }
}