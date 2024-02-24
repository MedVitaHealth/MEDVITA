package com.example.medx.UI.model.postModels

data class ChatRequestBody(
    val model: String,
    val messages: List<ChatMessage>
)
