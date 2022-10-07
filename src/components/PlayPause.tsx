interface PlayPauseProps {
    isPlaying: boolean;
    activeSong: any;
    song: any;
    handlePause: () => void;
    handlePlay: () => void;
}

const PlayPause: React.FC<PlayPauseProps> = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (
    <div>Loader</div>
);

export default PlayPause;
