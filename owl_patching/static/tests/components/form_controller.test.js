import {expect, test} from "@odoo/hoot";
import {animationFrame, click, edit} from "@odoo/hoot-dom";
import {
    clickSave,
    defineModels,
    fields,
    models,
    mountView,
} from "@web/../tests/web_test_helpers";
import {defineMailModels} from "@mail/../tests/mail_test_helpers";

defineMailModels();

class Contact extends models.Model {
    _name = "test.owl.contact";
    email = fields.Char();
    _records = [{id: 1, email: "john.doe@odoo-community.org"}];
}

defineModels([Contact]);

test("Testing Saving", async () => {
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
    click(".o_field_widget[name='email'] input");
    await animationFrame();
    edit("odoo@owl.training");
    await animationFrame();
    expect(".o_notification_content").toHaveCount(0);
    await clickSave();
    expect(".o_notification_content").toHaveCount(1);
});

test("Testing Create", async () => {
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
    expect(".o_notification_content").toHaveCount(0);
    click(".o_form_button_create");
    await animationFrame();
    expect(".o_notification_content").toHaveCount(1);
});
