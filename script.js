let pages = ["book","cake","slider","flyer","message","final"];
let index = 0;

/* ---------------- PAGE CONTROL ---------------- */

function showPage(i){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("show"));
    document.getElementById(pages[i]).classList.add("show");

    // start typing ONLY when message page opens
    if(pages[i] === "message"){
        startTyping();
    }

    // final fireworks
    if(pages[i] === "final"){
        startFireworks();
    }
}

/* CLICK TO NEXT PAGE */
document.body.addEventListener("click", ()=>{
    if(index < pages.length - 1){
        index++;
        showPage(index);
    }
});

/* AUTO START */
setTimeout(()=>{
    index = 1;
    showPage(index);
    startMic();
},3000);

/* ---------------- SLIDESHOW ---------------- */

let images = [
"images/01.jpg",
"images/02.jpg",
"images/03.jpg",
"images/04.jpg",
"images/05.jpg",
"images/06.jpg",
"images/07.jpg"
];

let i = 0;

setInterval(()=>{
    if(document.getElementById("slider").classList.contains("show")){
        document.getElementById("slide").src = images[i];
        i = (i + 1) % images.length;
    }
},2000);

/* ---------------- MIC (BLOW CANDLE) ---------------- */

function startMic(){
    navigator.mediaDevices.getUserMedia({ audio:true })
    .then(stream => {

        let audio = new AudioContext();
        let mic = audio.createMediaStreamSource(stream);
        let analyser = audio.createAnalyser();

        mic.connect(analyser);

        let data = new Uint8Array(analyser.frequencyBinCount);

        function detect(){
            analyser.getByteFrequencyData(data);
            let volume = data.reduce((a,b)=>a+b)/data.length;

            if(volume > 30){
                let flame = document.getElementById("flame");
                if(flame) flame.style.display = "none";
            }

            requestAnimationFrame(detect);
        }

        detect();
    });
}

/* ---------------- TYPING MESSAGE ---------------- */

const message = `Happy Birthday to the greatest footballer the world has ever seen, Lionel Messi.

Today is more than just a celebration of your birth — it is a celebration of greatness, humility, passion, and magic. A day the football world pauses to honor a man who didn’t just play the game, but changed it forever.

From the streets of Rosario to the biggest stadiums on Earth, your journey has been nothing short of legendary. You showed us that greatness is not only about strength or size, but about vision, intelligence, and heart. Every touch of the ball, every dribble past impossible defenders, every goal in the most crucial moments — you made football feel like poetry in motion.

You didn’t just win trophies; you won hearts. You didn’t just break records; you set standards that may never be reached again. From Barcelona to Paris, and shining on the international stage with Argentina, you carried the hopes of millions and turned dreams into reality.

That World Cup victory was more than a trophy — it felt like the world finally witnessed the full story of a legend completed. Through every heartbreak, every criticism, and every challenge, you never gave up. You stayed silent, focused, and let your feet do the talking.

What makes you truly special is not only your talent, but your humility. Despite being the greatest, you remain calm, respectful, and grounded. You remind us that true greatness doesn’t need noise — it speaks through action.

On your birthday, we don’t just wish you happiness — we thank you. Thank you for the memories, the joy, the inspiration, and the countless moments that made us fall in love with football over and over again.

May your new year bring you peace, joy with your family, continued success, and good health. May your legacy continue to inspire generations yet to come, long after you hang up your boots.

Happy Birthday, Lionel Messi — the magician, the genius, the GOAT, the heart of football.

Forever admired. Forever legendary. 🐐✨`;

let j = 0;
let typingDone = false;

function startTyping(){
    document.getElementById("typedText").innerHTML = "";
    j = 0;
    typingDone = false;

    function type(){
        if(j < message.length){
            document.getElementById("typedText").innerHTML += message[j];
            j++;
            setTimeout(type, 12);
        } else {
            typingDone = true;
            triggerFireworks(); // 🎆 FIREWORKS AFTER MESSAGE
        }
    }

    type();
}

/* ---------------- FIREWORKS ---------------- */

let canvas = document.getElementById("fireworks");
let ctx = canvas ? canvas.getContext("2d") : null;

let particles = [];

function startFireworks(){
    if(!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];

    for(let i=0;i<120;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*3,
            dx: Math.random()*4-2,
            dy: Math.random()*4-2,
            alpha: 1
        });
    }

    animate();
}

function triggerFireworks(){
    startFireworks();
}

function animate(){
    if(!ctx) return;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    particles.forEach(p=>{
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = "white";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;
    });

    requestAnimationFrame(animate);
                               }
