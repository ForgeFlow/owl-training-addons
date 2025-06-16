from odoo import fields, models


class Counter(models.Model):
    _name = "my.counter"
    _description = "Counter Model"

    name = fields.Char()
    count = fields.Integer(default=0)
