// plugins
import React, { useEffect } from "react";

// components
import Menu from "../components/layout/Menu";
import AsideBar from "../components/Documents/AsideBar";

// assets
import HomeIcon from "../assets/icons/house-solid.svg";
import FolderIcon from "../assets/icons/folder.svg";
import SearchIcon from "../assets/icons/search.svg";
import MicrophoneIcon from "../assets/icons/microphone.svg";
import CheveronDown from "../assets/icons/chevron-down.svg";
import FilterIcon from "../assets/icons/filter.svg";
import ServerLineIcon from "../assets/icons/server-line.svg";
import DownloadIcon from "../assets/icons/arrow-down-to-line.svg";
import ForwardBreadcrumbIcon from "../assets/icons/chevron-right.svg";
import CaretDownIcon from "../assets/icons/caret-down.svg";
import FolderClosedIcon from "../assets/icons/caret-right.svg";
import FolderOpenedIcon from "../assets/icons/caret-down.svg";
import DocumentFileIcon from "../assets/icons/word.svg";
import documents_array from "../assets/constants/Document.json";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchDocuments, searchDocument } from "../redux/actions/documents";

const DocumentsScreen = () => {
  const documents = useSelector((state) => state?.documents?.filteredDocuments);
  const searchTerm = useSelector((state) => state?.documents?.searchTerm);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDocuments(documents_array));
  }, []);
  return (
    <section className="pg-document">
      {/* aside bar */}
      <AsideBar />
      <section className="main-section">
        {/* breadcrumb */}
        <div className="md-breadcrumb">
          <img src={HomeIcon} alt="HomeIcon" />
          <ul>
            <li>
              <BreadCrumbItem name="CLIENT" />
            </li>
            <li>
              <BreadCrumbItem name="MATTER" />
            </li>
            <li>
              <BreadCrumbItem name="TRANSACTION DETAIL PAGE" />
            </li>
            <li>
              <BreadCrumbItem name="TRANSACTION CONTENTS" />
            </li>
          </ul>
        </div>

        <section className="table-section">
          {/* control bar and filter searchbox */}
          <div id="control" className="control-md">
            <div className="folder-selectbox">
              <div className="selectbox">
                <img src={FolderIcon} alt="FolderIcon" />
                <label>All (selected folder)</label>
                <img src={CheveronDown} alt="CheveronDown" />
              </div>
              <div className="searchbox">
                <img src={SearchIcon} alt="SearchIcon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    dispatch(searchDocument(e?.target?.value));
                  }}
                  placeholder="Search within all folders and content, or a specific folder’s content"
                />
                <img src={MicrophoneIcon} alt="MicrophoneIcon" />
              </div>
            </div>
            <div className="status-selectbox">
              <label>All Status</label>
              <img src={CheveronDown} alt="CheveronDown" />
            </div>
            <div className="filter-btn">
              <img src={ServerLineIcon} alt="ServerLineIcon" />
            </div>
            <div className="filter-btn">
              <img src={DownloadIcon} alt="DownloadIcon" />
            </div>
            <div className="filter-btn">
              <img src={FilterIcon} alt="FilterIcon" />
            </div>
          </div>

          {/* table started here */}
          <div id="records" className="table-md">
            <table>
              <thead>
                <tr>
                  <th data-cell=""></th>
                  <th data-cell="id">#</th>
                  <th>
                    Phase
                    <img src={CaretDownIcon} alt="CaretDownIcon" />
                  </th>
                  <th data-cell="status">
                    Status
                    <img src={CaretDownIcon} alt="CaretDownIcon" />
                  </th>
                  <th data-cell="document">
                    Document
                    <img src={CaretDownIcon} alt="CaretDownIcon" />
                  </th>
                  <th data-cell="party">
                    Responsible Party
                    <img src={CaretDownIcon} alt="CaretDownIcon" />
                  </th>
                  <th>
                    Upload Date
                    <img src={CaretDownIcon} alt="CaretDownIcon" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {documents?.map((doc, index) => (
                  <TableRowItem
                    key={index}
                    isOpened={true}
                    doc={doc}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
          {/* Menu bar */}
          <Menu />
        </section>
      </section>
    </section>
  );
};

const BreadCrumbItem = ({ name }) => {
  return (
    <div className="breadcrumb-item">
      <img src={ForwardBreadcrumbIcon} alt="ForwardBreadcrumbIcon" />
      {name}
    </div>
  );
};
const TableRowItem = ({ doc, index, isOpened }) => {
  return (
    <React.Fragment>
      <tr className={`table-row ${isOpened ? "" : "hidden"}`}>
        <td
          style={{
            paddingLeft: `calc(${doc.level ?? 0}* 0.8rem)`,
          }}
        >
          <img
            src={doc?.is_opened ? FolderOpenedIcon : FolderClosedIcon}
            alt="FolderClosedIcon"
          />
        </td>
        <td data-cell="id">
          <p>{index}</p>
        </td>
        <td data-cell="phase">
          <label>{doc?.name}</label>
          <p>{doc?.sub_items?.length} Sub Phase</p>
        </td>
        <td>
          <div
            className={`chip ${
              doc?.status === 1
                ? "not-started"
                : doc?.status === 2
                ? "pending"
                : doc?.status === 3
                ? "completed"
                : ""
            }`}
          >
            {doc?.status === 1
              ? "Not Started"
              : doc?.status === 2
              ? "Continuing"
              : doc?.status === 3
              ? "Not Started"
              : ""}
          </div>
        </td>
        <td data-cell="document">
          {doc?.type === 2 ? (
            <>
              <img src={DocumentFileIcon} alt="DocumentFileIcon" /> <p>v2.2</p>
            </>
          ) : (
            "-"
          )}
        </td>
        <td data-cell="party">
          <div className="chip">
            <p>Goksu Safi Işık Attorney P…</p>
          </div>
        </td>
        <td>
          <p>11.12.2022</p>
        </td>
      </tr>

      {doc?.sub_items?.map((subdocs, sIndex) => (
        <TableRowItem
          key={index}
          isOpened={doc?.is_opened}
          doc={subdocs}
          index={sIndex}
        />
      ))}
    </React.Fragment>
  );
};
export default DocumentsScreen;
