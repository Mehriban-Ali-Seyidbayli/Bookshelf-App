import React from "react";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";


const HomePage = () => {


    return (
        <div>
            <Header />
            <div className="container">
                <ListBooks />
            </div>

        </div>


    )
}

export default HomePage
