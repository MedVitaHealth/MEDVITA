package com.example.medx.UI

import ViewPagerAdapter
import android.content.Context
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.annotation.RequiresApi
import androidx.viewpager2.widget.ViewPager2
import com.example.medx.R
import com.example.medx.databinding.ActivityImmunizationBinding
import com.example.medx.databinding.ActivityPillsReminderBinding
import com.google.android.material.tabs.TabLayout
import com.google.android.material.tabs.TabLayoutMediator

class ImmunizationActivity : AppCompatActivity() {

    private lateinit var binding: ActivityImmunizationBinding
    private lateinit var viewPager: ViewPager2
    private lateinit var tabs: TabLayout
    @RequiresApi(Build.VERSION_CODES.M)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityImmunizationBinding.inflate(layoutInflater)
        setContentView(binding.root)

        StatusBarUtil.setStatusBarColor(this, R.color.mainColor)

        viewPager = binding.viewPager
        tabs = binding.tabs

        binding.backBtn.setOnClickListener {
            finish()
        }
        val sharedPreferences = getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)

        val childName = sharedPreferences.getString("CHILD_NAME", null)
        val birthDate = sharedPreferences.getString("BIRTH_DATE", null)

        binding.birthDate.text = birthDate.toString()
        binding.name.text = childName.toString()

        val adapter = ViewPagerAdapter(this)
        viewPager.adapter = adapter

        TabLayoutMediator(tabs, viewPager) { tab, position ->
            tab.text = if (position == 0) "Remaining" else "Completed"
        }.attach()
    }
}