import { Link } from "react-router-dom";
import { useRemoveLike } from "../../../hooks/useLikes.js";

export default function Dislike({
    likeId,
    onDislike
}) {
    const dislike = useRemoveLike();

    const reportDislikeHandler = async () => {
        try {
            await dislike(likeId);

            onDislike(likeId);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Link onClick={reportDislikeHandler} className="nav-link text-uppercase text-center w-100 active">Dislike</Link>
    );
}