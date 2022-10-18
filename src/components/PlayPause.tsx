import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

interface PlayPauseProps {
    isPlaying: boolean;
    activeSong: any;
    song: any;
    handlePause: () => void;
    handlePlay: () => void;
}

const PlayPause: React.FC<PlayPauseProps> = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
    isPlaying && activeSong?.title === song.title ? (
        <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
    ) : (
        <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
    );

export default PlayPause;
