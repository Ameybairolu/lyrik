/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useEffect, SyntheticEvent } from "react";

interface PlayerProps {
    activeSong: any;
    isPlaying: boolean;
    volume: number;
    seekTime: number;
    onEnded: () => void;
    onTimeUpdate: (event: SyntheticEvent<HTMLAudioElement>) => void;
    onLoadedData: (event: SyntheticEvent<HTMLAudioElement>) => void;
    repeat: boolean;
    currentIndex: number;
}

const Player: React.FC<PlayerProps> = ({
    activeSong,
    isPlaying,
    volume,
    seekTime,
    onEnded,
    onTimeUpdate,
    onLoadedData,
    repeat,
    currentIndex
}) => {
    const ref = useRef<HTMLAudioElement>(null);
    // eslint-disable-next-line no-unused-expressions
    if (ref.current) {
        if (isPlaying) {
            ref.current.play();
        } else {
            ref.current.pause();
        }
    }

    useEffect(() => {
        if (ref.current !== null) {
            ref.current.volume = volume;
        }
    }, [volume]);
    // updates audio element only on seekTime change (and not on each rerender):
    useEffect(() => {
        if (ref.current !== null) {
            ref.current.currentTime = seekTime;
        }
    }, [seekTime]);

    return (
        <audio
            src={activeSong?.hub?.actions[1]?.uri}
            ref={ref}
            loop={repeat}
            onEnded={onEnded}
            onTimeUpdate={onTimeUpdate}
            onLoadedData={onLoadedData}
        />
    );
};

export default Player;
