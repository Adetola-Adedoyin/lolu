document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("bg-music");

  // Ensure it plays on load (some browsers restrict autoplay)
  function tryPlayMusic() {
    const playPromise = music.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("🎶 Music started");
        })
        .catch((error) => {
          console.warn("🔇 Music couldn't autoplay:", error);
        });
    }
  }

  // Try to autoplay after user interaction if blocked
  document.body.addEventListener("click", tryPlayMusic, { once: true });
});

function playAudio(index) {
  const audio = document.getElementById(`audio-${index}`);
  audio.play();
}

function pauseAudio(index) {
  const audio = document.getElementById(`audio-${index}`);
  audio.pause();
}
