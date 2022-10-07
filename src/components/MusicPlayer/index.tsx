import { useState, useEffect, FormEvent, SyntheticEvent } from "react";

import { nextSong, prevSong, playPause } from "../../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";

const MusicPlayer: React.FC = () => {
    const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useAppSelector((state) => state.player);
    const [duration, setDuration] = useState<number>(0);
    const [seekTime, setSeekTime] = useState<number>(0);
    const [appTime, setAppTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0.3);
    const [repeat, setRepeat] = useState<boolean>(false);
    const [shuffle, setShuffle] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (currentSongs.length) dispatch(playPause(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const handlePlayPause = (): void => {
        if (!isActive) return;

        if (isPlaying) {
            dispatch(playPause(false));
        } else {
            dispatch(playPause(true));
        }
    };

    const handleNextSong = (): void => {
        dispatch(playPause(false));

        if (!shuffle) {
            dispatch(nextSong((currentIndex + 1) % currentSongs.length));
        } else {
            dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
        }
    };

    const handlePrevSong = (): void => {
        if (currentIndex === 0) {
            dispatch(prevSong(currentSongs.length - 1));
        } else if (shuffle) {
            dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
        } else {
            dispatch(prevSong(currentIndex - 1));
        }
    };

    return (
        <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
            <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
            <div className="flex-1 flex flex-col items-center justify-center">
                <Controls
                    isPlaying={isPlaying}
                    isActive={isActive}
                    repeat={repeat}
                    setRepeat={setRepeat}
                    shuffle={shuffle}
                    setShuffle={setShuffle}
                    currentSongs={currentSongs}
                    handlePlayPause={handlePlayPause}
                    handlePrevSong={handlePrevSong}
                    handleNextSong={handleNextSong}
                />
                <Seekbar
                    value={appTime}
                    min={0}
                    max={duration}
                    onInput={(event: FormEvent<HTMLInputElement>) =>
                        setSeekTime(+(event.target as HTMLInputElement).value)
                    }
                    setSeekTime={(time: number) => setSeekTime(time)}
                    appTime={appTime}
                />
                <Player
                    activeSong={activeSong}
                    volume={volume}
                    isPlaying={isPlaying}
                    seekTime={seekTime}
                    repeat={repeat}
                    currentIndex={currentIndex}
                    onEnded={handleNextSong}
                    onTimeUpdate={(event: SyntheticEvent<HTMLAudioElement>) =>
                        setAppTime((event.target as HTMLAudioElement).currentTime)
                    }
                    onLoadedData={(event: SyntheticEvent<HTMLAudioElement>) =>
                        setDuration((event.target as HTMLAudioElement).duration)
                    }
                />
            </div>
            <VolumeBar
                value={volume}
                min={0}
                max={1}
                onChange={(event: FormEvent<HTMLInputElement>) => setVolume(+(event.target as HTMLInputElement).value)}
                setVolume={setVolume}
            />
        </div>
    );
};

export default MusicPlayer;
