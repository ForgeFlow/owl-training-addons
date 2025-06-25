import {
    defineModels,
    fields,
    models,
    onRpc,
} from "@web/../tests/web_test_helpers";

export class SaleOrder extends models.Model {
    _name = "sale.order";
    date_order = fields.Date({ required: true });
    partner_id = fields.Many2one({ relation: "res.partner" })
}

export class ResPartner extends models.Model {
    _name = "res.partner";
    name = fields.Char();
}

defineModels([SaleOrder, ResPartner]);
onRpc("xxx", "fff", () => {
    return [];
});
