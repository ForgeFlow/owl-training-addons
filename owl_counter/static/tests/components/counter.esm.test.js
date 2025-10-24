import {animationFrame, click, edit, queryAllTexts} from "@odoo/hoot-dom";
import {expect, test} from "@odoo/hoot";
import {Counter} from "@owl_counter/components/counter.esm";
import {mountWithCleanup} from "@web/../tests/web_test_helpers";

test("Adding a counter", async () => {
    await mountWithCleanup(Counter);
    expect(".o_counter_add_counter").toHaveText("New");
    expect(".o_counter_element").toHaveCount(0);
    click(".o_counter_add_counter");
    await animationFrame();
    expect(".o_counter_element").toHaveCount(1);
});
test("Editing Counter Name", async () => {
    await mountWithCleanup(Counter);
    click(".o_counter_add_counter");
    await animationFrame();
    expect(".o_counter_element_name").toHaveValue("New Counter");
    click(".o_counter_element_name");
    await animationFrame();
    edit("My new counter");
    await animationFrame();
    expect(".o_counter_element_name").toHaveValue("My new counter");
});
test("Incrementing Counter", async () => {
    await mountWithCleanup(Counter);
    click(".o_counter_add_counter");
    await animationFrame();
    click(".o_counter_add_counter");
    await animationFrame();
    expect(queryAllTexts(".o_counter_element_count")).toEqual(["0", "0"]);
    click(".o_counter_element_increment");
    await animationFrame();
    expect(queryAllTexts(".o_counter_element_count")).toEqual(["1", "0"]);
    click(".o_counter_element_increment");
    await animationFrame();
    expect(queryAllTexts(".o_counter_element_count")).toEqual(["2", "0"]);
});
test("Deleting a Counter", async () => {
    await mountWithCleanup(Counter);
    click(".o_counter_add_counter");
    await animationFrame();
    click(".o_counter_element_delete");
    await animationFrame();
    expect(".o_counter_element").toHaveCount(0);
});
