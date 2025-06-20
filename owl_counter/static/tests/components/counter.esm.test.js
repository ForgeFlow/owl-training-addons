import {animationFrame, click, edit} from "@odoo/hoot-dom";
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
    expect(".o_counter_element_name").toHaveValue("New Counter");
    click(".o_counter_element_name");
    await animationFrame();
    edit("My new counter");
    await animationFrame();
    expect(".o_counter_element_name").toHaveValue("My new counter");
    expect(".o_counter_element_count").toHaveText("0");
    click(".o_counter_element_increment");
    await animationFrame();
    expect(".o_counter_element_count").toHaveText("1");
    click(".o_counter_element_delete");
    await animationFrame();
    expect(".o_counter_element").toHaveCount(0);
});
