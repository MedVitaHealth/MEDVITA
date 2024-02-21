package com.example.medx.UI.adapter

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.appcompat.widget.SwitchCompat
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.medx.R
import com.example.medx.UI.database.AlarmEntity

class AlarmAdapter(private val onAlarmSwitchListener: OnAlarmSwitchListener) :
    ListAdapter<AlarmEntity, AlarmAdapter.AlarmViewHolder>(DiffCallback()) {

    private val selectedAlarms = mutableSetOf<AlarmEntity>()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlarmViewHolder {
        val view: View = LayoutInflater.from(parent.context)
            .inflate(R.layout.card_alarm, parent, false)
        return AlarmViewHolder(view)
    }

    override fun onBindViewHolder(holder: AlarmViewHolder, position: Int) {
        val alarm = getItem(position)
        holder.bind(alarm, selectedAlarms.contains(alarm))

        holder.itemView.setOnClickListener {
            toggleAlarmSelection(alarm)
        }

        // Set an OnCheckedChangeListener to the switch
        holder.alarmSwitch.setOnCheckedChangeListener { _, isChecked ->
            alarm.isSwitchedOn = isChecked
            onAlarmSwitchListener.onSwitchOn(alarm.id, alarm.time, isChecked)
        }
    }

    inner class AlarmViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val timeTextView: TextView = itemView.findViewById(R.id.time)
        private val detailsTextView: TextView = itemView.findViewById(R.id.details)
        var alarmSwitch: SwitchCompat = itemView.findViewById(R.id.alarmSwitch)

        fun bind(alarm: AlarmEntity, isSelected: Boolean) {
            timeTextView.text = alarm.time
            detailsTextView.text = alarm.details
            alarmSwitch.isChecked = alarm.isSwitchedOn // Reset switch state

            if (isSelected) {
                itemView.setBackgroundColor(
                    ContextCompat.getColor(itemView.context, R.color.selected_alarm_bg)
                )
            } else {
                itemView.setBackgroundColor(
                    ContextCompat.getColor(itemView.context, R.color.white)
                )
            }
        }
    }

    // Function to toggle alarm selection
    private fun toggleAlarmSelection(alarm: AlarmEntity) {
        if (selectedAlarms.contains(alarm)) {
            selectedAlarms.remove(alarm)
        } else {
            selectedAlarms.add(alarm)
        }
        notifyDataSetChanged()
    }

    // Function to clear selected alarms
    fun clearSelectedAlarms() {
        selectedAlarms.clear()
        notifyDataSetChanged()
    }

    // Function to get selected alarms
    fun getSelectedAlarms(): Set<AlarmEntity> {
        return selectedAlarms
    }

    interface OnAlarmSwitchListener {
        fun onSwitchOn(alarmId: Int, alarmTime: String, isChecked: Boolean)
    }

    class DiffCallback : DiffUtil.ItemCallback<AlarmEntity>() {
        override fun areItemsTheSame(oldItem: AlarmEntity, newItem: AlarmEntity): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: AlarmEntity, newItem: AlarmEntity): Boolean {
            return oldItem == newItem
        }
    }
}



