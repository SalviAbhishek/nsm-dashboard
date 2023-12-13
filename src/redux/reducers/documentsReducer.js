const initialState = {
  documents: [],
  filteredDocuments: [],
  isLoading: true,
  searchTerm: "",
};
const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DOCUMENTS":
      return {
        ...state,
        documents: action?.payload,
        filteredDocuments: action?.payload,
      };

    case "SEARCH_DOCUMENT":
      var input = action?.payload;
      let docs = state?.documents.filter((document) => {
        // Check if the document's name includes the input
        if (document.name.toLowerCase().includes(input.toLowerCase())) {
          if (document.sub_items && document?.sub_items?.length > 0) {
            // Recursively filter children
            document.sub_items = filterDocumentsForFolder(
              document.sub_items,
              input
            );
            return document.sub_items.length > 0;
          }
          return true;
        }
        // Check if the document is a folder and has children
        if (document.sub_items && document?.sub_items?.length > 0) {
          // Recursively filter children
          document.sub_items = filterDocumentsForFolder(
            document.sub_items,
            input
          );
          return document.sub_items.length > 0;
        }

        return false;
      });

      return {
        ...state,
        searchTerm: action.payload,
        filteredDocuments: docs,
      };

    case "FOLDER_OPENED":
      let id = action.payload;
      let docsx = [...state.filteredDocuments];
      let index = docsx.findIndex((doc) => doc.id === id);
      docsx[index].is_opened = !docsx[index].is_opened;
      return {
        ...state,
        // documents: action?.payload,
        filteredDocuments: docsx,
      };

    default:
      return state;
  }
};

// Helper function to filter documents for a folder
function filterDocumentsForFolder(sub_items, input) {
  return sub_items.filter((doc) => {
    // Check if the child's name includes the input
    if (doc.name.toLowerCase().includes(input.toLowerCase())) {
      return true;
    }

    // Check if the child is a folder and has children
    if (doc.sub_items) {
      // Recursively filter children
      doc.sub_items = filterDocumentsForFolder(doc.sub_items, input);
      return doc.sub_items.length > 0;
    }

    return false;
  });
}
export default filesReducer;
