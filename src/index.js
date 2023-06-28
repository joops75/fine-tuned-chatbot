const chatbotConversation = document.getElementById('chatbot-conversation')

let conversationStr = ''

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')
    conversationStr += ` ${userInput.value} ->`
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})

async function fetchReply() {
    const url = `${process.env.HOME}/netlify/functions/fetchAIKey.js`
    const response = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
            text: conversationStr
        })
    })

    console.log(response)
    // const { text } = response.data.choices[0]
    // conversationStr += ` ${text} \n`
    // renderTypewriterText(text)
}

function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i - 1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}