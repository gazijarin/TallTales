export const handleMute = (app, audioRef) => {
    if(app.state.muted) {
        app.setState( { muted: false });
        audioRef.audioEl.current.muted = false;
    }
    else {
        app.setState( { muted: true });
        audioRef.audioEl.current.muted = true;
    }
}