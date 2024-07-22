import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="container-fluid py-4 py-lg-0 px-5" style={{ background: "#111111" }}>
            <div className="row gx-5">
                <div className="col-lg-8">
                    <div className="py-lg-4 text-center">
                        <p className="text-secondary mb-0">&copy; <Link className="text-light fw-bold" to="/">CitizenHub</Link>. All Rights Reserved.</p>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="py-lg-4 text-center credit">
                        <p className="text-light mb-0">Designed by <Link className="text-light fw-bold" to="https://htmlcodex.com">HTML Codex</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}