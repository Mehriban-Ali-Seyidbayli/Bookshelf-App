import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../components/CustomModal";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { upperFirstLetters } from "../utils/functions";



const ListCategories = () => {
    const { categoriesState, booksState } = useSelector(state => state);
    const dispatch = useDispatch();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [willDeleteCategory, setWillDeleteCategory] = useState("");


    const deleteCategory = (id) => {

        api.delete(`${urls.categories}/${id}`)
            .then((resCat) => {
                dispatch({ type: actionTypes.categoryActions.DELETE_CATEGORY, payload: id });
                dispatch({ type: actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY, payload: id });

            })
            .catch(err => { })
        setOpenDeleteModal(false)
    }

    return (
        <div>
            <Header />
            <div className="container my-5">
                <div className="d-flex justify-content-end">
                    <Link to={"/add-category"} className="btn addBtn">Add Category </Link>
                </div>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">The number of registered books</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categoriesState.categories.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>You don't have any categories yet.</td>
                                </tr>
                            ) : (
                                categoriesState.categories.map((category, index) => {
                                    const books = booksState.books.filter(item => item.categoryId === category.id)
                                    console.log(books);
                                    return (
                                        <tr key={category.id} >
                                            <th scope="row">{index + 1}</th>
                                            <td>{upperFirstLetters(category.name)}</td>
                                            <td>{books.length}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setOpenDeleteModal(true)
                                                    setWillDeleteCategory(category.id)
                                                }}
                                                    className="btn btn-sm btn-danger">
                                                    Delete
                                                </button>
                                                <Link className="btn btn-sm btn-secondary mx-2" to={`/edit-category/${category.id}`}>Edit</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            )
                        }
                    </tbody>
                </table>
            </div>
            {openDeleteModal === true && (
                <CustomModal
                    title="Deleting process"
                    message="All books related to the category will be deleted. Are you sure you want to do this?"
                    onCancel={() => setOpenDeleteModal(false)}
                    onConfirm={() => deleteCategory(willDeleteCategory)}
                />)
            }

        </div>
    )
}

export default ListCategories;