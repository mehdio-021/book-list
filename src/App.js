import React, { useState, useEffect } from "react";

import View from "./View";

const getDataFromLs = () => {
  const data = localStorage.getItem("books");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

function App() {
  const [books, setBooks] = useState(getDataFromLs()); //چون ما قراره آبجكت بفرستيم كه هر آبجكت اطلاعات يك كتاب رو داره =>ميشه آرايه از آبجكت ها
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [num, setNum] = useState("");
  /*  console.log(books) */

  const handleSubmit = (e) => {
    e.preventDefault();
    let book = {
      title: title,
      author,
      num,
    };
    /* console.log(book); */
    setBooks([...books, book]);
  };

  const deleteBook = (num) => {
    const filtrtBooks = books.filter((element, index) => {
      return element.num !== num;
    });
    setBooks(filtrtBooks);
  };

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <div className="wrapper">
      <h1>لیست کتاب ها</h1>
      <p>کتاب جدید خود را به کتابختانه اضافه کنید</p>
      <main>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label>عنوان</label>
              <input
                type="text"
                className="form-control"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="form-group mt-4">
              <label>نویسنده</label>
              <input
                type="text"
                className="form-control"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></input>
            </div>
            <div className="form-group mt-4">
              <label>شماره</label>
              <input
                type="text"
                className="form-control"
                required
                value={num}
                onChange={(e) => setNum(e.target.value)}
              ></input>
            </div>
            <div className="form-group mt-4">
              <button className="btn btn-success btn-md " type="submit">
                افزودن
              </button>
            </div>
          </form>
        </div>
        <div className="view-container ">
          {books.length > 0 && (
            <>
              <div className="table-responsive w-100">
                <table className="table ">
                  <thead>
                    <tr>
                      <th>#شماره</th>
                      <th>عنوان</th>
                      <th>نويسنده</th>
                      <th>حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View books={books} deleteBook={deleteBook} />
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-danger btn-md"
                onClick={() => setBooks([])}
              >
                حذف همه
              </button>
            </>
          )}
          {books.length < 1 && (
            <div className="mt-3">كتابي توي كتابخونه نداريم</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
