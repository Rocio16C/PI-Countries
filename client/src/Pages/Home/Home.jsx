import React from "react";
import CountriesCards from '../../Components/CountriesCards/CountriesCards.jsx';
import Pagination from "../../Components/Pagination/Pagination.jsx";
import ButtonFilter from "../../Components/ButtonFilter/ButtonFilter.jsx";
import { connect } from "react-redux";
import { isLoading } from "../../Redux/actions/index.js";
import tierra from "./../../image.gif"

class Home extends React.Component{

    componentDidMount(){
        this.props.isLoading()
    };

    
    render(){
        const {loading, nameError} = this.props
        return (
            <div>
                {loading === true ? (
                <div>
                <img src={tierra} alt="Loading..." width='100' height='100'/>
                <h2>Loading...</h2>
                </div>
                ) : (
                <>
                {nameError ? <p>{nameError}</p> : (
                <div>
                <h3>Countries</h3>
                <br/>
                <ButtonFilter/>
                <CountriesCards />
                <Pagination />
                 </div>
                )}
                </>
                )}
            </div>
        );
    };
};

function mapStateToProps(state){
    return {
        loading: state.isLoading,
        nameError: state.nameError
    };
};

export default connect(mapStateToProps, {isLoading})(Home);