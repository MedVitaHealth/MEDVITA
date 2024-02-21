package com.example.medx.UI

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.Toast
import androidx.annotation.RequiresApi
import com.example.medx.R
import com.example.medx.databinding.ActivityMenstruationStartBinding
import com.google.android.material.datepicker.MaterialDatePicker
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

private var selectedPeriodDate: LocalDate? = null
private lateinit var binding: ActivityMenstruationStartBinding
class MenstruationStartActivity : AppCompatActivity() {
    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMenstruationStartBinding.inflate(layoutInflater)
        setContentView(binding.root)
        StatusBarUtil.setStatusBarColor(this, R.color.white)

        CoroutineScope(Dispatchers.Main).launch {
            delay(300)
            binding.textWelcome.visibility = View.VISIBLE
            binding.textWelcome.animation = AnimationUtils.loadAnimation(applicationContext,R.anim.splash_text_anim)
        }

            binding.submitButton.setOnClickListener {
            val avgCycleLength = binding.editTextCycleLength.text.toString()
            val avgPeriodLength = binding.editTextPeriodLength.text.toString()
            if (selectedPeriodDate != null && (avgCycleLength.isNotEmpty()  && avgPeriodLength.isNotEmpty())) {
                val intent = Intent(this, MenstruationActivity::class.java).apply {
                val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
                val editor = sharedPreferences.edit()
                editor.putString("PERIOD_DATE", selectedPeriodDate.toString())
                editor.putString("CYCLE_Length", avgCycleLength)
                editor.putString("PERIOD_Length", avgPeriodLength)
                editor.apply()

                }
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "Please enter both date and child name", Toast.LENGTH_SHORT).show()
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun showDatePicker(view: android.view.View) {
        val builder = MaterialDatePicker.Builder.datePicker()
        val picker = builder.build()

        picker.addOnPositiveButtonClickListener {
            selectedPeriodDate = Instant.ofEpochMilli(it).atZone(ZoneId.systemDefault()).toLocalDate()
            binding.editTextPeriodDate.setText(picker.headerText)
        }

        picker.show(supportFragmentManager, picker.toString())
    }
}