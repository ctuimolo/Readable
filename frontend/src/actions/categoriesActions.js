import { FETCH_CATEGORIES } from '../actions/types';
import { url } from '../ServerURL';

export const fetchCategories = () => dispatch => {
    fetch(url + "/categories", { headers: { 'Authorization': 'whatever-you-want' } })
        .then((res) => { return (res.json()) })
        .then((data) => {
            return data.categories;
        })
        .then(data_array => dispatch({
            type: FETCH_CATEGORIES,
            payload: data_array
        })
    );
}