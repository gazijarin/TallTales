export const stop = (gameAudioRef) => {
    gameAudioRef.audioEl.current.pause();
    gameAudioRef.audioEl.current.currentTime = 0;
}