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
    email = fields.Char();
    _records = [{id: 1, email: "john.doe@odoo.com"}];
}

defineModels([Contact]);

test("Email widget color", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "contact",
        arch: `
           <form>
               <field name="email" options="{'colorProps': '#0b5034', 'bgColorProps': '#f0f0f0'}" widget="email" />
           </form>`,
    });
    expect(".o_field_widget[name='email'] input").toHaveCount(1);
    expect(".o_field_widget[name='email'] input").toHaveStyle({
        "background-color": "rgb(240, 240, 240)",
        color: "rgb(11, 80, 52)",
    });
});

test("Notification", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "contact",
        arch: `
           <form>
               <field name="email" options="{'colorProps': '#0b5034', 'bgColorProps': '#f0f0f0'}" widget="email" />
           </form>`,
    });
    click(".o_field_widget[name='email'] input");
    await animationFrame();
    edit("odoo@owl.training");
    await animationFrame();
    await clickSave();
    expect(".o_notification_content").toHaveCount(1);
});
