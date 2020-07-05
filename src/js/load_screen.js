/*
 * LOADING SCREEN
 */
const setupLoadScreen = () => {
  // Load DOM Elements with sound
  const allAudio = document.querySelectorAll("audio");

  document.getElementById("enter").addEventListener("click", (e) => {
    // Hide enter button
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.border = "1px solid transparent";
    e.currentTarget.innerHTML = "";

    for (let i = 0; i < allAudio.length; i++) {
      // Attach event listener to all audio files
      // Execute loadSounds for each loaded file
      allAudio[i].addEventListener("canplaythrough", loadSounds, false);

      // Force reload in case audio files loaded, prevent stuck loading screen
      allAudio[i].load();
    }

    let loaded = 0;
    let percent = 0;

    function loadSounds(e) {
      // Increment loaded counter to check if all sounds can be played
      loaded++;

      // Calculate percent of audio files loaded
      percent = Math.floor((100 * loaded) / (allAudio.length - 1));

      document.getElementById("count").innerText = percent + "%";

      // Show water rising in loading animation
      document.getElementById("water").style.transform = `translate(0, ${
        100 - percent
      }%)`;

      // Last file loaded
      if (loaded === allAudio.length - 1) {
        for (let i = 0; i < allAudio.length; i++) {
          allAudio[i].removeEventListener("canplaythrough", loadSounds);
        }
        window.scroll(0, window.screenTop);

        document.querySelector("footer").style.position = "relative";

        // Fade out and remove load-screen once all audio loaded
        let fadeTarget = document.getElementById("load-screen");
        fadeTarget.style.opacity = 0;
        document.querySelector("body").removeChild(fadeTarget);

        // Reveal navbar
        document.querySelector("nav").classList.add("reveal");
      }
    }
  });
};

export default setupLoadScreen;
