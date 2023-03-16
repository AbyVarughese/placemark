import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, bog, maggieCredentials, testCategories, testPlacemarks, fenner } from "../fixtures.js";

suite("Placemark API tests", () => {
    let user = null;
    let bog = null;

    setup(async () => {
        placemarkService.clearAuth();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllCategories();
        await placemarkService.deleteAllPlacemarks();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        bog.userid = user._id;
        bog = await placemarkService.createCategory(bog);
    });

    teardown(async () => {});

    test("create placemark", async () => {
        const returnedPlacemark= awaitplacemarkService.createPlacemark(fenner._id, bog);
        assertSubset(bog, returnedPlacemark);
    });

    test("Delete PlacemarkApi", async () => {
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPlacemark(fenner._id, testPlacemarks[i]);
        }
        let returnedPlacemarks = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, testPlacemarks.length);
        for (let i = 0; i < returnedPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const placemark = await placemarkService.deletePlacemark(returnedPlacemarks[i]._id);
        }
        returnedPlacemarks = await placemarkService.getAllPlacemarks();
        assert.equal(returnedPlacemarks.length, 0);
    });

    test("test denormalised category", async () => {
    });
});
