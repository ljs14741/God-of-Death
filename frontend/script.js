let userMessages = [];
let assistantMessages = [];
let myDateTime = '';
let chk = '';
let chkLanguage ='';
let firstMessages = [];
let mbti = '';
let username = '';

function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    mbti = document.getElementById('mbti').value;
    username = document.getElementById('username').value;
    if(date === '') {
        alert('생년월일을 입력해 주세요.');
        return;
    }
    if(username === '') {
        alert('이름을 입력해 주세요.');
        return;
    }

    let radiochk = $('input[name=q7]:checked').val();
    if(radiochk === undefined) {
        alert('모든 질문에 답을 해주세요.');
        return;
    }

    myDateTime = date + hour;
    console.log(myDateTime);

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";

    chk = 'first';  
    
    sendMessage();
    // firstMessages.push('저는 언제 어떻게 죽나요?');
    // sendRequest(firstMessages);
}

function startEnglish() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    mbti = document.getElementById('mbti').value;
    username = document.getElementById('username').value;
    if(date === '') {
        alert('Please enter your birth date.');
        return;
    }
    if(username === '') {
        alert('Please enter your name.');
        return;
    }    
    let radiochk = $('input[name=q7]:checked').val();
    if(radiochk === undefined) {
        alert('Please answer all questions.');
        return;
    }
    myDateTime = date + hour;
    console.log(myDateTime);

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";

    chk = 'first';
    chkLanguage = 'english';
    sendMessage();
    // firstMessages.push('저는 언제 어떻게 죽나요?');
    // sendRequest(firstMessages);
}

async function sendRequest(message) {
    try {
        const response = await fetch('https://bdskd4xjo3ioa6ii2ykdnhwhvi0ncwzl.lambda-url.ap-northeast-2.on.aws/fortuneTell', {
            // const response = await fetch('http://localhost:3000/fortuneTell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                mbti: mbti,
                username: username,
                chkLanguage: chkLanguage,
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

    if (role === 'assistant') {
        // Assistant 메시지일 경우에는 링크를 추가
        const p = document.createElement('p');

        if(chkLanguage==='english') {
            p.innerHTML = 'If you click the link and send Bokchae, something better will happen. -> ';
        } else {
            p.innerHTML = '복채를 보내면 목숨이 연장될거야. → ';
        }
        
        const link = document.createElement('a');
        link.href = 'https://toss.me/godofdeath';
        link.innerHTML = '복채 보내기';
        p.appendChild(link);

        // Assistant 메시지와 함께 추가
        if(chkLanguage==='english') {
            messageElement.innerHTML = content + '<br></br>' + p.innerHTML;
        } else {
            messageElement.innerHTML = content + '<br></br>' + p.innerHTML;
        }
        
    } else {
        // User 메시지일 경우에는 그냥 텍스트만 추가
        messageElement.textContent = content;
    }

    messageElement.className = role === 'user' ? 'user-message' : 'assistant-message';
    messagesContainer.appendChild(messageElement);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function nextQuestion(nextQuestionId) {

    if(nextQuestionId !== 'question1') {
        // 현재 질문에 해당하는 라디오 버튼의 값을 가져옴
        let currentQuestionId = nextQuestionId.replace('question', ''); // 현재 질문 번호
        console.log('currentQuestionId: ' + currentQuestionId);
        currentQuestionId = currentQuestionId-1;
        console.log('currentQuestionId2: ' + currentQuestionId);

        let radioValue = $('input[name=q' + currentQuestionId + ']:checked').val();
        console.log('radioValue: ' + radioValue);

        // 만약 라디오 버튼이 체크되어 있지 않으면 알림 메시지를 띄우고 함수 종료
        if (!radioValue) {
            alert('라디오 버튼을 선택하세요.');
            return;
        }
    }

    // 현재 질문에 해당하는 라디오 버튼을 체크함
    // $('input[name=q' + currentQuestionId + '][value=' + radioValue + ']').prop('checked', true);
    // 현재 질문 숨기고 다음 질문 표시
    $('#question1, #question2, #question3, #question4, #question5, #question6, #question7, #question8').hide();
    $('#' + nextQuestionId).show();
}

function nextQuestion11(nextQuestionId) {

    if(nextQuestionId !== 'question11') {
        // 현재 질문에 해당하는 라디오 버튼의 값을 가져옴
        let currentQuestionId = nextQuestionId.replace('question', ''); // 현재 질문 번호
        console.log('currentQuestionId: ' + currentQuestionId);
        currentQuestionId = currentQuestionId-11;
        console.log('currentQuestionId2: ' + currentQuestionId);

        let radioValue = $('input[name=q' + currentQuestionId + ']:checked').val();
        console.log('radioValue: ' + radioValue);

        // 만약 라디오 버튼이 체크되어 있지 않으면 알림 메시지를 띄우고 함수 종료
        if (!radioValue) {
            alert('Select a radio button.');
            return;
        }
    }

    // 현재 질문에 해당하는 라디오 버튼을 체크함
    // $('input[name=q' + currentQuestionId + '][value=' + radioValue + ']').prop('checked', true);
    // 현재 질문 숨기고 다음 질문 표시
    $('#question11, #question22, #question33, #question44, #question55, #question66, #question77, #question88').hide();
    $('#' + nextQuestionId).show();
}


function transfer(transferChk) {
    if(transferChk === 'english') {        
        $('#transfer1').hide();
        $('#transfer2').show();
        $('#question1, #question2, #question3, #question4, #question5, #question6, #question7, #question8').hide();
        $('#question11').show();
    } else{
        
        $('#transfer1').show();
        $('#transfer2').hide();
        $('#question11, #question22, #question33, #question44, #question55, #question66, #question77, #question88').hide();
        $('#question1').show();
    }


}

function shareTwitter() {
    var sendText = "GodofDeath - 죽음 예측 테스트"; // 전달할 텍스트
    var sendUrl = "https://godofdeath.pages.dev"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

function shareFacebook() {
    var sendUrl = "https://godofdeath.pages.dev"; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
}

function shareKakao() {
    Kakao.init('752febc9dd3a3d4c85eec104e393784b');
  
    // // 카카오링크 버튼 생성
    Kakao.Share.createDefaultButton({
      container: '#btnKakao', 
      objectType: 'feed',
      content: {
        title: 'GodofDeath - 죽음 예측 테스트', 
        description: '당신의 죽음을 예측합니다.', 
        imageUrl: 'https://godofdeath.pages.dev', 
        link: {
           mobileWebUrl: 'https://godofdeath.pages.dev',
           webUrl: 'https://godofdeath.pages.dev'
        },
      },
    });
  }

async function sendMessage() {
    document.getElementById('loader').style.display = "block";

    let userInput = document.getElementById('message-input').value;
    console.log('chk : ' + chk)
    if(chk==='first') {
        if(chkLanguage==='english') {
            userInput = 'When and how will I die?';
        } else{
            userInput = '저는 언제 어떻게 죽나요?';
        }
        chk = 'not first';
    }
    if (!userInput.trim()) return;

    

    appendMessage('user', userInput);
    
    userMessages.push(userInput);

    const assistantResponse = await sendRequest(userMessages);
    appendMessage('assistant', assistantResponse);

    document.getElementById('message-input').value = '';
}