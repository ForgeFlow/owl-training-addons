import {expect, test} from "@odoo/hoot";
import {defineModels, fields, models, mountView} from "@web/../tests/web_test_helpers";
import {defineMailModels} from "@mail/../tests/mail_test_helpers";

defineMailModels();

class Contact extends models.Model {
    _name = "test.owl.contact";
    email = fields.Char();
    _records = [{id: 1, email: "john.doe@odoo-community.org"}];
}

defineModels([Contact]);

test("Testing email field widget", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "test.owl.contact",
        arch: `
            <form>
                <field name="email" widget="email" options="{'colorProps': '#0b5034', 'bgColorProps': '#f0f0f0'}" />
            </form>
        `,
    });
    expect(".o_field_widget[name='email'] input").toHaveCount(1);
    expect(".o_field_widget[name='email'] input").toHaveStyle({
        color: "rgb(11, 80, 52)",
        "background-color": "rgb(240, 240, 240)",
    });
});
