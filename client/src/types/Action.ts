import type Book from './Book';


type Action =
  | {
      type: 'books/load';
      payload: Book[];
    }
  | {
      type: 'book/add';
      payload: Book;
    }
  | {
      type: 'book/remove';
      payload: Book['id'];
    }
  | {
      type: 'book/update/checked';
      payload: Book['id'];
    }
  | {
      type: 'book/update';
      payload: Book;
    };

export default Action;
