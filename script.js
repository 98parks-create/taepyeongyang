window.addEventListener('scroll', () => {
    const header = document.querySelector('#header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

gsap.registerPlugin(ScrollTrigger);


window.addEventListener('load', () => {
    const reveals = document.querySelectorAll('.reveal:not(.box)');

    reveals.forEach((el) => {
        gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    });


    const boxes = document.querySelectorAll('.box');
    let currentIndex = 0;

    if (boxes.length > 0) {

        gsap.set(boxes, { opacity: 0, visibility: 'hidden' });
        gsap.set(boxes[0], { opacity: 1, visibility: 'visible' });

        function fadeToNextImage() {
            const current = boxes[currentIndex];
            const nextIndex = (currentIndex + 1) % boxes.length;
            const next = boxes[nextIndex];

          
            gsap.set(next, { visibility: 'visible', opacity: 0 });

     
            gsap.to(current, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    gsap.set(current, { visibility: 'hidden' });
                },
            });

            gsap.to(next, {
                opacity: 1,
                duration: 1,
                ease: 'power2.inOut',
            });

            currentIndex = nextIndex;
        }

        if (boxes.length > 1) {
            setInterval(fadeToNextImage, 3000);
        }
         boxes.forEach((box) => {
            box.addEventListener('click', () => {
                window.location.href = 'portfolio.html';
                // window.location.href = '/portfolio.html';
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
});
 window.onload = function() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('userName').value;
                const phone = document.getElementById('userPhone').value;

                alert(name + "님, 견적 문의가 정상적으로 접수되었습니다.\n확인 후 " + phone + "번호로 연락드리겠습니다.");
                
                this.reset();
            });
        } else {
            console.error("ID가 'contactForm'인 요소를 찾을 수 없습니다. HTML 코드를 확인해주세요.");
        }
    };

    const API_KEY = "AIzaSyCYG4845VSOYyXHXdnc4RMyr4hD_1V-pAk";


    window.openChatbot = () => {
        document.getElementById('chatbot-window').style.display = 'flex';
    };
    window.closeChatbot = () => {
        document.getElementById('chatbot-window').style.display = 'none';
    };
    window.handleKeyPress = (e) => {
        if (e.key === 'Enter') window.sendMessage();
    };

    function addMessage(sender, text) {
        const messagesDiv = document.getElementById('chatbot-messages');
        const msgElement = document.createElement('div');
        msgElement.className = `message ${sender}`;
        msgElement.innerText = text;
        messagesDiv.appendChild(msgElement);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        return msgElement;
    }

    window.sendMessage = async function() {
        const input = document.getElementById('user-input');
        const message = input.value.trim();
        if (!message) return;

        addMessage('user', message);
        input.value = "";
        const loadingMsg = addMessage('bot', "태평양 애드가 생각 중입니다...");

        try {
            const genAI = new window.googleGenerativeAi.GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            
            const prompt = `당신은 '태평양 애드'의 전문 상담원입니다. 
            진실되고 정중한 태도로 한국어로 답하세요. 답변에 관련 이모지도 섞어주세요.
            질문: ${message}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const aiText = response.text();

            loadingMsg.innerText = aiText;
        } catch (error) {
            console.error("상세 에러:", error);
            loadingMsg.innerText = "연결이 원활하지 않습니다. 다시 한번 말씀해 주시겠어요? ✨";
        }
    };

