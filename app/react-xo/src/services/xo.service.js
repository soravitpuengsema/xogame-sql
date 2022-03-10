import http from "../http-common";

class XODataService {
    getAll() {
        return http.get("/xo");
    }

    update(data) {
        return http.put(`/xo`, data);
    }
}

export default new XODataService();