import {animationFrame, click, edit} from "@odoo/hoot-dom";
import {
    clickSave,
    defineModels,
    fields,
    models,
    mountView,
} from "@web/../tests/web_test_helpers";
import {expect, test} from "@odoo/hoot";
import {defineMailModels} from "@mail/../tests/mail_test_helpers";

class Partner extends models.Model {
    name = fields.Char();
    _records = [{id: 1, name: "myemail@test.js"}];
}

defineMailModels();
defineModels([Partner]);

test("Test Notification", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "partner",
        arch: `
                <form>
                    <field name="name" />
                </form>`,
    });
    click('[name="name"] input');
    await animationFrame();
    edit("my new name");
    await animationFrame();
    await clickSave();
    expect(".o_notification_content").toHaveCount(1);
});

test("Test Create Notification", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "partner",
        arch: `
                <form>
                    <field name="name" />
                </form>`,
    });
    click(".o_form_button_create");
    await animationFrame();
    expect(".o_notification_content").toHaveCount(1);
});
