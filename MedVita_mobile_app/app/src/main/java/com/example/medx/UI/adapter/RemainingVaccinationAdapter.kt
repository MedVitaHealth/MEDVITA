package com.example.medx.UI.adapter

import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresApi
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.example.medx.R
import com.example.medx.UI.model.DateUtils
import com.example.medx.UI.model.VaccinationModel

class RemainingVaccinationAdapter(private val onItemClick: (VaccinationModel) -> Unit) :
    ListAdapter<VaccinationModel, RemainingVaccinationAdapter.VaccinationViewHolder>(DiffCallback()) {

    inner class VaccinationViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        private val nameTextView: TextView = view.findViewById(R.id.vaccination_name)
        private val timeRemainingTextView: TextView = view.findViewById(R.id.time_remaining)

        @RequiresApi(Build.VERSION_CODES.O)
        fun bind(vaccination: VaccinationModel) {
            nameTextView.text = vaccination.name
            DateUtils.formatTimeRemaining(vaccination.targetDate, timeRemainingTextView)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): VaccinationViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.vaccination_card, parent, false)
        return VaccinationViewHolder(view)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onBindViewHolder(holder: VaccinationViewHolder, position: Int) {
        val vaccination = getItem(position)
        holder.bind(vaccination)
        holder.itemView.setOnClickListener {
            onItemClick.invoke(vaccination)
        }
    }

    class DiffCallback : DiffUtil.ItemCallback<VaccinationModel>() {
        override fun areItemsTheSame(oldItem: VaccinationModel, newItem: VaccinationModel): Boolean {
            return oldItem.name == newItem.name
        }

        override fun areContentsTheSame(oldItem: VaccinationModel, newItem: VaccinationModel): Boolean {
            return oldItem == newItem
        }
    }
}
