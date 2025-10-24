import {expect, test} from "@odoo/hoot";
import {defineModels, fields, models, mountView} from "@web/../tests/web_test_helpers";
import {defineMailModels} from "@mail/../tests/mail_test_helpers";

class Partner extends models.Model {
    name = fields.Char();
    _records = [{id: 1, name: "myemail@test.js"}];
}

defineMailModels();
defineModels([Partner]);

test("Test Email Field", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "partner",
        arch: `
                <form>
                    <field name="name" widget="email" options="{'colorProps': '#fff', 'bgColorProps': '#000'}" />
                </form>`,
    });
    expect("[name='name'] .o_input").toHaveStyle({
        "background-color": "rgb(0, 0, 0)",
        color: "rgb(255, 255, 255)",
    });
});
