document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");

  loveMessages.forEach((msg, index) => {
    const card = document.createElement("div");
    card.classList.add("note-card", "fade-in");

    card.innerHTML = `
      <h3 class="note-chapter">${msg.chapter}</h3>
      <p><strong>🎵 ${msg.song.title} - ${msg.song.artist}</strong></p>
      <audio id="audio-${index}" src="${msg.song.filename}" preload="auto"></audio>
      <div class="audio-controls">
        <button class="audio-toggle" data-id="${index}">▶️ Play Song</button>
        <input type="range" class="audio-slider" data-id="${index}" min="0" max="100" value="0" step="0.1">
        <span class="time-display" data-id="${index}">0:00 / 0:00</span>
      </div>
      <p class="note-lyrics"><em>"${msg.lyrics}"</em></p>
      <p class="note-body">${msg.letter.replace(/\n/g, "<br/>")}</p>
    `;

    notesContainer.appendChild(card);

    // Add event listener for this specific audio element
    const audio = document.getElementById(`audio-${index}`);
    audio.addEventListener("timeupdate", () => {
      const slider = document.querySelector(`.audio-slider[data-id="${index}"]`);
      const timeDisplay = document.querySelector(`.time-display[data-id="${index}"]`);
      
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        slider.value = progress;
        
        const current = formatTime(audio.currentTime);
        const total = formatTime(audio.duration);
        timeDisplay.textContent = `${current} / ${total}`;
      }
    });
  });

  // Audio controls
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("audio-toggle")) {
      const id = e.target.getAttribute("data-id");
      const audio = document.getElementById(`audio-${id}`);

      if (audio.paused) {
        // Pause all other audios
        document.querySelectorAll("audio").forEach((a, i) => {
          if (i != id) {
            a.pause();
            const btn = document.querySelector(`.audio-toggle[data-id="${i}"]`);
            if (btn) btn.textContent = "▶️ Play Song";
          }
        });

        audio.play();
        e.target.textContent = "⏸️ Pause";
      } else {
        audio.pause();
        e.target.textContent = "▶️ Play Song";
      }
    }
  });

  // Slider controls
  document.addEventListener("input", function (e) {
    if (e.target.classList.contains("audio-slider")) {
      const id = e.target.getAttribute("data-id");
      const audio = document.getElementById(`audio-${id}`);
      const value = e.target.value;
      audio.currentTime = (value / 100) * audio.duration;
    }
  });



  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
});

function showPopup() {
  const popup = document.getElementById("surprise-popup");
  popup.classList.add("show");
  popup.classList.remove("hidden");
}

function hidePopup() {
  const popup = document.getElementById("surprise-popup");
  popup.classList.remove("show");
  popup.classList.add("hidden");
}

document.getElementById("popup-close").addEventListener("click", hidePopup);

// Trigger popup after delay
setTimeout(() => {
  showPopup();
}, 30000);

// Or scroll trigger
const contactSection = document.getElementById("contact");
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    showPopup();
    observer.disconnect();
  }
}, { threshold: 0.5 });

observer.observe(contactSection);
