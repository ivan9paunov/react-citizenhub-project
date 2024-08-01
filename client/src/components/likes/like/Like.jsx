import { Link } from "react-router-dom";
import { useCreateLike } from "../../../hooks/useLikes.js";

export default function Like({
    reportId,
    onLike
}) {
    const like = useCreateLike();

    const reportLikeHandler = async () => {
        try {
            const newLike = await like(reportId);

            onLike(newLike);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Link onClick={reportLikeHandler} className="nav-link text-uppercase text-center w-100 active">Like</Link>
    );
}