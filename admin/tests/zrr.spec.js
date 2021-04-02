var request = require("request");

var apiPath = "http://localhost:3376";

// Launch request to create impact
describe("Create ZRR", function () {

    it("Get all existing ZRR (should be empty)", function () {

        var req = {
            uri: `${apiPath}/admin/zrr`,
            headers: { 'Accept': 'application/json' }
        };

        request.get(req, function (error, resp, body) {
            expect(resp.body.length).toBe(0);
        });

    });

    it("Create a ZRR (status 204)", function () {

        var req = {
            uri: `${apiPath}/admin/zrr`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: 46.467,
                lng2: 45.47987
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(204);
        });

    });

    it("Create a ZRR (status 204)", function () {

        var req = {
            uri: `${apiPath}/admin/zrr`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: 46.467,
                lng2: 77
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(204);
        });

    });

    it("Create a ZRR (missing argument)", function () {

        var req = {
            uri: `${apiPath}/admin/zrr`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: 46.467
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(400);
        });

    });

    it("Create a ZRR (invalid argument type)", function () {

        var req = {
            uri: `${apiPath}/admin/zrr`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                lat1: 76.48978,
                lng1: 47.468678,
                lat2: "should not work",
                lng2: 76.5687
            })
        };

        request.post(req, function (error, resp, body) {
            expect(resp.statusCode).toBe(400);
        });

    });


    it("Get all existing ZRR (should be 2)", function () {

        var req = {
            uri: `${apiPath}/admin/zrr`,
            headers: { 'Accept': 'application/json' }
        };

        request.get(req, function (error, resp, body) {
            expect(resp.body.length).toBe(2);
        });

    });

});