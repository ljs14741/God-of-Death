let userMessages = [];
let assistantMessages = [];
let myDateTime = '';
let chk = '';
let firstMessages = [];

function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if(date === ''){
        alert('생년월일을 입력해 주세요.');
        return;
    }
    myDateTime = date + hour;
    console.log(myDateTime);

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";

    console.log('11-1');
    chk = 'first';
    sendMessage();
    // firstMessages.push('저는 언제 어떻게 죽나요?');
    // sendRequest(firstMessages);
}

async function sendRequest(message) {
    try {
        const response = await fetch('https://bdskd4xjo3ioa6ii2ykdnhwhvi0ncwzl.lambda-url.ap-northeast-2.on.aws/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                myDateTime: myDateTime,
                userMessages: message,
                assistantMessages: assistantMessages,
             }),
        });

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();

        document.getElementById('loader').style.display = "none";

        assistantMessages.push(data.assistant[0].message.content);
        return data.assistant[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return '죄송합니다. 에러가 발생했습니다.';
    }
}

function appendMessage(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('li');
    messageElement.className = role === 'user' ? 'user-message' : 'assistant-message';
    messageElement.textContent = content;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
    document.getElementById('loader').style.display = "block";

    let userInput = document.getElementById('message-input').value;
    console.log('chk : ' + chk)
    if(chk==='first') {
        userInput = '저는 언제 어떻게 죽나요?'
        chk = 'not first';
    }
    if (!userInput.trim()) return;

    

    appendMessage('user', userInput);
    
    userMessages.push(userInput);

    const assistantResponse = await sendRequest(userMessages);
    appendMessage('assistant', assistantResponse);

    document.getElementById('message-input').value = '';
}