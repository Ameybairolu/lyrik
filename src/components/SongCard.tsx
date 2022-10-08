interface SongCardProps {
    song: any;
    i: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, i }) => {
    return <div>SongCard</div>;
};

export default SongCard;
