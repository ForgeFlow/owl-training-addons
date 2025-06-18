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
        sale_orders = self.env["sale.order"].search(
            [("commitment_date", ">=", month_start), ("commitment_date", "<=", date)]
        )
        sale_order_count = len(sale_orders)
        new_customers = self.env["res.partner"].search(
            [("name", "!=", False)]
        )  # TODO filter
        new_customers_count = len(new_customers)
        return {
            "salesOrderCount": sale_order_count,
            "newCustomersCount": new_customers_count,
        }

    @api.model
    def get_table(self, year, month):
        next_month_start = datetime.date(year, month, 1)
        month_end = next_month_start - datetime.timedelta(days=1)
        if month == 12:
            one_year_before = datetime.date(year, 1, 1)
        else:
            one_year_before = datetime.date(year - 1, month + 1, 1)

        sale_orders = self.env["sale.order"].search(
            [
                ("commitment_date", ">=", one_year_before),
                ("commitment_date", "<=", month_end),
            ]
        )

        # TODO put sale order count by month

        return [
            [f"{year}-{str(month).rjust(2, '0')}", 999],
            ["2025-06", 1],
            ["2025-05", 2],
            ["2025-04", 3],
            ["2025-03", 4],
            ["2025-02", 5],
            ["2025-01", 6],
            ["2024-12", 7],
            ["2024-11", 8],
        ]
