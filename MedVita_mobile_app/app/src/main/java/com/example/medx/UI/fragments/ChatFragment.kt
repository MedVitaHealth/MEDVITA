package com.example.medx.UI.fragments

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.WindowManager
import android.widget.EditText
import android.widget.ImageButton
import android.widget.LinearLayout
import android.widget.ProgressBar
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.medx.UI.adapter.ChatAdapter
import com.example.medx.UI.model.MessageModel
import com.example.medx.databinding.FragmentChatBinding
import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.ResponseStoppedException
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ChatFragment : Fragment() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var editTextMessage: EditText
    private lateinit var sendBtn: ImageButton
    private lateinit var chatAdapter: ChatAdapter
    private lateinit var binding: FragmentChatBinding
    private val messages = mutableListOf<MessageModel>()
    private lateinit var loaderLayout: LinearLayout
    private lateinit var infoLayout: LinearLayout


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentChatBinding.inflate(inflater, container, false)

        activity?.window?.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)

        recyclerView = binding.recyclerView
        editTextMessage = binding.textMessage
        sendBtn = binding.sendBtn
        loaderLayout = binding.loaderLayout
        infoLayout = binding.introLayout

        val layoutManager = LinearLayoutManager(context)
        layoutManager.stackFromEnd = true
        recyclerView.layoutManager = layoutManager

        chatAdapter = ChatAdapter()
        recyclerView.adapter = chatAdapter


        sendBtn.setOnClickListener {
            val inputMessage = editTextMessage.text.toString().trim()
            if (inputMessage.isNotEmpty()) {
                addToChat(inputMessage, true)
                editTextMessage.clearFocus()
                editTextMessage.text.clear()
                loaderLayout.visibility = View.VISIBLE
                sendBtn.visibility = View.GONE
                infoLayout.visibility = View.GONE

                CoroutineScope(Dispatchers.Main).launch {
                    try {
                        val response = withContext(Dispatchers.IO) {
                            requestApiResponse(inputMessage)
                        }
                        addToChat(response, false)
                    } catch (e: ResponseStoppedException) {
                        e.printStackTrace()
                        Toast.makeText(context, e.message.toString(), Toast.LENGTH_SHORT).show()
                    } finally {
                        loaderLayout.visibility = View.GONE
                        sendBtn.visibility = View.VISIBLE
                    }
                }
            } else {
                Toast.makeText(context, "Enter a prompt", Toast.LENGTH_SHORT).show()
            }
        }

        return binding.root
    }

    private suspend fun requestApiResponse(message: String): String {

        val apiKey = "AIzaSyCyRn9q5nX_kgufxNEUFXaouTstOVFRsfg"
        val generativeModel = GenerativeModel("gemini-1.0-pro", apiKey)
        return generativeModel.generateContent(message).text.toString()


//        val chatGPTRequest = ChatRequestBody(
//            model = "gpt-3.5-turbo",
//            messages = listOf(
//                ChatMessage(role = "user", content = message)
//            )
//        )
//        val call: Call<ChatResponseModel> = ApiUtilities.getChatAPIInterface()
//            .postData("application/json","Bearer $apiKey", chatGPTRequest)
//
//        call.enqueue(object : Callback<ChatResponseModel> {
//            override fun onResponse(call: Call<ChatResponseModel>, response: Response<ChatResponseModel>) {
//                if (response.isSuccessful) {
//                    val aiMessageContent = response.body()?.choices?.get(0)?.message
//                    aiMessageContent?.let {
//                        messages.add(MessageModel(it, false))
//                        chatAdapter.notifyDataSetChanged()
//                    }
//
//                } else {
//                    Toast.makeText(context,"Response unsuccessful: ${response.code()}", Toast.LENGTH_SHORT).show()
//                }
//            }
//
//            override fun onFailure(call: Call<ChatResponseModel>, t: Throwable) {
//                Toast.makeText(context, t.message.toString(), Toast.LENGTH_SHORT).show()
//            }
//        })
    }

    private fun addToChat(message: String, isUser: Boolean) {
        messages.add(MessageModel(message,isUser))
        Log.d("TAG", "Message added. Total messages: ${messages.size}, Content: $message")
        chatAdapter.submitList(messages)
        recyclerView.smoothScrollToPosition(chatAdapter.itemCount)
    }
}