// plugin
import React from "react";

// assets
import FolderClosedIcon from "../../assets/icons/caret-right.svg";
import FolderOpenedIcon from "../../assets/icons/caret-down.svg";
import FolderIcon from "../../assets/icons/folder.svg";
import FileIcon from "../../assets/icons/word-blue.svg";
import InfoIcon from "../../assets/icons/info-circle-solid.svg";

// redux
import { useDispatch } from "react-redux";
import { folderOpenClose } from "../../redux/actions/documents";

const DocumentItem = ({
  index,
  name,
  subItems,
  isOpened,
  level,
  id,
  type,
  parent,
}) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <li
        data-indented={level > 1}
        onClick={() => {
          if (type === 1) {
            dispatch(folderOpenClose(id));
          }
        }}
        key={index}
        className="document-item"
        style={
          {
            // paddingLeft: `calc(${level ?? 0}* 0.8rem)`,
          }
        }
      >
        {type === 1 ? (
          <img
            src={isOpened ? FolderOpenedIcon : FolderClosedIcon}
            alt="FolderClosedIcon"
          />
        ) : null}

        <div className="doc-container">
          <div>
            {type === 1 ? (
              <img src={FolderIcon} alt="FolderIcon" />
            ) : (
              <img src={FileIcon} alt="FileIcon" />
            )}

            <span className="document-label">{name}</span>
          </div>
          <img className="info-icon" src={InfoIcon} alt="InfoIcon" />
        </div>
      </li>

      {/* sub items are rendered recursive */}
      {isOpened ? (
        <ul data-indented={isOpened}>
          {subItems?.map((doc, sIndex) => (
            <DocumentItem
              key={sIndex}
              index={sIndex}
              {...doc}
              isOpened={doc?.is_opened}
              subItems={doc.sub_items}
              id={doc?.id}
            />
          ))}
        </ul>
      ) : null}
    </React.Fragment>
  );
};

export default DocumentItem;
