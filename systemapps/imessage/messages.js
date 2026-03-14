const chatData = [
        {
        id: 'sunny', name: 'Sunny', isSMS: false, time: 'now',
        messages: [
            { sender: 'me', text: 'Hey, Sunny.. sorry i was so mean to you before.' },
            { sender: 'Sunny', text: 'Its alright, i already forgiving you :)' },
            { sender: 'me', text: 'I think seeing ya just caught me by surprise yk? though i guess thats a pretty crappy excuse lol.' },
            { sender: 'Sunny', text: 'well seeing you growing up way like this making me feel bad for you, sorry i havent there for you since Mari died.' },
            { sender: 'me', text: 'Sometimes i think i was the one that shouldve been there for you..' },
            { sender: 'me', text: 'Idk if we will really get over Mari.. but its okay to take it slow.'},
            { sender: 'Sunny', text: 'ehm.. thanks Aubrey :D'},
            { sender: 'me', text: 'anyway i just want you to know i still care about you and stuff.'},
            { sender: 'Sunny', text: 'thank you friend, even tho i fucked up over 4 years, i still care about you too.'},
            { sender: 'me', text: 'thank you my little pale :P'},
            { sender: 'Sunny', text: 'no problem my dear mrplantegg :P'},
            { sender: 'Sunny', text: 'Hi Aubrey, do you want to meet at our secret hangout spot?? i have something to tell you :D'},
        ]
    },
    {
        id: 'kim', name: 'Kim', isSMS: false, time: '10:15 AM',
        messages: [
            { sender: 'Kim', text: 'Yo we meeting at the park or what?' },
            { sender: 'me', text: 'Yeah give me 10 mins. Bring your bat.' },
            { sender: 'Kim', text: 'Already got it. Hurry up, i bring Vance with me.' }
        ]
    },
       {
        id: 'hobbeez', name: 'Hobbeez', isSMS: true, time: 'Yesterday',
        messages: [
            { sender: 'Hobbeez', text: 'BREAKING NEWS: Hobbeez is now registered as AASP (Apple Authorized Service Provider) in Faraway Town! isnt that nice??! now you can buy Apple devices straight from us, legally of course. were now stocking Macs, iPhones, iPads, and more!'},
            { sender: 'me', text: 'wow good to hear'},
            { sender: 'Hobbeez', text: 'Prior to the release, were now selling the iPhone 7 Series on Hobbeez! we also have new and best deal for iPhone 7 Plus! for the 128 GB version, you will get a huge discount of 30%! plus if you do trade-in of your current iPhone 6. This is the best deal on Faraway Town yet! Are you interested yet, Aubrey?' },
            { sender: 'me', text: 'How much the price after the deal, sir?' },
            { sender: 'Hobbeez', text: 'its only $610! and you will get the new iPhone 7 Plus, with suprisingly best dual camera, A10 chip, and the best of all!'},
            { sender: 'me', text: 'i will think first about this decision, thanks for letting me know about the deal.' }
        ]
    },
    {
        id: 'kel', name: 'Kel', isSMS: false, time: 'Yesterday',
        messages: [
            { sender: 'Kel', text: 'PINK IS A GROSS COLOR I TELL YA!!' },
            { sender: 'me', text: 'u said it twice and i will fuck you up.' },
        ]
    },
    {
        id: 'basil', name: 'Basil', isSMS: true, time: 'Yesterday',
        messages: [
            { sender: 'Basil', text: 'Hi Aubrey... I was wondering, could u give back my photo album?' },
            { sender: 'me', text: 'after what you did? youre the worst. get out. and change your fucking phone, poor.' },
            { sender: 'Basil', text: 'please...' }
        ]
    },
    {
        id: 'hero', name: 'Hero', isSMS: false, time: 'Monday',
        messages: [
            { sender: 'Hero', text: 'Hey Aubrey! How are you feeling?' },
            { sender: 'me', text: "What the heck are you chatting me here?" },
            { sender: 'Hero', text: 'I just wanted to make sure youre okay.' },
            { sender: 'Hero', text: 'I been hearing some things... but i just want to hear it from you, can you tell me what happened?' },
            { sender: 'me', text: 'Im fine! nothing happened.'},
            { sender: 'Hero', text: 'alright then. take care of yourself alright? see ya!'}
        ]
    },
    {
        id: 'angel', name: 'Angel', isSMS: false, time: 'Sunday',
        messages: [
            { sender: 'Angel', text: 'MASTER AUBREY! I learned a new move!' },
            { sender: 'me', text: 'Show me later.' }
        ]
    },
];

const listView = document.getElementById('messages-list-view');
const chatView = document.getElementById('chat-view');
const listContainer = document.getElementById('chat-list-container');
const bubblesContainer = document.getElementById('chat-bubbles-container');
const simAlert = document.getElementById('sim-alert-overlay');

function renderList() {
    listContainer.innerHTML = '';
    chatData.forEach(chat => {
        const lastMsg = chat.messages[chat.messages.length - 1].text;
        const initial = chat.name.charAt(0);
        
        const div = document.createElement('div');
        div.className = 'chat-item';
        div.onclick = () => openChat(chat);
        
        div.innerHTML = `
            <div class="avatar">${initial}</div>
            <div class="chat-info">
                <h4>${chat.name}</h4>
                <p>${lastMsg}</p>
            </div>
            <div class="chat-time">
                ${chat.time} <ion-icon name="chevron-forward"></ion-icon>
            </div>
        `;
        listContainer.appendChild(div);
    });
}

function openChat(chat) {
    listView.classList.add('hidden');
    chatView.classList.remove('hidden');
    
    document.getElementById('chat-contact-name').innerText = chat.name;
    
    // Nentuin warna bubble Aubrey, ijo apa biru
    const myColor = chat.isSMS ? 'green' : 'blue';
    const inputPlaceholder = chat.isSMS ? 'Text Message' : 'iMessage';
    
    document.querySelector('.input-box').innerText = inputPlaceholder;

    bubblesContainer.innerHTML = '';
    chat.messages.forEach(msg => {
        const div = document.createElement('div');
        if (msg.sender === 'me') {
            div.className = `bubble sent ${myColor}`;
        } else {
            div.className = 'bubble received';
        }
        div.innerText = msg.text;
        bubblesContainer.appendChild(div);
    });
    
    // Scroll ke paling bawah
    bubblesContainer.scrollTop = bubblesContainer.scrollHeight;
}

function backToList() {
    chatView.classList.add('hidden');
    listView.classList.remove('hidden');
}

function showSimAlert() {
    simAlert.classList.remove('hidden');
}

function closeSimAlert() {
    simAlert.classList.add('hidden');
}

// Render awal
renderList();