var axios = require('axios');

var apiPath = "http://localhost:3376";

require('../app');

// Launch request to create players
describe("Players", function () {

    describe("GET /", function () {
        it("Get all existing players (empty)", function () {
            axios.get(`${apiPath}/admin/resources/users`)
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
        it("Create a player (status 204)", function () {

            axios.post(`${apiPath}/admin/player`, {
                login: "otman-le-rigolo",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 48.46758,
                lng: 50.4676,
                ttl: 500
            }).then((resp) => {
                expect(resp.status).toBe(204);
            }).catch((error) => {
                // Should be not here
                expect(true).toBe(false);
            });

        });
    });

    describe("POST /", function () {
        it("Create another player (status 204)", function () {

            axios.post(`${apiPath}/admin/player`, {
                login: "samy-le-pas-drole",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 48,
                lng: 50.4676,
                ttl: 50.0
            }).then((resp) => {
                expect(resp.status).toBe(204);
            }).catch((error) => {
                // Should be not here
                expect(true).toBe(false);
            });

        });
    });

    describe("POST /", function () {
        it("Create a player (missing argument)", function () {

            axios.post(`${apiPath}/admin/player`, {
                login: "another-user",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 48,
                lng: 50.4676
            }).then((resp) => {
                // Should be not here
                expect(true).toBe(false);
            }).catch((error) => {
                expect(error.response.status).toBe(400);
            });
        });
    });

    describe("POST /", function () {
        it("Create a player (already exists)", function () {

            axios.post(`${apiPath}/admin/player`, {
                login: "otman-le-rigolo",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 48,
                lng: 50.4676,
                ttl: 180
            }).then((resp) => {
                // Should be not here
                expect(true).toBe(false);
            }).catch((error) => {
                expect(error.response.status).toBe(409);
            });

        });
    });

    describe("GET /", function () {
        it("Get all existing players (should be 2)", function () {

            axios.get(`${apiPath}/admin/resources/users`)
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
