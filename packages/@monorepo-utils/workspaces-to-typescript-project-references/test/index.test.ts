import path from "path";
import { toProjectReferences } from "../src";

describe("toProjectReferences", function () {
    it("support lerna.json", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/lerna"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("support yarn workspaces", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/yarn-workspaces"),
            checkOnly: true
        });
        expect(result.ok).toBe(true);
    });
    it("ok: false when some package has self-dependency", () => {
        const result = toProjectReferences({
            rootDir: path.join(__dirname, "fixtures/error.self-dependency"),
            checkOnly: true
        });
        expect(result.ok).toBe(false);
        expect(result.aggregateError).toMatchInlineSnapshot(`
            Object {
              "errors": Array [
                [Error: [packages/b] Self dependencies is something wrong: packages/b refer to packages/b],
                [Error: [packages/b] Expected values to be strictly deep-equal:
            + actual - expected

            + []
            - [
            -   {
            -     path: ''
            -   }
            - ]],
              ],
              "message": "Can not update Project References, because found 2 errors",
            }
        `);
    });
});
