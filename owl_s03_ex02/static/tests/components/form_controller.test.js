import {expect, test} from "@odoo/hoot";
import {
    animationFrame,
    click,
    edit,
    manuallyDispatchProgrammaticEvent,
    queryOne,
} from "@odoo/hoot-dom";
import {
    clickSave,
    defineModels,
    fields,
    models,
    mountView,
} from "@web/../tests/web_test_helpers";

class Contact extends models.Model {
    _name = "test.owl.contact";
    name = fields.Char();
    _records = [{id: 1, name: ""}];
}

defineModels([Contact]);

test("Testing Form Controller", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "test.owl.contact",
        arch: `
            <form>
                <field name="name" />
            </form>
        `,
    });
    expect(".o_field_widget[name='name'] input").toHaveCount(1);
    click(".o_field_widget[name='name'] input");
    await animationFrame();
    edit("Test Name");
    await animationFrame();
    expect(".o_reward svg.o_reward_rainbow_man").toHaveCount(0);
    await clickSave();
    expect(".o_reward svg.o_reward_rainbow_man").toHaveCount(1);
    await manuallyDispatchProgrammaticEvent(queryOne(".o_reward"), "animationend", {
        animationName: "reward-fading-reverse",
    });
    await animationFrame();
    expect(".o_reward").toHaveCount(0);
});
