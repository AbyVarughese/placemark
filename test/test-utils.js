export function assertSubset(subset, superset) {
    if (typeof superset !== "object" || superset === null || typeof subset !== "object" || subset === null) return false;

    if (superset instanceof Date || subset instanceof Date) return superset.valueOf() === subset.valueOf();

    return Object.keys(subset).every((key) => {
        if (!superset.propertyIsEnumerable(key)) return false;
        const subsetItem = subset[key];
        const supersetItem = superset[key];
        if (typeof subsetItem === "object" && subsetItem !== null ? !assertSubset(supersetItem, subsetItem) : supersetItem !== subsetItem) return false;

        return true;
    });
}
