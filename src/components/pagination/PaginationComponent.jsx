// import React, { useEffect, useState } from "react";
// import "../../App.css";
// import paginationLeftIcon from "../../assets/paginationLeftIcon.svg";
// import paginationRightIcon from "../../assets/paginationRightIcon.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { addActivePage } from "../../utils/paginationSlice";

// const PaginationComponent = () => {
//   const [activePage, setActivePage] = useState(1);
//   // console.log("activePage", activePage);

//   const dispatch = useDispatch();

//   const perPageFromStore = useSelector((store) => store?.pagination?.perPage);

//   const totalItemsFromStore = useSelector(
//     (store) => store?.pagination?.totalItems
//   );

//   const totalPages = Math.ceil(totalItemsFromStore / perPageFromStore);
//   // console.log("totalPages", totalPages);

//   const handlePageClick = (pageNumber) => {
//     setActivePage(pageNumber);
//   };

//   const handleNext = () => {
//     if (activePage < totalPages) {
//       setActivePage(activePage + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (activePage > 1) {
//       setActivePage(activePage - 1);
//     }
//   };

//   useEffect(() => {
//     dispatch(addActivePage(activePage));
//   }, [activePage]);

//   return (
//     <>
//       <nav aria-label="Page navigation example">
//         <ul className="pagination pagination-ul-list">
//           <li
//             className={`page-item pagination-background-box ${
//               activePage === 1 ? "disabled" : ""
//             }`}
//             onClick={handlePrev}
//           >
//             <a className="page-link">
//               <img src={paginationLeftIcon} alt="Previous" />
//             </a>
//           </li>
//           <div className="pagination-web pagination-ul-list">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//               (pageNumber) => (
//                 <li
//                   key={pageNumber}
//                   className={`page-item ${
//                     activePage === pageNumber ? "active" : ""
//                   }`}
//                   onClick={() => handlePageClick(pageNumber)}
//                 >
//                   <a className="page-link pagination-page-item">{pageNumber}</a>
//                 </li>
//               )
//             )}
//           </div>
//           <div className="pagination-mobile pagination-ul-list">
//             {[1, 2, 3].map((pageNumber) => (
//               <li
//                 key={pageNumber}
//                 className={`page-item ${
//                   activePage === pageNumber ? "active" : ""
//                 }`}
//                 onClick={() => handlePageClick(pageNumber)}
//               >
//                 <a className="page-link">{pageNumber}</a>
//               </li>
//             ))}
//           </div>
//           <li
//             className={`page-item pagination-background-box ${
//               activePage === totalPages ? "disabled" : ""
//             }`}
//             onClick={handleNext}
//           >
//             <a className="page-link">
//               <img src={paginationRightIcon} alt="Next" />
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default PaginationComponent;

import React, { useEffect, useState } from "react";
import "../../App.css";
import paginationLeftIcon from "../../assets/paginationLeftIcon.svg";
import paginationRightIcon from "../../assets/paginationRightIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addActivePage } from "../../utils/paginationSlice";

const PaginationComponent = () => {
  // const [activePage, setActivePage] = useState(1);
  const [startPage, setStartPage] = useState(1);

  const dispatch = useDispatch();

  const activePageFromStore = useSelector(
    (store) => store?.pagination.activePage
  );

  // console.log("activePageFromStore", activePageFromStore, startPage);
  const perPageFromStore = useSelector((store) => store?.pagination?.perPage);
  const totalItemsFromStore = useSelector(
    (store) => store?.pagination?.totalItems
  );

  const totalPages = Math.ceil(totalItemsFromStore / perPageFromStore);
  const maxVisiblePages = 5;

  const handlePageClick = (pageNumber) => {
    dispatch(addActivePage(pageNumber));
  };

  const handleNext = () => {
    if (activePageFromStore < totalPages) {
      dispatch(addActivePage(activePageFromStore + 1));
      // setActivePage(activePage + 1);

      if (activePageFromStore + 1 > startPage + maxVisiblePages - 1) {
        setStartPage(startPage + 1);
      }
    }
  };

  const handlePrev = () => {
    if (activePageFromStore > 1) {
      dispatch(addActivePage(activePageFromStore - 1));
      // setActivePage(activePage - 1);

      if (activePageFromStore - 1 < startPage) {
        setStartPage(startPage - 1);
      }
    }
  };

  const serviceFromStore = useSelector(
    (store) => store?.searchProduct?.service
  );

  console.log(serviceFromStore, "gffghfhgffg");

  useEffect(() => {
    if (activePageFromStore !== 1) {
      dispatch(addActivePage(activePageFromStore));
    }
  }, [activePageFromStore]);

  // useEffect(() => {
  //   if (serviceFromStore) {
  //     dispatch(addActivePage(1));
  //   }
  //   // setActivePage(1);
  // }, [serviceFromStore]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-ul-list">
        {/* Left Arrow */}
        <li
          className={`page-item pagination-background-box ${
            activePageFromStore === 1 ? "disabled" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={handlePrev}
        >
          <a className="page-link">
            <img src={paginationLeftIcon} alt="Previous" />
          </a>
        </li>

        {/* Page Numbers */}
        <div className="pagination-web pagination-ul-list">
          {Array.from(
            { length: Math.min(maxVisiblePages, totalPages - startPage + 1) },
            (_, i) => startPage + i
          ).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${
                activePageFromStore === pageNumber ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handlePageClick(pageNumber)}
            >
              <a className="page-link pagination-page-item">{pageNumber}</a>
            </li>
          ))}
        </div>

        {/* Right Arrow */}
        <li
          className={`page-item pagination-background-box ${
            activePageFromStore === totalPages ? "disabled" : ""
          }`}
          style={{ cursor: "pointer" }}
          onClick={handleNext}
        >
          <a className="page-link">
            <img src={paginationRightIcon} alt="Next" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
