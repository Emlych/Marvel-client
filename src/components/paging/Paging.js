import "./paging.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Paging = ({ page, setPage, comics }) => {
  return (
    <div className="pagination">
      {page === 1 ? (
        <div className="page none">
          <FontAwesomeIcon icon={faAngleLeft} className="icon" />
          <div className="line-left"></div>
        </div>
      ) : (
        <button
          onClick={() => page >= 2 && setPage(page - 1)}
          className="btn-left"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          <div className="line-left"></div>
        </button>
      )}

      <div className="page">{page}</div>
      {page === Math.ceil(comics.count / 8) ? (
        <div className="page none">
          <div className="line-right"></div>{" "}
          <FontAwesomeIcon icon={faAngleRight} className="icon" />
        </div>
      ) : (
        <button
          onClick={() => page <= comics.count / 8 && setPage(page + 1)}
          className="btn-right"
        >
          <div className="line-right"></div>{" "}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      )}
    </div>
  );
};

export default Paging;
