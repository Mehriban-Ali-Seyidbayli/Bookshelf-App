import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";

import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import api from "../api/api";
import urls from "../api/urls";



const AddBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoriesState } = useSelector((state) => state);
    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: "",
        author: "",
        publisher: "",
        isbn: "",
        price: "",
        categoryId: categoriesState.categories[0].id
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(form);

        if (form.name === "" || form.author === "" || form.categoryId === "") {
            alert("Name, Author and Category is required");
            return;
        }

        if (form.name.length < 2) {
            alert("Book name cannot be less than 2 characters");
            return;
        }

        api
            .post(urls.books, form)
            .then((res) => {
                dispatch({
                    type: actionTypes.bookActions.ADD_BOOK,
                    payload: form
                });
                navigate("/")
            })
            .catch((err) => { });
    };

    return (
        <div>
            <Header />
            <div className="container my-5 d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
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
                            type="number"
                            className="form-control"
                            id="isbn"
                            placeholder="isbn"
                            value={form.isbn}
                            onChange={(event) => setForm({ ...form, isbn: event.target.value })
                            }
                        />
                    </div>
                    <p>Select the category</p>
                    <select
                        className="form-select"
                        // defaultValue={categoriesState.categories[0].id}
                        value={form.categoryId}
                        onChange={(event) => setForm({ ...form, categoryId: event.target.value })
                        }>

                        {categoriesState.categories.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>

                    <div className="d-flex justify-content-center my-5">
                        <button className="btn btn-primary w-25" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;