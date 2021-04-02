var request = require("request");

var apiPath = "http://localhost:3376";

// Launch request to create impact
describe("Impacts", function () {

    it("Get all existing impacts (should be empty)", function () {

        var req = {
            uri: `${apiPath}/api/resources/impacts`,
            headers: { 'Accept': 'application/json' }
        };

        request.get(req, function (error, resp, body) {
            expect(resp.body.length).toBe(2);
        });

    });

    it("Create an impact (status 204)", function () {

        var req = {
            uri: `${apiPath}/admin/impact`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat: 76.48978,
                lng: 47.468678,
                type: "Astra-X",
                ttl: 60
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(204);
        });

    });

    it("Create an impact (status 204)", function () {

        var req = {
            uri: `${apiPath}/admin/impact`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat: 73,
                lng: 47.468678,
                type: "Astra-X",
                ttl: 45
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(204);
        });

    });

    it("Create an impact (missing argument)", function () {

        var req = {
            uri: `${apiPath}/admin/impact`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat: 76.48978,
                lng: 47.468678,
                type: "Astra-X"
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(400);
        });

    });

    it("Create an impact (invalid argument type)", function () {

        var req = {
            uri: `${apiPath}/admin/impact`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat: "should not work",
                lng: 47.468678,
                type: "Astra-X"
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(400);
        });

    });

    it("Get all existing impacts (should be 2)", function () {

        var req = {
            uri: `${apiPath}/api/resources/impacts`,
            headers: { 'Accept': 'application/json' }
        };

        request.get(req, function (error, resp, body) {
            expect(resp.body.length).toBe(2);
        });

    });

});
