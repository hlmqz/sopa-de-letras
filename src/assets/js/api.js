const api = "https://palabras-aleatorias-public-api.herokuapp.com";

async function apiGet(url) {
    return await fetch(url, { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Request successful', data);
            return data;
        })
        .catch(function (error) {
            console.error('Request failed', error);
            return null;
        });
}

async function multipleRandom() {
    return await apiGet(`${api}/multiple-random?count=50`);
}

export default {
    multipleRandom
};