
let caught = false;
let armed = false; // prevents instant fly on load
const yesBtn = document.querySelector(".yes");
let yesBaseSize = 1; // starting scale (1 = 100%)
let yesScale = 1;       // current scale
const yesMaxScale = 1.8; // maximum scale

function start() {
  document.getElementById("card").classList.add("hidden");
  document.getElementById("question").classList.remove("hidden");

  // arm the button AFTER the screen is visible
  setTimeout(() => {
    armed = true;
  }, 500);
}

function yes() {
  document.getElementById("question").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
}

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseenter", () => {
  if (armed) flyAway();
});

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  if (armed) flyAway();
});

noBtn.addEventListener("click", catchNo);

function flyAway() {
  if (caught || yesScale >= yesMaxScale) return; // stop flying when max size

  const btnRect = noBtn.getBoundingClientRect();
  const btnWidth = btnRect.width;
  const btnHeight = btnRect.height;

  // Define fly zone (example: iPhone 15)
  let zoneWidth = 300;
  let zoneHeight = 800;

  // For desktop or larger screens, use full viewport
  if (window.innerWidth > 430) {
    zoneWidth = window.innerWidth - 50;
    zoneHeight = window.innerHeight - 50;
  }

  // Clamp the random position so the button stays fully inside the zone
  const x = Math.random() * (zoneWidth - btnWidth);
  const y = Math.random() * (zoneHeight - btnHeight);

  // Set button position **absolutely relative to viewport**
  noBtn.style.position = "fixed"; // important for absolute control
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = "none"; // reset previous translate
   yesBaseSize += 0.05; // increase by 5%
  if (yesBaseSize > yesMaxScale) yesBaseSize = yesMaxScale; // cap max growth
  yesBtn.style.transform = `translate(55%, 50%) scale(1) scale(${yesBaseSize})`;
  if (yesScale == yesMaxScale) noBtn.style.display = "none";
}

function catchNo() {
  if (caught) return;
  caught = true;

  alert("Error: You are not allowed to say no 😜");

  noBtn.style.display = "none";
  yesBaseSize = yesMaxScale;
  yesBtn.style.transform = `translate(55%, 50%) scale(1) scale(${yesBaseSize})`;
}

const heartCount = 30; // number of hearts

for (let i = 0; i < heartCount; i++) {
  const heart = document.createElement('div');
  heart.textContent = "❤️"; // the heart emoji
  heart.style.position = "absolute";

  // Random horizontal position
  heart.style.left = Math.random() * 100 + "vw";

  // Random size
  const startY = Math.random() * 100; // 0% to 100% of viewport height
  heart.style.fontSize = startY + "px";
  heart.style.bottom = `-${startY}vh`; // negative because CSS animation uses translateY

  // Random speed
  const duration = 4 + Math.random() * 4; // 4s to 8s
  heart.style.animation = `floatUp ${duration}s linear infinite`;

  // Random delay
  heart.style.animationDelay = Math.random() * 4 + "s";

  document.body.appendChild(heart);
}

const bgHeartCount = 50; // number of hearts in background
for (let i = 0; i < bgHeartCount; i++) {
  const heart = document.createElement('div');
  heart.classList.add('background-heart');

  // Random heart emoji
  const hearts = ["❤️","💖","💘","💕","💞"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  // Random position
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 100 + "vh";

  // Random size
  const size = 10 + Math.random() * 30;
  heart.style.fontSize = size + "px";
  heart.style.bottom = `-${size}vh`; // negative because CSS animation uses translateY

  // Optional: random float speed
  const duration = 20 + Math.random() * 20; // 20s to 40s
  heart.style.animationDuration = duration + "s";

  document.body.appendChild(heart);
}

yesBtn.addEventListener('click', () => {
  // Hide the main card if needed
  document.querySelector('.card').classList.add('hidden');

  // Show the result card
  const resultCard = document.getElementById('result');
  resultCard.classList.remove('hidden');

  // Fade in the meeting message after a short delay
  const meetingMsg = document.getElementById('meeting');
  setTimeout(() => {
    meetingMsg.classList.add('fade-show');
  }, 500); // 0.5 second delay
});