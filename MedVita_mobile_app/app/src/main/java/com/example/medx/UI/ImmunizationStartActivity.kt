package com.example.medx.UI

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.animation.AnimationUtils
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import com.example.medx.R
import com.example.medx.databinding.ActivityImmunizationStartBinding
import com.google.android.material.datepicker.MaterialDatePicker
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

class ImmunizationStartActivity : AppCompatActivity() {

    private var selectedBirthDate: LocalDate? = null
    private lateinit var binding: ActivityImmunizationStartBinding

    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityImmunizationStartBinding.inflate(layoutInflater)
        setContentView(binding.root)
        StatusBarUtil.setStatusBarColor(this, R.color.white)

        CoroutineScope(Dispatchers.Main).launch {
            delay(300)
            binding.textWelcome.visibility = View.VISIBLE
            binding.textWelcome.animation = AnimationUtils.loadAnimation(applicationContext,R.anim.splash_text_anim)
        }

        binding.submitButton.setOnClickListener {
            val childName = binding.editTextChildName.text.toString()
            if (selectedBirthDate != null && childName.isNotEmpty()) {
                val intent = Intent(this, ImmunizationActivity::class.java).apply {
                    val sharedPreferences = getSharedPreferences("MyPrefs", MODE_PRIVATE)
                    val editor = sharedPreferences.edit()
                    editor.putString("BIRTH_DATE", selectedBirthDate.toString())
                    editor.putString("CHILD_NAME", childName)
//                    editor.putInt("IMMUNIZATION_FLAG", 1)
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
            selectedBirthDate = Instant.ofEpochMilli(it).atZone(ZoneId.systemDefault()).toLocalDate()
            binding.editTextBirthDate.setText(picker.headerText)
        }

        picker.show(supportFragmentManager, picker.toString())
    }
}
