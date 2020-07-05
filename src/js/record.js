export default function setupRecording() {
  // RECORDING
  let rec;
  let isRecording = false;
  let audioChunks;

  function sendData(data) {}

  // Start recording
  record.addEventListener("click", (e) => {
    if (!isRecording) {
      isRecording = true;
      // Wait for user permission to record
      navigator.mediaDevices.getUserMedia({ audio: true }).then(
        (stream) => {
          rec = new MediaRecorder(stream);
          record.style.backgroundColor = "pink";
          record.innerText = "RECORDING";
          audioChunks = [];
          // Wait for the streamed audio data
          rec.ondataavailable = (e) => {
            audioChunks.push(e.data);
            if (rec.state == "inactive") {
              // blob object stores recording as binary file
              let blob = new Blob(audioChunks, {
                type: "audio/mpeg-3",
              });

              // Convert blob to URL to add as src for audio player
              recordedAudio.src = URL.createObjectURL(blob);
              recordedAudio.controls = true;
              recordedAudio.autoplay = true;
              sendData(blob);
            }
          };
          rec.start();
        },
        () => console.log("Recording permission denied.")
      );
    }
  });

  stopRecord.addEventListener("click", () => {
    if (isRecording) {
      isRecording = false;
      record.style.backgroundColor = "white";
      record.innerText = "Start";
      rec.stop();
    //   if (!isMuted) muteDocument();
    }
  });
}
