import datetime

from odoo import api, fields, models


class Model(models.Model):
    _name = "model"
    _description = "Model"

    name = fields.Char(string="Name", required=True)

    @api.model
    def get_values(self):
        date = datetime.datetime.now()
        month_start = datetime.date(date.year, date.month, 1)
        sales_order = self.env["sale.order"].search(
            [("expected_date", ">=", month_start), ("expected_date", "<=", date)]
        )
        sales_order_count = len(sales_order)
        new_customers = self.env["res.partner"].search(
            [("name", "!=", False)]
        )  # TODO filter
        new_customers_count = len(new_customers)
        return {
            "salesOrderCount": sales_order_count,
            "newCustomersCount": new_customers_count,
        }
