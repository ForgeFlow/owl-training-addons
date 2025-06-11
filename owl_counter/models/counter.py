from odoo import fields, models


class Counter(models.Model):
    _name = "my.counter"
    _description = "Simple Counter Model"

    name = fields.Char()
    count = fields.Integer(default=0)
