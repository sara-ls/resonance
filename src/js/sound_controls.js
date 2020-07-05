/*
 * SETUP SOUND CONTROL EVENT LISTENERS
 */
const setupSoundControls = () => {
  // Adding listeners to every play/stop button
  document.querySelectorAll(".play").forEach((playBtn) => {
    playBtn.addEventListener(
      "click",
      function playSound(e) {
        // Stop/start playing a sound
        if (isMuted) muteDocument();

        let targetElement = e.target || e.srcElement;
        let outerElem = targetElement.parentElement.parentElement;
        let selectedSound = outerElem.querySelector("audio");
        let volumeControler = outerElem.querySelector(".volume-bar");
        let soundImage = outerElem.querySelector("img");

        if (selectedSound.paused) {
          // Play sound
          volumeControler.style.opacity = 1;
          selectedSound.loop = true;
          if (volumeControler.value == 0) volumeControler.value = 0.05;
          selectedSound.volume = volumeControler.value;
          selectedSound.play();
          soundImage.classList.add("playing");

          // Turn on audio visualization animation
          if (visual.classList.contains("off")) {
            visual.classList.remove("off");
          }
        } else {
          // Pause sound
          volumeControler.style.opacity = 0;
          selectedSound.pause();
          selectedSound.currentTime = 0;
          volumeControler.value = 0;
          soundImage.classList.remove("playing");

          // Check if other sounds arer still playing
          let numPlaying = document.getElementsByClassName("playing").length;
          // Turn off audio visualization animation
          if (
            (!visual.classList.contains("off") && numPlaying === 0) ||
            isMuted
          ) {
            visual.classList.add("off");
          }
        }
      },
      false
    );
  });

  // DOM elements that control sound volume
  const volumeControls = document.querySelectorAll(".volume-bar");

  // Adding listeners to every volume control slider
  for (let i = 0; i < volumeControls.length; i++) {
    volumeControls[i].addEventListener("input", volumeSound, false);
    volumeControls[i].style.opacity = 0;
  }

  // DOM element that mutes and unmutes the page
  let isMuted = false;
  document
    .querySelector(".mute-btn a")
    .addEventListener("click", muteDocument, false);

  // DOM element that resets the sounds
  document
    .querySelector(".reset-btn a")
    .addEventListener("click", resetSounds, false);

  // Volume controller
  function volumeSound(e) {
    if (isMuted) muteDocument();

    let targetElement = e.target || e.srcElement;
    let selectedSound = targetElement.parentElement.querySelector("audio");
    selectedSound.volume = targetElement.value;
  }

  let currentSounds = [];

  function muteDocument() {
    if (!isMuted) {
      isMuted = true;
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
      document.querySelector(".mute-btn label").innerText = "UNMUTE";
      // Turn off audio visual
      if (!visual.classList.contains("off")) {
        visual.classList.add("off");
      }
    } else {
      isMuted = false; // Unmute
      document.querySelector(".unmuted").style.display = "inline";
      document.querySelector(".muted").style.display = "none";
      document.querySelector(".mute-btn label").innerText = "MUTE";
      currentSounds.forEach((sound) => (sound[0].volume = sound[1]));

      // Turn on audio visual animation if unmuting & currentSounds is not empty
      if (visual.classList.contains("off") && currentSounds.length > 0) {
        visual.classList.remove("off");
      }
    }
  }

  function resetSounds() {
    currentSounds = [];
    if (!visual.classList.contains("off")) {
      visual.classList.add("off");
    }
    let allAudio = document.querySelectorAll("audio");
    for (let i = 0; i < allAudio.length; i++) {
      allAudio[i].pause();
      allAudio[i].currentTime = 0;
      allAudio[i].value = 0;
    }
    let all_playBtnss = document.querySelectorAll(".start-btn img");
    for (let i = 0; i < all_playBtnss.length; i++) {
      all_playBtnss[i].classList.remove("playing");
    }

    for (let i = 0; i < volumeControls.length; i++) {
      volumeControls[i].value = 0;
      volumeControls[i].style.opacity = 0;
    }
  }
};

export default setupSoundControls;
