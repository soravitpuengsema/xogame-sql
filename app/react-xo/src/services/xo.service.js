import http from "../http-common";

class XODataService {
    getAll() {
        return http.get("/");
    }

    create(data) {
        return http.post("/todo", data);
    }

    update(id,data) {
        return http.put(`/${id}`, data);
    }
}

export default new XODataService();