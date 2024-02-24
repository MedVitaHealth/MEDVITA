package com.example.medx.UI.adapter

import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import androidx.recyclerview.widget.DiffUtil
import com.example.medx.R
import com.example.medx.UI.model.MessageModel

class ChatAdapter: ListAdapter<MessageModel, ChatAdapter.MessageViewHolder>(
    DiffCallback()) {
    inner class MessageViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val aiMessageTextView: TextView = itemView.findViewById(R.id.aiTextMessage)
        private val userMessageTextView: TextView = itemView.findViewById(R.id.userTextMessage)
        private val userMessageLayout: LinearLayout = itemView.findViewById(R.id.userTextLayout)
        private val aiMessageLayout: LinearLayout = itemView.findViewById(R.id.aiTextLayout)

        fun bind(message: MessageModel) {

            if (message.isUser){
                aiMessageLayout.visibility = View.GONE
                userMessageTextView.text = message.content
            }
            else{
                userMessageLayout.visibility = View.GONE
                aiMessageTextView.text = message.content
            }
        }
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageViewHolder {
        val view: View = LayoutInflater.from(parent.context)
            .inflate(R.layout.chat_item, parent, false)
        return MessageViewHolder(view)
    }

    override fun onBindViewHolder(holder: MessageViewHolder, position: Int) {
        val chatModel = getItem(position)
        holder.bind(chatModel)
    }

    class DiffCallback : DiffUtil.ItemCallback<MessageModel>() {
        override fun areItemsTheSame(oldItem: MessageModel, newItem: MessageModel): Boolean {
            return oldItem.content == newItem.content
        }

        override fun areContentsTheSame(oldItem: MessageModel, newItem: MessageModel): Boolean {
            return oldItem == newItem
        }
    }
}
