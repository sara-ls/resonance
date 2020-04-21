import "../scss/main.scss";
import Cursor from "./Cursor";

document.addEventListener("DOMContentLoaded", () => {
  // Insert custom cursor
  let cursor = new Cursor();

  // Import water pouring sound
  const sound = new Audio(
    "https://actions.google.com/sounds/v1/water/water_drains_in_pipe.ogg"
  );

  document.getElementById("enter").addEventListener("click", (e) => {
    // Hide enter button
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.border = "1px solid transparent";
    e.currentTarget.innerHTML = "";
    sound.play();
    //DOM Elements with sound
    var all_sounds = document.querySelectorAll("audio");

    for (var i = 0; i < all_sounds.length; i++) {
      all_sounds[i].addEventListener("canplaythrough", loadedSounds, false);
      // Force reload in case some audio files already loaded to avoid stuck loading screen
      all_sounds[i].load();
    }
    var loaded = 0;
    var percent = 0;
    function loadedSounds(e) {
      loaded++; // Increment loaded counter to check if all sounds can be played
      percent = Math.floor((100 * loaded) / all_sounds.length); // Calculate percentage
      document.getElementById("count").innerText = percent + "%"; // Set textual percentage to load status
      // document.querySelector(".load_fill").style.width = percent + "%";

      document.getElementById("water").style.transform = `translate(0, ${
        100 - percent
      }%)`;

      if (loaded == all_sounds.length) {
        for (var i = 0; i < all_sounds.length; i++) {
          all_sounds[i].removeEventListener("canplaythrough", loadedSounds);
        }
        sound.pause();
        setTimeout(function fadeOutLoader() {
          var fadeTarget = document.getElementById("load_screen");
          fadeTarget.style.opacity = 0;
          setTimeout(function () {
            // Remove node
            document.querySelector("body").removeChild(fadeTarget);
          }, 2000);
        }, 1000);
      }
    }
  });

  // DOM Elements for clock control
  var hours = document.querySelector(".hours");
  var minutes = document.querySelector(".minutes");
  var seconds = document.querySelector(".seconds");
  var separator = document.querySelector(".separator");

  // DOM Elements that control play/stop sounds
  var play_btn = document.querySelectorAll(".play");

  // Adding listeners to every play/stop button
  for (var i = 0; i < play_btn.length; i++) {
    play_btn[i].addEventListener("click", playSound, false);
  }

  // DOM elements that controll sound volume
  var volume_control = document.querySelectorAll(".volume_bar");

  // Adding listeners to every volume control slider
  for (var i = 0; i < volume_control.length; i++) {
    volume_control[i].addEventListener("input", volumeSound, false);
    volume_control[i].style.opacity = 0;
  }

  // DOM element that mutes and unmutes the page
  var mute_btn = document.querySelector(".mute_btn a");
  var is_muted = false;
  mute_btn.addEventListener("click", muteDocument, false);

  // DOM element that resets the sounds
  var reset_btn = document.querySelector(".reset_btn a");
  reset_btn.addEventListener("click", resetSounds, false);

  // Controlling stoping and playing the sound
  function playSound(e) {
    if (is_muted) {
      muteDocument();
    }
    var targetElement = e.target || e.srcElement;
    var selectedSound = targetElement.parentElement.parentElement.querySelector(
      "audio"
    );
    var volumeControler = targetElement.parentElement.parentElement.querySelector(
      ".volume_bar"
    );
    var soundImage = targetElement.parentElement.parentElement.querySelector(
      "img"
    );

    if (selectedSound.paused) {
      volumeControler.style.opacity = 1;
      selectedSound.loop = true;
      if (volumeControler.value == 0) {
        volumeControler.value = 0.1;
      }
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
  }

  // Controlling volume of the sounds
  function volumeSound(e) {
    if (is_muted) {
      muteDocument();
    }
    var targetElement = e.target || e.srcElement;
    var vol = targetElement.value;
    var selectedSound = targetElement.parentElement.querySelector("audio");
    selectedSound.volume = vol;
  }

  var playing_sounds = [];
  function muteDocument() {
    if (!is_muted) {
      playing_sounds.length = 0;
      is_muted = true;
      document.querySelector(".unmuted").style.display = "none";
      document.querySelector(".muted").style.display = "inline";
      var all_audio = document.querySelectorAll("audio");
      for (var i = 0; i < all_audio.length; i++) {
        if (!all_audio[i].paused) {
          playing_sounds.push([all_audio[i], all_audio[i].volume]);
        }
      }
      playing_sounds.forEach(function (sound) {
        sound[0].volume = 0;
      });
    } else {
      is_muted = false;
      document.querySelector(".unmuted").style.display = "inline";
      document.querySelector(".muted").style.display = "none";
      playing_sounds.forEach(function (sound) {
        sound[0].volume = sound[1];
      });
    }
  }

  function resetSounds() {
    var all_audio = document.querySelectorAll("audio");
    for (var i = 0; i < all_audio.length; i++) {
      all_audio[i].pause();
      all_audio[i].currentTime = 0;
      all_audio[i].value = 0;
    }
    var all_play_btns = document.querySelectorAll(".start_btn img");
    for (var i = 0; i < all_play_btns.length; i++) {
      all_play_btns[i].classList.remove("playing");
    }
    var all_volume_control = document.querySelectorAll(".volume_bar");
    for (var i = 0; i < all_volume_control.length; i++) {
      all_volume_control[i].value = 0;
      all_volume_control[i].style.opacity = 0;
    }
  }
});

