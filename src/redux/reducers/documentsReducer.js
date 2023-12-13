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
  let docsArr = [];

  for (let index = 0; index < items?.length; index++) {
    if (items[index].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      docsArr.push({
        ...items[index],
        sub_items: filterItems(items[index].sub_items, searchTerm),
      });
    } else {
      let sub_items = filterItems(items[index].sub_items, searchTerm);
      if (sub_items?.length > 0) {
        docsArr.push({
          ...items[index],
          sub_items: filterItems(items[index].sub_items, searchTerm),
        });
      }
    }
  }
  return docsArr;
};

export default filesReducer;
