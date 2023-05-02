import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import "../assets/styles/button.css";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

import { Link } from "react-router-dom";
import CustomModal from "./CustomModal"


const ListBooks = () => {
    const dispatch = useDispatch();
    const { booksState, categoriesState } = useSelector((state) => state);
    const [showdeleteModal, setShowDeleteModal] = useState(false);
    const [willDeleteBook, setWillDeleteBook] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredBooks, setFilteredBooks] = useState(booksState.books)

    useEffect(() => {
        const temp = booksState.books.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) === true ||
            item.author.toLowerCase().includes(searchText.toLowerCase()) === true)
        setFilteredBooks(temp)
        console.log(searchText);
    }, [searchText, booksState.books])

    const deleteBook = (id) => {
        dispatch({ type: actionTypes.bookActions.DELETE_BOOK_START });
        api
            .delete(`${urls.books}/${id}`)
            .then((res) => {
                dispatch({
                    type: actionTypes.bookActions.DELETE_BOOK_SUCCESS,
                    payload: id,
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.bookActions.DELETE_BOOK_FAIL,
                    payload: "Something went wrong",
                });
            });
    };

    return (
        <div className="my-5">
            <div className="d-flex justify-content-between my-5">
                <input className="form-control w-75" type="text" placeholder="Enter the name of the book or author you want" value={searchText} onChange={(e) => setSearchText(e.target.value)} />

                {
                    categoriesState.categories.length === 0 ? (<Link to={"/add-category"}>Firstly, you need to add category</Link>) : (<Link to={"/add-book"} className="btn addBtn">Add Book</Link>)
                }

            </div>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map((book, index) => {
                        const myCategory = categoriesState.categories.find((item) => item.id === book.categoryId);
                        return (
                            <tr key={book.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{myCategory.name}</td>
                                <td >
                                    <button onClick={() => {
                                        setShowDeleteModal(true)
                                        setWillDeleteBook(book.id)
                                    }} className="generalBtn deleteBtn">
                                        Delete
                                    </button>

                                    <Link to={`/edit-book/${book.id}`} className="generalBtn editBtn mx-2">
                                        Edit
                                    </Link>

                                    <Link to={`/book-detail/${book.id}`} className="generalBtn detailBtn">
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {showdeleteModal === true && (
                <CustomModal
                    title="Deleting process"
                    message="Are you sure to delete?"
                    onCancel={() => setShowDeleteModal(false)}
                    onConfirm={() => {
                        deleteBook(willDeleteBook)
                        setShowDeleteModal(false)
                    }}
                />
            )}
        </div>
    );
};

export default ListBooks;