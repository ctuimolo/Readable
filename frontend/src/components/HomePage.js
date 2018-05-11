import React, { Component } from 'react';
import { connect } from 'react-redux';
import Posts from './Posts';
import { fetchCategories } from '../actions/categoriesActions'


class HomePage extends Component {

    componentWillMount() {
        this.props.fetchCategories();
    }

    render() {
        return (
            <div className="home-page">
                <Posts categories={this.props.categories} params={this.props.match.params}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.reducedCategories.items
})

export default connect(mapStateToProps, { fetchCategories })(HomePage);