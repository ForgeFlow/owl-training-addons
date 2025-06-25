import {MockServer, contains, mountWithCleanup} from "@web/../tests/web_test_helpers";
import {animationFrame, click, edit, select} from "@odoo/hoot-dom";
import {expect, test} from "@odoo/hoot";
import {SaleDashboard} from "@owl_s02_ex01/components/sale_dashboard.esm";

// always getting the error below
// [HOOT] RPC_ERROR: cannot find a definition for model "discuss.channel":
//  could not get model from server environment (did you forget to use `defineModels()?`)


test("Change month selection", async () => {
    await mountWithCleanup(SaleDashboard);
    expect("select").toHaveCount(1);
    click("select");
    await animationFrame();
    select("1");
    await animationFrame();
});


test("Values correct in dashboard", async () => {
    await mountWithCleanup(SaleDashboard);
    expect(".o_dashboard_cards").toHaveCount(1);
    // expect(".o_dashboard_cards .o_number_card_value").toHaveCount(2);
    // click(".xxx");
    // await animationFrame();
});
