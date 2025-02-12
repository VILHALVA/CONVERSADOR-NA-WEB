$(document).ready(function() {
    addMessage('🤖CONVERSADOR', './imagens/ROBO.jpg', 
    "😃Olá! Eu sou o bot CONVERSADOR!\n\n🌚Você pode me fazer perguntas como:\n- qual é o seu nome?\n- como você está?\n- o que você pode fazer?\n- tchau...", 'sender-2');

    addButtons();
    
    $('#send-btn').on('click', function() {
        sendMessage();
    });

    $('#user-input').on('keypress', function(event) {
        if (event.which === 13) {
            sendMessage();
        }
    });
});

function addButtons() {
    const buttonsHtml = `
        <div class="button-container">
            <a href="https://t.me/VILHALVA100" class="inline-button" target="_blank">💻CRIADOR</a>
            <a href="https://t.me/VILHALVA100_OFICIAL" class="inline-button" target="_blank">📢CANAL</a>
        </div>
    `;
    $('#chat-container').append(buttonsHtml);
    $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
}

function sendMessage() {
    let userInput = $('#user-input').val().trim();
    if (userInput) {
        addMessage('👤VOCÊ', './imagens/VOCE.jpg', userInput, 'sender-1');
        $('#user-input').val(''); 

        addTypingIndicator();

        setTimeout(function() {
            let botResponse = getBotResponse(userInput);
            removeTypingIndicator();
            addMessage('🤖CONVERSADOR', './imagens/ROBO.jpg', botResponse, 'sender-2');
        }, 1500); 
    }
}

function addMessage(senderName, avatarUrl, text, senderClass) {
    let messageHtml = `
        <div class="message ${senderClass}">
            <div class="avatar">
                <img src="${avatarUrl}" alt="${senderName}">
            </div>
            <div class="arrow ${senderClass === 'sender-1' ? 'arrow-left' : 'arrow-right'}"></div>
            <div class="message-bubble">
                <div class="sender-name">${senderName}</div>
                <p>${text.replace(/\n/g, '<br>')}</p>
            </div>
        </div>
    `;
    $('#chat-container').append(messageHtml);
    $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
}

function addTypingIndicator() {
    let typingHtml = `
        <div class="message sender-2 typing-indicator" id="typing-indicator">
            <div class="avatar">
                <img src="./imagens/ROBO.jpg" alt="ROBÔ ED">
            </div>
            <div class="message-bubble">
                <div class="bubble"></div>
                <div class="bubble"></div>
                <div class="bubble"></div>
            </div>
        </div>
    `;
    $('#chat-container').append(typingHtml);
    $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
}

function removeTypingIndicator() {
    $('#typing-indicator').remove();
}

function getBotResponse(userInput) {
    let lowerCaseInput = userInput.toLowerCase();
    for (let key in responses) {
        if (lowerCaseInput.includes(key)) {
            return responses[key];
        }
    }
    return responses["default"];
}
