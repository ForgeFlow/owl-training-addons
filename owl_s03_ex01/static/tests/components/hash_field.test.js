import {expect, test} from "@odoo/hoot";
import {animationFrame, click, queryOne} from "@odoo/hoot-dom";
import {defineModels, fields, models, mountView} from "@web/../tests/web_test_helpers";
import {defineMailModels} from "@mail/../tests/mail_test_helpers";

defineMailModels();

class Contact extends models.Model {
    _name = "test.owl.contact";
    hash = fields.Char();
    _records = [{id: 1, hash: ""}];
}

defineModels([Contact]);

test("Testing hash Field", async () => {
    await mountView({
        type: "form",
        resId: 1,
        resIds: [1],
        resModel: "test.owl.contact",
        arch: `
            <form>
                <field
                    name="hash"
                    widget="hash_generator"
                    options="{'strLength': 32}"
                />
            </form>
        `,
    });
    expect(".o_field_widget[name='hash'] input").toHaveCount(1);
    expect(".o_field_widget[name='hash'] .o_generate_hash_button").toHaveCount(1);
    click(".o_field_widget[name='hash'] .o_generate_hash_button");
    await animationFrame();
    expect(queryOne(".o_field_widget[name='hash'] input").value.length).toBe(32);
    expect(".o_field_widget[name='hash'] .o_generate_hash_button").toHaveCount(0);
});
