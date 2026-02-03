// Stage 1: Typing Animation
const text = "Enik Ninnod oru karyam Chodhikan und, chodhikate?";
const typingElement = document.getElementById('typingText');
let index = 0;

function typeText() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 80);
    }
}

// Start typing when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// Stage 1: No button movement and Yes button highlight
const noBtn1 = document.getElementById('noBtn1');
const yesBtn1 = document.getElementById('yesBtn1');

noBtn1.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton1();
    highlightYesButton(yesBtn1);
});

function moveNoButton1() {
    const buttons = document.querySelector('#stage1 .buttons');
    const rect = buttons.getBoundingClientRect();
    
    const maxX = rect.width - 200;
    const maxY = 80;
    
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn1.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 20 - 10}deg)`;
}

function highlightYesButton(btn) {
    btn.classList.add('highlight');
    setTimeout(() => {
        btn.classList.remove('highlight');
    }, 600);
}

// Stage 1: Yes button click
yesBtn1.addEventListener('click', () => {
    goToStage(2);
});

// Stage 2: Get the video element
const mainVideo = document.getElementById('mainVideo');
const videoContainer = document.getElementById('videoContainer');
let videoEndHandled = false;

// Stage 2: Check video time and start fade + typing before it ends
if (mainVideo) {
    mainVideo.addEventListener('timeupdate', () => {
        // When video is 3 seconds from the end
        if (mainVideo.duration - mainVideo.currentTime <= 3 && !videoEndHandled) {
            videoEndHandled = true;
            
            // Start fade out animation
            videoContainer.classList.add('fade-out');
            
            // Start showing Stage 3 during fade
            setTimeout(() => {
                goToStage(3);
            }, 1500);
        }
    });
}

// Stage 3: Typing animation for "Will you be my valentine??"
const valentineText = "Will you be my valentine??😁";
const valentineTypingElement = document.getElementById('valentineTyping');
let valentineIndex = 0;

function typeValentineQuestion() {
    valentineTypingElement.classList.add('show');
    if (valentineIndex < valentineText.length) {
        valentineTypingElement.textContent += valentineText.charAt(valentineIndex);
        valentineIndex++;
        setTimeout(typeValentineQuestion, 100);
    }
}

// Stage 3: No button movement and Yes button highlight
const noBtn2 = document.getElementById('noBtn2');
const yesBtn2 = document.getElementById('yesBtn2');

noBtn2.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton2();
    highlightYesButton(yesBtn2);
});

function moveNoButton2() {
    const buttons = document.querySelector('#stage3 .buttons');
    const rect = buttons.getBoundingClientRect();
    
    const maxX = rect.width - 200;
    const maxY = 80;
    
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn2.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 20 - 10}deg)`;
}

// Stage 3: Yes button click
yesBtn2.addEventListener('click', () => {
    goToStage(4);
});

// Stage 4: Final typing animation
const finalText = "Hehehe Mwahhh";
const finalTyping = document.getElementById('finalTyping');
let finalIndex = 0;

function typeFinalMessage() {
    finalTyping.classList.add('show');
    if (finalIndex < finalText.length) {
        finalTyping.textContent += finalText.charAt(finalIndex);
        finalIndex++;
        setTimeout(typeFinalMessage, 120);
    }
}

// Function to switch stages
function goToStage(stageNumber) {
    // Hide all stages
    const stages = document.querySelectorAll('.stage');
    stages.forEach(stage => {
        stage.classList.add('hidden');
    });
    
    // Show the target stage
    const targetStage = document.getElementById(`stage${stageNumber}`);
    targetStage.classList.remove('hidden');
    
    // Stage-specific actions
    if (stageNumber === 2) {
        // Auto-play the video with sound when entering stage 2
        if (mainVideo) {
            mainVideo.muted = false; // Make sure sound is enabled
            mainVideo.play();
        }
    }
    
    if (stageNumber === 3) {
        // Start typing the Valentine question
        setTimeout(() => {
            typeValentineQuestion();
        }, 500);
    }
    
    if (stageNumber === 4) {
        // Photo shows first (already visible with animation)
        // Then start typing after photo appears
        setTimeout(() => {
            typeFinalMessage();
        }, 1500);
        
        // Start creating hearts from bottom
        setTimeout(() => {
            startHeartsFromBottom();
        }, 2000);
    }
}

// Hearts from bottom animation for Stage 4
let heartIntervalBottom;
const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];

function createHeartFromBottom() {
    const heart = document.createElement('div');
    heart.className = 'heart-float';
    heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
    heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
    heart.style.animationDelay = Math.random() * 0.5 + 's';
    heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

function startHeartsFromBottom() {
    heartIntervalBottom = setInterval(() => {
        createHeartFromBottom();
    }, 300);
}

function stopHeartsFromBottom() {
    if (heartIntervalBottom) {
        clearInterval(heartIntervalBottom);
    }
}

// Observe stage 4 for cleanup
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'stage4') {
            if (mutation.target.classList.contains('hidden')) {
                stopHeartsFromBottom();
            }
        }
    });
});

const stage4 = document.getElementById('stage4');
observer.observe(stage4, { attributes: true, attributeFilter: ['class'] });


// When transitioning to stage 2, ensure video plays with sound
const video = document.getElementById('mainVideo');

// When showing stage 2
video.muted = false; // Ensure it's not muted
video.volume = 1.0;  // Set volume to maximum

// Attempt to play with sound
video.play().catch(error => {
    console.log("Autoplay with sound blocked. User interaction required.");
    // If autoplay is blocked, the controls will allow user to play manually
});