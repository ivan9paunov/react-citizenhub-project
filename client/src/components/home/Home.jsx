import styles from './Home.module.css';

import GoogleMaps from "../google-maps/GoogleMaps.jsx";

export default function Home() {
    return (
        <div className="container-fluid p-5">
            <div className="row gx-5">
                <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHheight: "500px" }}>
                    <div className="position-relative h-100">
                        <img className="position-absolute w-100 h-100 rounded" src="/img/about.jpg" style={{ objectFit: "cover" }} />
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="mb-4">
                        <h1 className="display-3 text-uppercase mb-0">Welcome to CitizenHub</h1>
                    </div>
                    <h4 className="text-body mb-4">Helping you address issues in Hisarya</h4>
                    <p className="mb-4" style={{ textAlign: "justify", textIndent: '2em' }}>CitizenHub is your go-to platform for reporting and resolving various issues in our beautiful town of Hisarya. From improper parking and lost belongings to road maintenance requests, public lighting problems, and illegal dumping, we are here to ensure your concerns are heard and addressed swiftly and decisively. Join us in making Hisarya a better place for everyone.</p>
                    <div className="rounded bg-dark p-5">
                        <div className={styles.contactUsContainer}>WHERE TO FIND US?</div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="pills-1">
                                <p className="text-secondary text-center text-uppercase my-3"><span className="text-light fw-bold">Address: </span>General Gurko 14, Hisarya, 4180, Bulgaria</p>
                                <GoogleMaps />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}