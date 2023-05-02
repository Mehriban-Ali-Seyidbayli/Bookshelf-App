import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditBook = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { booksState, categoriesState } = useSelector(state => state);
    const dispatch = useDispatch();
    console.log(booksState);

    const myBook = booksState.books.find((item) => item.id === params.bookId);
    console.log(myBook);
    const [form, setForm] = useState(myBook);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.name === "" || form.author === "" || form.categoryId === "") {
            alert("Name, Author and Category is required");
            return;
        }

        if (form.name.length < 2) {
            alert("Book name cannot be less than 2 characters");
            return;
        }
        api.put(`${urls.books}/${params.bookId}`, form)
            .then(() => {
                dispatch({ type: actionTypes.bookActions.EDIT_BOOK, payload: form });
                navigate("/");
            })
            .catch((err) => { })

    };



    return (
        <div>
            <Header />
            <div className="container my-5 d-flex justify-content-center">
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Book Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="book"
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                            Author
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            placeholder="author"
                            value={form.author}
                            onChange={(event) => setForm({ ...form, author: event.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="publisher" className="form-label">
                            Publisher
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="publisher"
                            placeholder="publisher"
                            value={form.publisher}
                            onChange={(event) => setForm({ ...form, publisher: event.target.value })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            placeholder="price"
                            value={form.price}
                            onChange={(event) => setForm({ ...form, price: Number(event.target.value) })
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">
                            ISBN
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="isbn"
                            placeholder="isbn"
                            value={form.isbn}
                            onChange={(event) => setForm({ ...form, isbn: event.target.value })
                            }
                        />
                    </div>
                    <p>Select the category</p>

                    <select className="form-select"
                        // defaultValue={categoriesState.categories[0].id}
                        value={form.categoryId}
                        onChange={(event) => setForm({ ...form, categoryId: event.target.value })
                        }>


                        {categoriesState.categories.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    <div className="d-flex justify-content-center my-5">
                        <button className="btn btn-primary w-25" type="submit">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBook; 