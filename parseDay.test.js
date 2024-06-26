import { parseDay } from "./parseDay.js";
import * as t from "https://deno.land/std/testing/asserts.ts";

Deno.test("simple", () => {
  t.assertEquals(parseDay("令和６年1月2日").toString(), "2024-01-02");
});
