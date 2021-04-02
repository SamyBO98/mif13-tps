var request = require("request");

var apiPath = "http://localhost:3376";

// Launch request to create player
describe("Create player", function () {

    it("Get all existing players (empty)", function () {

        var req = {
            uri: `${apiPath}/api/resources/players`,
            headers: { 'Accept': 'application/json' }
        };

        request.get(req, function (error, resp, body) {
            expect(resp.body.length).toBe(0);
        });

    });

    it("Create a player (status 204)", function () {

        var req = {
            uri: `${apiPath}/admin/player`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: "otman-le-rigolo",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 48.46758,
                lng: 50.4676,
                ttl: 500
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(204);
        });

    });

    it("Create a player (status 204)", function () {

        var req = {
            uri: `${apiPath}/admin/player`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: "samy-le-pas-drole",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 48,
                lng: 50.4676,
                ttl: 50.0
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(204);
        });

    });

    it("Create a player (missing argument)", function () {

        var req = {
            uri: `${apiPath}/admin/player`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: "otman-le-rigolo",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 76.48978,
                lng: 47.468678
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(400);
        });

    });

    it("Create a player (invalid argument type)", function () {

        var req = {
            uri: `${apiPath}/admin/player`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: "otman-le-rigolo",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 76.48978,
                lng: 47.468678,
                ttl: "should not work"
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(400);
        });

    });

    it("Create a player (already exists)", function () {

        var req = {
            uri: `${apiPath}/admin/player`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: "otman-le-rigolo",
                imageUrl: "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg",
                lat: 76.48978,
                lng: 47.468678,
                ttl: 67
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(409);
        });

    });

    it("Get all existing players (should be 2)", function () {

        var req = {
            uri: `${apiPath}/api/resources/players`,
            headers: { 'Accept': 'application/json' }
        };

        request.get(req, function (error, resp, body) {
            expect(resp.body.length).toBe(2);
        });

    });

});