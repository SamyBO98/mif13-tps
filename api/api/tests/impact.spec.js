var axios = require('axios');

var apiPath = "http://localhost:3376";

require('../app');

// Launch request to create impacts
describe("Impacts", function () {

    describe("GET /", function () {
        it("Get all existing impacts (empty)", function () {
            axios.get(`${apiPath}/admin/resources/impacts`)
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
        it("Create an impact (status 204)", function () {

            axios.post(`${apiPath}/admin/impact`, {
                lat: 76.48978,
                lng: 47.468678,
                type: "Astra-X",
                ttl: 60
            }).then((resp) => {
                expect(resp.status).toBe(204);
            }).catch((error) => {
                // Should be not here
                expect(true).toBe(false);
            });

        });
    });

    describe("POST /", function () {
        it("Create another impact (status 204)", function () {

            axios.post(`${apiPath}/admin/impact`, {
                lat: 87,
                lng: 7.34,
                type: "Bêta-X",
                ttl: 175
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

            axios.post(`${apiPath}/admin/player`, {
                lat: 76.48978,
                lng: 47.468678,
                type: "Astra-X"
            }).then((resp) => {
                // Should be not here
                expect(true).toBe(false);
            }).catch((error) => {
                expect(error.response.status).toBe(400);
            });
        });
    });

    describe("GET /", function () {
        it("Get all existing impacts (should be 2)", function () {
            axios.get(`${apiPath}/admin/resources/impacts`)
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