


function chatbox(){
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotButton = document.getElementById('close-chatbot');

    chatbotIcon.addEventListener('click', function(event) {
        event.preventDefault();
        chatbotWindow.style.display = 'block';
    });

    closeChatbotButton.addEventListener('click', function() {
        chatbotWindow.style.display = 'none';
    });

    // Close the chatbox when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === body) {
            chatbotWindow.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", chatbox);