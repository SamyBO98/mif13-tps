var axios = require('axios');

var apiPath = "http://localhost:3376";

require('../app');

// Launch request to create ZRR
describe("ZRR", function () {

    describe("GET /", function () {
        it("Get all existing ZRR (empty)", function () {
            axios.get(`${apiPath}/admin/zrr`)
                .then((resp) => {
                    expect(resp.status).toBe(200);
                    expect(resp.data.length).toBe(0);
                }).catch((error) => {
                    // Should be not here
                    expect(true).toBe(false);
                });
        });
    });

    describe("POST /", function () {
        it("Create a ZRR (status 204)", function () {

            axios.post(`${apiPath}/admin/zrr`, {
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: 46.467,
                lng2: 45.47987
            }).then((resp) => {
                expect(resp.status).toBe(204);
            }).catch((error) => {
                // Should be not here
                expect(true).toBe(false);
            });

        });
    });

    describe("POST /", function () {
        it("Create another ZRR (status 204)", function () {

            axios.post(`${apiPath}/admin/zrr`, {
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: 46.467,
                lng2: 77
            }).then((resp) => {
                expect(resp.status).toBe(204);
            }).catch((error) => {
                // Should be not here
                expect(true).toBe(false);
            });

        });
    });

    describe("POST /", function () {
        it("Create an impact (missing argument)", function () {

            axios.post(`${apiPath}/admin/zrr`, {
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: 46.467
            }).then((resp) => {
                // Should be not here
                expect(true).toBe(false);
            }).catch((error) => {
                expect(error.response.status).toBe(400);
            });
        });
    });

    describe("GET /", function () {
        it("Get all existing ZRR (should be 2)", function () {
            axios.get(`${apiPath}/admin/zrr`)
                .then((resp) => {
                    expect(resp.status).toBe(200);
                    expect(resp.data.length).toBe(2);
                }).catch((error) => {
                    // Should be not here
                    expect(true).toBe(false);
                });
        });
    });

});