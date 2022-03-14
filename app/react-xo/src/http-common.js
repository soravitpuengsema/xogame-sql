import axios from "axios"; // Promise based HTTP client RESTful API

export default axios.create({
    baseURL: "https://xogame-g1sql.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});