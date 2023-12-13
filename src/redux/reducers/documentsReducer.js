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
      let docsArr = [...state.documents];
      let docs = filterItems(docsArr, input);

      return {
        ...state,
        searchTerm: action.payload,
        filteredDocuments: docs,
        documents: state.documents,
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

const filterItems = (items, searchTerm) => {
  return items.reduce((acc, item) => {
    const isMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (isMatch) {
      acc.push(item);
    }

    if (item.sub_items && item.sub_items.length > 0) {
      const filteredChildren = filterItems(item.sub_items, searchTerm);
      if (filteredChildren.length > 0) {
        acc.push({ ...item, sub_items: filteredChildren });
      }
    }
    return acc;
  }, []);
};

export default filesReducer;
