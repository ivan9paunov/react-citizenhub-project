import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReportListItem from "./report-list-item/ReportListItem.jsx";
import Spinner from "../spinner/Spinner.jsx";
import Pagination from "../pagination/Pagination.jsx";
import { useGetAllReports } from "../../hooks/useReports.js";
import { usePageValidate } from "../../hooks/usePageValidate.js";

export default function ReportList() {
    const [filterValues, setFilterValues] = useState({
        order: 'newest',
        topic: 'all'
    });
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = Number(queryParams.get('page')) || 1;

    const { reports, isLoading, totalPages } = useGetAllReports(filterValues, currentPage);

    usePageValidate(page, totalPages, navigate, setCurrentPage, 'reports');

    const changeHandler = (e) => {
        setFilterValues(oldValues => ({
            ...oldValues,
            [e.target.name]: e.target.value
        }));
        navigate('/reports');
    };

    return (
        <div className="container-fluid p-5">
            <div className="mb-5 text-center">
                <h5 className="text-primary text-uppercase">Reports</h5>
                <h1 className="display-3 text-uppercase mb-0">Open Cases</h1>
            </div>
            {isLoading
                ? <Spinner />
                : (
                    <>
                        <div className="row g-3 pb-5 justify-content-center">
                            <div className="col-1">
                                <select
                                    name="order"
                                    id="order"
                                    value={filterValues.order}
                                    onChange={changeHandler}
                                    className="form-control bg-white text-center"
                                    style={{ height: "55px" }}
                                >
                                    <option value="info" disabled className="bg-dark text-light text-uppercase">Order By:</option>
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <select
                                    name="topic"
                                    id="topic"
                                    value={filterValues.topic}
                                    onChange={changeHandler}
                                    className="form-control bg-white text-center"
                                    style={{ height: "55px" }}
                                >
                                    <option value="info" disabled className="bg-dark text-light text-uppercase">Filter By Topic:</option>
                                    <option value="all">Show All</option>
                                    <option value="img/flooding-road.jfif">Blocked Stormwater Drain</option>
                                    <option value="img/childrens-playground.jpg">Children's Playground Repair</option>
                                    <option value="img/fallen-tree.jpg">Fallen Tree</option>
                                    <option value="img/illegal-dumping.JPG">Illegal Dumping</option>
                                    <option value="img/no-parking.png">Improper Parking</option>
                                    <option value="img/public-bin.jpeg">Litter Bins Maintenance and Garbage Collect</option>
                                    <option value="img/lost-belongings.jpg">Lost Belongings</option>
                                    <option value="img/lost-pet.jpeg">Lost Pet</option>
                                    <option value="img/road-maintenance.jpg">Road Maintenance</option>
                                    <option value="img/light-repair.jpg">Street Light Maintenance</option>
                                    <option value="img/vandalism.jpg">Vandalism</option>
                                    <option value="img/water-leak.jpeg">Water Leak</option>
                                </select>
                            </div>
                        </div>
                        <div className="row g-5">
                            {reports.length > 0
                                ? reports.map(report => <ReportListItem key={report._id} {...report} />)
                                : <h3 className="display-3 text-uppercase text-center mb-0" style={{ color: "#FB5B21", fontSize: "6rem" }}>No current issues</h3>
                            }
                        </div>
                        {reports.length && totalPages > 1
                            ? <Pagination page={page} totalPages={totalPages} />
                            : ''
                        }
                    </>
                )
            }
        </div >
    );
}