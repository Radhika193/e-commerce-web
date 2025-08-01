import axios from "axios";

const instance=axios.create({
    baseURL:'http://127.0.0.1:5001/e-commerce-1c618/us-central1/api'//the API(cloud function) URL
});

export default instance;