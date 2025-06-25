import {expect, test} from "@odoo/hoot";
import {animationFrame, click, edit} from "@odoo/hoot-dom";
import {Counter} from "@owl_counter/components/counter.esm";
import {mountWithCleanup} from "@web/../tests/web_test_helpers";

test("Adding a counter", async () => {
    await mountWithCleanup(Counter);
    expect(".o_counter_element").toHaveCount(0);
    click(".o_counter_add_button");
    await animationFrame();
    expect(".o_counter_element").toHaveCount(1);
    expect(".o_counter_element_name").toHaveValue("New Counter");
    click(".o_counter_element_name");
    await animationFrame();
    edit("My Counter");
    await animationFrame();
    expect(".o_counter_element_name").toHaveValue("My Counter");
    expect(".o_counter_element_value").toHaveText("0");
    click(".o_counter_element_increment");
    await animationFrame();
    expect(".o_counter_element_value").toHaveText("1");
    click(".o_counter_element_delete");
    await animationFrame();
    expect(".o_counter_element").toHaveCount(0);
});
