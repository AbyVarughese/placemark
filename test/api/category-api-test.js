import { EventEmitter } from "events";
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials,  bog, testCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Category API tests", () => {
    let user = null;

    setup(async () => {
        placemarkService.clearAuth();
        user = await  placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllCategories();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        bog.userid = user._id;
    });

    teardown(async () => {});

    test("create category", async () => {
        const returnedCategories = await placemarkService.createCategory(bog);
        assert.isNotNull(returnedCategories);
        assertSubset(bog, returnedCategories);
    });

    test("delete a category", async () => {
        const category = await placemarkService.createCategory(bog);
        const response = await placemarkService.deleteCategories(category._id);
        assert.equal(response.status, 204);
        try {
            const returnedCategory= await placemarkService.getCategory(category.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
        }
    });


    test("remove non-existant category", async () => {
        try {
            const response = await placemarkService.deleteCategories("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
        }
    });
});