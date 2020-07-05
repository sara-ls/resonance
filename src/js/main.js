"use strict";
import "../scss/main.scss";
// import setupRecord from "./record";
import setupLoadScreen from "./load_screen";
import setupSoundControls from "./sound_controls";
// import Cursor from "./Cursor";

const setup = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // INSERT CUSTOM CURSOR
    // let cursor = new Cursor();

    // Load DOM Elements with sound
    const allAudio = document.querySelectorAll("audio");

    // SETUP LOADING SCREEN
    setupLoadScreen();

    // Audio visualization
    const visual = document.getElementById("visual");

    // Setup sound controls
    setupSoundControls();

    // setupRecord();
  });
};

setup();
