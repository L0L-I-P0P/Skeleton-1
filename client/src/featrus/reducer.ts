import type Action from '../types/Action';
import type State from '../types/State';

export const initState: State = {
  books: [],
};

function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case 'books/load':
      return {
        ...state,
        books: action.payload,
      };
    case 'book/add':
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case 'book/remove':
      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
      };
    case 'book/update/checked':
      return {
        ...state,
        books: state.books.map((b) => (b.id === action.payload ? { ...b, status: !b.status } : b)),
      };
    case 'book/update':
      return {
        ...state,
        books: state.books.map((b) => (b.id !== action.payload.id ? b : action.payload)),
      };
    default:
      return state;
  }
}

export default reducer;
