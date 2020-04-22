import "../scss/main.scss";
import Cursor from "./Cursor";

document.addEventListener("DOMContentLoaded", () => {
  // INSERT CUSTOM CURSOR
  let cursor = new Cursor();

  /*
   * LOADING ANIMATION
   */
  // Import water pouring loading sound
  const sound = new Audio(
    "https://actions.google.com/sounds/v1/water/water_drains_in_pipe.ogg"
  );

  document.getElementById("enter").addEventListener("click", (e) => {
    // Hide enter button
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.border = "1px solid transparent";
    e.currentTarget.innerHTML = "";
    sound.play();

    // Load DOM Elements with sound
    const allAudio = document.querySelectorAll("audio");

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
      percent = Math.floor((100 * loaded) / allAudio.length);

      document.getElementById("count").innerText = percent + "%";

      // Show water rising in loading animation
      document.getElementById("water").style.transform = `translate(0, ${
        100 - percent
      }%)`;
      // Last file loaded
      if (loaded === allAudio.length) {
        for (let i = 0; i < allAudio.length; i++) {
          allAudio[i].removeEventListener("canplaythrough", loadSounds);
        }

        sound.pause();

        // Fade out and remove load-screen once all audio loaded
        let fadeTarget = document.getElementById("load-screen");
        fadeTarget.style.opacity = 0;
        setTimeout(() => {
          document.querySelector("body").removeChild(fadeTarget);
        }, 800);
      }
    }
  });

  /*
   * SETUP SOUND CONTROL EVENT LISTENERS
   */
  // DOM Elements that control play/stop sounds
  let playBtns = document.querySelectorAll(".play");

  // Adding listeners to every play/stop button
  for (let i = 0; i < playBtns.length; i++) {
    playBtns[i].addEventListener(
      "click",
      function playSound(e) {
        // Stop/start playing a sound
        if (is_muted) {
          muteDocument();
        }
        let targetElement = e.target || e.srcElement;
        let outerElem = targetElement.parentElement.parentElement;
        let selectedSound = outerElem.querySelector("audio");
        let volumeControler = outerElem.querySelector(".volume-bar");
        let soundImage = outerElem.querySelector("img");

        if (selectedSound.paused) {
          volumeControler.style.opacity = 1;
          selectedSound.loop = true;
          if (volumeControler.value == 0) volumeControler.value = 0.1;
          selectedSound.volume = volumeControler.value;
          selectedSound.play();
          soundImage.classList.add("playing");
        } else {
          volumeControler.style.opacity = 0;
          selectedSound.pause();
          selectedSound.currentTime = 0;
          volumeControler.value = 0;
          soundImage.classList.remove("playing");
        }
      },
      false
    );
  }

  // DOM elements that controll sound volume
  const volumeControls = document.querySelectorAll(".volume-bar");

  // Adding listeners to every volume control slider
  for (let i = 0; i < volumeControls.length; i++) {
    volumeControls[i].addEventListener("input", volumeSound, false);
    volumeControls[i].style.opacity = 0;
  }

  // DOM element that mutes and unmutes the page
  let is_muted = false;
  document
    .querySelector(".mute-btn a")
    .addEventListener("click", muteDocument, false);

  // DOM element that resets the sounds
  document
    .querySelector(".reset-btn a")
    .addEventListener("click", resetSounds, false);

  // Volume controller
  function volumeSound(e) {
    if (is_muted) {
      muteDocument();
    }
    let targetElement = e.target || e.srcElement;
    let selectedSound = targetElement.parentElement.querySelector("audio");
    selectedSound.volume = targetElement.value;
  }

  let currentSounds = [];

  function muteDocument() {
    if (!is_muted) {
      currentSounds.length = 0;
      is_muted = true;
      document.querySelector(".unmuted").style.display = "none";
      document.querySelector(".muted").style.display = "inline";
      let allAudio = document.querySelectorAll("audio");
      for (let i = 0; i < allAudio.length; i++) {
        if (!allAudio[i].paused) {
          currentSounds.push([allAudio[i], allAudio[i].volume]);
        }
      }
      currentSounds.forEach(function (sound) {
        sound[0].volume = 0;
      });
    } else {
      is_muted = false;
      document.querySelector(".unmuted").style.display = "inline";
      document.querySelector(".muted").style.display = "none";
      currentSounds.forEach((sound) => (sound[0].volume = sound[1]));
    }
  }

  function resetSounds() {
    let allAudio = document.querySelectorAll("audio");
    for (let i = 0; i < allAudio.length; i++) {
      allAudio[i].pause();
      allAudio[i].currentTime = 0;
      allAudio[i].value = 0;
    }
    let all_playBtnss = document.querySelectorAll(".start_btn img");
    for (let i = 0; i < all_playBtnss.length; i++) {
      all_playBtnss[i].classList.remove("playing");
    }
    // let all_volumeControls = document.querySelectorAll(".volume-bar");
    for (let i = 0; i < volumeControls.length; i++) {
      volumeControls[i].value = 0;
      volumeControls[i].style.opacity = 0;
    }
  }
});
