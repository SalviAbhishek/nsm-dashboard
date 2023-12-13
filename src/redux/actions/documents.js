export const fetchDocuments = (documents) => ({
  type: "FETCH_DOCUMENTS",
  payload: documents,
});

export const searchDocument = (term) => ({
  type: "SEARCH_DOCUMENT",
  payload: term,
});

export const folderOpenClose = (id) => ({
  type: "FOLDER_OPENED",
  payload: id,
});
