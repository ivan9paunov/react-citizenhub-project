import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.jsx';

export default function Header() {
    const { isAuthenticated } = useAuthContext();

    return (
        <div className="container-fluid bg-dark px-0">
            <div className="row gx-0">
                <div className="col-lg-3 bg-dark d-none d-lg-block">
                    <Link to="/" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 display-4 text-primary text-uppercase">CitizenHub</h1>
                    </Link>
                </div>
                <div className="col-lg-9">
                    <div className="row gx-0 bg-secondary d-none d-lg-flex">
                        <div className="col-lg-7 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-2 me-4">
                                <i className="fa fa-envelope text-primary me-2"></i>
                                <h6 className="mb-0">contacts@hisarya.bg</h6>
                            </div>
                            <div className="h-100 d-inline-flex align-items-center py-2">
                                <i className="fa fa-phone-alt text-primary me-2"></i>
                                <h6 className="mb-0">0337/ 6 21 80</h6>
                            </div>
                        </div>
                        <div className="col-lg-5 px-5 text-end">
                            <div className="d-inline-flex align-items-center py-2">
                                <Link className="btn btn-light btn-square rounded-circle me-2" to="https://www.facebook.com/obhisarya" target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                </Link>
                                <Link className="btn btn-light btn-square rounded-circle me-2" to="https://invite.viber.com/?g2=AQBpq4lw99ubV1JozUtnyc5A9Jtr8OhrrWgMidjUb5C3XejkORXyYfBdwlCmDb2r&fbclid=IwZXh0bgNhZW0CMTEAAR3O0hSvI0qK7ZO45VmIz_wYjDeV5cjLe6t1f6LQ6pHgqIJT224uMKHn4M0_aem_Des7AxnX0r3z03uDslqflg&lang=en" target="_blank">
                                    <i className="fab fa-viber"></i>
                                </Link>
                                <Link className="btn btn-light btn-square rounded-circle me-2" to="https://pochivka.bg/hoteli-hisarya-t167/2" target="_blank">
                                    <i className="fas fa-bed"></i>
                                </Link>
                                <Link className="btn btn-light btn-square rounded-circle me-2" to="https://www.instagram.com/hisarya.bg/" target="_blank">
                                    <i className="fab fa-instagram"></i>
                                </Link>
                                <Link className="btn btn-light btn-square rounded-circle" to="https://www.youtube.com/@gotohisarya" target="_blank">
                                    <i className="fab fa-youtube"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0 px-lg-5">
                        <Link to="index.html" className="navbar-brand d-block d-lg-none">
                            <h1 className="m-0 display-4 text-primary text-uppercase">Gymster</h1>
                        </Link>
                        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <Link to="/" className="nav-item nav-link active">Home</Link>
                                <Link to="/reports" className="nav-item nav-link">Reports</Link>
                                <Link to="/archived" className="nav-item nav-link">Archived</Link>
                                {isAuthenticated
                                    ? (
                                        <>
                                            <Link to="/report-it" className="nav-item nav-link">Report It</Link>
                                            <Link to="/logout" className="nav-item nav-link">Logout</Link>
                                        </>
                                    )
                                    : (
                                        <>
                                            <Link to="/login" className="nav-item nav-link">Login</Link>
                                            <Link to="/register" className="nav-item nav-link">Register</Link>
                                        </>
                                    )

                                }
                            </div>
                            <Link to="https://hisarya.bg/" className="btn btn-primary py-md-3 px-md-5 d-none d-lg-block" target="_blank">Official Website</Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}