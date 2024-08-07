import { Link } from "react-router-dom";

export default function Pagination({
    page,
    totalPages
}) {
    const getPageRange = (page, totalPages) => {
        const range = [];
        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        return range;
    };

    const pageLinks = getPageRange(page, totalPages);

    const pageIndex = (index, page) => index == page
        ? <Link to={`?page=${index}`} key={index} className="btn btn-primary custom-btn py-3 mx-1">{index}</Link>
        : <Link to={`?page=${index}`} key={index} className="btn btn-secondary custom-btn py-3 mx-1">{index}</Link>;

    return (
        <div className="row pt-5 justify-content-center">
            <div className="col-lg-6">
                <div className="btn-group w-100" role="group">
                    {page > 1
                        ? <Link to={`?page=${page - 1}`} className="btn btn-primary custom-btn py-3 mx-1">{'<'}</Link>
                        : <span className="btn btn-primary custom-btn py-3 mx-1 disabled">{'<'}</span>
                    }
                    {pageLinks.map((index) => pageIndex(index, page))}
                    {page < totalPages
                        ? <Link to={`?page=${page + 1}`} className="btn btn-primary custom-btn py-3 mx-1">{'>'}</Link>
                        : <span className="btn btn-primary custom-btn py-3 mx-1 disabled">{'>'}</span>
                    }
                </div>
            </div>
        </div>
    );
}
