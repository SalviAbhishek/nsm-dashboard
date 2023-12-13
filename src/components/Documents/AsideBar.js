// plugins
import React from "react";

// assets
import BackIcon from "../../assets/icons/arrow-left.svg";
import FilterBarsIcon from "../../assets/icons/filter-bars.svg";

// components
import DocumentItem from "./DocumentItem";

// redux
import { useSelector, useDispatch } from "react-redux";
import { searchDocument } from "../../redux/actions/documents";

const AsideBar = () => {
  const dispatch = useDispatch();
  const documents = useSelector((state) => state?.documents?.filteredDocuments);
  const searchTerm = useSelector((state) => state?.documents?.searchTerm);

  return (
    <div className="container-docs">
      <div className="header-bar">
        <h4 className="label">Transaction Contents</h4>
        <div className="back-btn">
          <img src={BackIcon} alt="BackIcon" />
        </div>
      </div>
      <div className="collection-bar">
        <div className="collection-item">
          <h2>12</h2>
          <label>Stages</label>
        </div>
        <div className="collection-item">
          <h2>23</h2>
          <label>Subfolder</label>
        </div>
        <div className="collection-item">
          <h2>1235</h2>
          <label>Documents</label>
        </div>
        <div className="">
          <img src={FilterBarsIcon} alt="FilterBarsIcon" />
        </div>
      </div>

      {/* filter bar  */}
      <div className="filter-bar">
        <input
          type="text"
          name="filter-docs"
          placeholder="Filter by Client/Matter name"
          value={searchTerm}
          onChange={(e) => {
            dispatch(searchDocument(e?.target?.value));
          }}
        />
        <img src={FilterBarsIcon} alt="FilterBarsIcon" />
      </div>

      {/* documents listing */}
      <ul className="documents-listing">
        {documents?.map((doc, index) => (
          <DocumentItem
            key={index}
            index={index}
            name={doc?.name}
            subItems={doc?.sub_items}
            isOpened={doc?.is_opened}
            level={doc?.level}
            id={doc?.id}
            type={doc?.type}
          />
        ))}
      </ul>
    </div>
  );
};
export default AsideBar;
