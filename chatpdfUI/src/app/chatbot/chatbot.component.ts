import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../Service/FormDataService';
import axios from 'axios';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  formData: any = {
    'chat-heading': 'Chatbot', // Set your default chatbot name here
    'color': '', // Set the desired color
    'welcome-message': '', // Set the welcome message
    'error-message': '', // Set the error message
    'availability': 'always',
    'channels': [],
  };

  chatMessages: any[] = [];
  userMessage: string = '';

 

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    // Retrieve the form data from the service
    this.formData = this.formDataService.getFormData();
  }
  sendMessage() {
    if (this.userMessage.trim() === '') {
      return; // Handle empty messages, if needed
    }
  
    console.log('Sending user message:', this.userMessage); // Add this log
  
    // Create an array to store the chat message
    const chatMessage = {
      role: 'user',
      content: this.userMessage,
    };
  
    // Push the user message to the chatMessages array
    this.chatMessages.push(chatMessage);
  
    // Check if a PDF file was uploaded
    if (this.formData['pdfData']) {
      // Upload the PDF file to ChatPDF.com using its source ID
      const sourceId = this.formData['pdfData']['sourceId'];
  
      // Define the data for the chat message
      const chatData = {
        sourceId: sourceId,
        messages: [chatMessage],
      };
  
      console.log('Sending chat message data:', chatData); // Add this log
  
      // Send the chat message to the PDF using the ChatPDF.com API
      axios.post('https://api.chatpdf.com/v1/chats/message', chatData, {
        headers: {
          'x-api-key': 'sec_4puyAwfuTudnn8AvNvzgSDNnpPRzmyqK', // Replace with your ChatPDF.com API key
          'Content-Type': 'application/json',
        },
      })
      .then((response: any) => {
        // Handle the response from ChatPDF.com API
        console.log('Received bot response:', response.data.content); // Add this log
        const botResponse = {
          role: 'assistant',
          content: response.data.content, // Extracted content from the PDF
        };
  
        // Push the bot's response to the chatMessages array
        this.chatMessages.push(botResponse);
      })
      .catch((error: any) => {
        console.error('Error sending chat message:', error);
        // Handle the error, if needed
      });
    }
  
    // Clear the user input field
    this.userMessage = '';
  }
}  