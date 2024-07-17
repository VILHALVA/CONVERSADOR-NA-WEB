$(document).ready(function() {
    $('#send-btn').on('click', function() {
        let userInput = $('#user-input').val().trim();
        if (userInput) {
            addMessage('USUARIO', './FOTOS/USUARIO.jpg', userInput, 'sender-1');
            $('#user-input').val('');
            
            setTimeout(function() {
                let botResponse = getBotResponse(userInput);
                addMessage('ROBÔ', './FOTOS/ROBO.jpg', botResponse, 'sender-2');
            }, 1000);
        }
    });
});

function addMessage(senderName, avatarUrl, text, senderClass) {
    let messageHtml = `
        <div class="message ${senderClass}">
            <div class="avatar">
                <img src="${avatarUrl}" alt="${senderName}">
            </div>
            <div class="arrow ${senderClass === 'sender-1' ? 'arrow-left' : 'arrow-right'}"></div>
            <div class="message-bubble">
                <div class="sender-name">${senderName}</div>
                <p>${text}</p>
            </div>
        </div>
    `;
    $('#chat-container').append(messageHtml);
    $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
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
