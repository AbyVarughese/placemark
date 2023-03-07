import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testPlacemarks, river, mountain, bog, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Track Model tests", () => {

    let riversList = null;

    setup(async () => {
        await db.init("mongo");
        await db.categoryStore.deleteAllCategories();
        await db.placemarkStore.deleteAllPlacemarks();
        riversList = await db.categoryStore.addCategory(river);
        for (let i = 0; i < testPlacemarks.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPlacemarks[i] = await db.placemarkStore.addPlacemark(riverList._id, testPlacemarks[i]);
        }
    });

    test("create single track", async () => {
        const mountainList = await db.categoryStore.addCategory(mountain);
        const placemark= await db.placemarkStore.addTrack(mountainList._id, bog)
        assert.isNotNull(placemark._id);
        assertSubset (bog, placemark);
    });

    test("create multiple placemarkApi", async () => {
        const placemarks = await db.categoryStore.getCategoryById(riversList._id);
        assert.equal(testPlacemarks.length, testPlacemarks.length)
    });

    test("delete all placemarkApi", async () => {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(testPlacemarks.length, placemarks.length);
        await db.placemarkStore.deleteAllPlacemarks();
        const newPlacemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(0, newPlacemarks.length);
    });

    test("get a placemark - success", async () => {
        const mountainList = await db.placemarkStore.addPlacemark(mountain);
        const placemark = await db.placemarkStore.addTrack(mountainList._id, bog)
        const newPlacemark = await db.placemarkStore.getTrackById(placemark._id);
        assertSubset (bog, newPlacemark);
    });

    test("delete One Placemark - success", async () => {
        const id = testPlacemarks[0]._id;
        await db.placemarkStore.deletePlacemark(id);
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(placemarks.length, testCategories.length - 1);
        const deletedPlacemark = await db.placemarkStore.getPlacemarkById(id);
        assert.isNull(deletedPlacemark);
    });

    test("get a category - bad params", async () => {
        assert.isNull(await db.placemarkStore.getPlacemarkById(""));
        assert.isNull(await db.placemarkStore.getPlacemarkById());
    });

    test("delete One User - fail", async () => {
        await db.placemarkStore.deletePlacemark("bad-id");
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        assert.equal(placemarks.length, testCategories.length);
    });
});
