import axios from "axios";

const instance=axios.create({
    baseURL:'https://api-l5vlvl6otq-uc.a.run.app'//the API(cloud function) URL
});

export default instance;