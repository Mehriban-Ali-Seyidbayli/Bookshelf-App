import { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {

    const { categoriesState } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.name === "") {
            alert("Please enter the name of category!")
            return
        }

        const hasCategory = categoriesState.categories.find((item) => item.name.toLowerCase() === form.name.toLowerCase())
        console.log(hasCategory);
        if (hasCategory !== undefined) {
            alert("There is already such a category.")
            return

        }

        api
            .post(urls.categories, form)
            .then((res) => {
                dispatch({ type: actionTypes.categoryActions.ADD_CATEGORIES, payload: form })
                navigate("/list-categories");

            })
            .catch(err => { })
    }

    return (
        <div>
            <Header />

            <div className="container my-5 d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input type="text" className="form-control" id="name" placeholder="category" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <button type="submit" className="btn btn-primary w-25">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;