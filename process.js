window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
let currentStep = 1;
const totalSteps = 4;
let autoTimer;

function changeBox(id) {
    resetTimer();
    
    currentStep = id;
    const boxes = document.querySelectorAll('.info-box');
    const items = document.querySelectorAll('.detail-item');
    
    boxes.forEach((box, index) => {
        if (index === id - 1) {
            box.classList.add('active');
            items[index].style.background = "#f8f9ff";
            items[index].style.borderColor = "#101155";
        } else {
            box.classList.remove('active');
            items[index].style.background = "white";
            items[index].style.borderColor = "transparent";
        }
    });
}

function nextBox() {
    currentStep = currentStep >= totalSteps ? 1 : currentStep + 1;
    changeBox(currentStep);
}


function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextBox, 3000); 
}

window.onload = () => {
    resetTimer();
};


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.reveal').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});