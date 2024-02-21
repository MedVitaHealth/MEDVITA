package com.example.medx.UI

import android.graphics.Canvas
import android.graphics.Paint
import android.text.style.LineBackgroundSpan

class CustomSpan(private val color: Int) : LineBackgroundSpan {
    override fun drawBackground(
        canvas: Canvas,
        paint: Paint,
        left: Int,
        right: Int,
        top: Int,
        baseline: Int,
        bottom: Int,
        p7: CharSequence,
        start: Int,
        end: Int,
        lineNumber: Int
    ) {
        paint.color = color
        canvas.drawRect(left.toFloat(), top.toFloat(), right.toFloat(), bottom.toFloat(), paint)
    }
}
