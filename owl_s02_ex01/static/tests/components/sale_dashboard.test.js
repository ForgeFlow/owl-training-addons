import {beforeEach, expect, test} from "@odoo/hoot";
import {animationFrame, click, edit, queryAllTexts, select} from "@odoo/hoot-dom";
import {
    MockServer,
    defineModels,
    fields,
    models,
    mountWithCleanup,
} from "@web/../tests/web_test_helpers";
import {mailModels} from "@mail/../tests/mail_test_helpers";
import {SaleDashboard} from "@owl_s02_ex01/components/sale_dashboard.esm";

class SaleOrder extends models.Model {
    _name = "sale.order";
    partner_id = fields.Many2one({relation: "res.partner"});
    date_order = fields.Datetime();
}
defineModels({...mailModels, SaleOrder});

beforeEach(async () => {
    await mountWithCleanup(SaleDashboard);
    const partner = MockServer.env["res.partner"].create({
        name: "Test Partner",
    });
    MockServer.env["sale.order"].create({
        partner_id: partner.id,
        date_order: "2024-10-02 12:00:00",
    });
    MockServer.env["sale.order"].create({
        partner_id: partner.id,
        date_order: "2025-10-02 12:00:00",
    });
    MockServer.env["sale.order"].create({
        partner_id: partner.id,
        date_order: "2025-11-02 12:00:00",
    });
});

test("Testing Sale Dashboard on 2025", async () => {
    expect(".sale_dashboard_container").toHaveCount(1);
    click(".sale_dashboard_year_select");
    await animationFrame();
    edit("2025");
    await animationFrame();
    click(".sale_dashboard_month_select");
    await animationFrame();
    select("10");
    await animationFrame();
    expect(".sale_dashboard_order_count .number_card_value span").toHaveText("1");
    expect(queryAllTexts(".sale_dashboard_container .table_count")).toEqual([
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "1",
        "1",
    ]);
});
test("Testing Sale Dashboard on 2024", async () => {
    click(".sale_dashboard_year_select");
    await animationFrame();
    edit("2024");
    await animationFrame();
    click(".sale_dashboard_month_select");
    await animationFrame();
    select("9");
    await animationFrame();
    expect(".sale_dashboard_order_count .number_card_value span").toHaveText("1");
    expect(queryAllTexts(".sale_dashboard_container .table_count")).toEqual([
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "1",
    ]);
});
