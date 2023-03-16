import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPlacemarks,fenner, valley, bog, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

    let valleyList = null;

    setup(async () => {
        await db.init("mongo");
        await db.categoryStore.deleteAllCategories();
        await db.placemarkStore.deleteAllPlacemarks();
        valleyList = await db.categoryStore.addCategory(bog);
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            testPlacemarks[i] = await db.placemarkStore.addPlacemark(valleyList._id, testPlacemarks[i]);
        }
    });

    test("create single placemark", async () => {
        const fennerList = await db.categoryStore.addCategory(fenner);
        const placemark= await db.placemarkStore.addPlacemark(fennerList._id, bog)
        assert.isNotNull(placemark._id);
        assertSubset (bog, placemark);
    });

    test("create multiple placemarkApi", async () => {
        const placemarks = await db.categoryStore.getCategoryById(valleyList._id);
        assert.equal(testPlacemarks.length, testPlacemarks.length)
    });

    test("delete all placemarkApi", async () => {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(testPlacemarks.length, placemarks.length);
        await db.placemarkStore.deleteAllPlacemarks();
        const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(0, newPlacemarks.length);
    });
});
