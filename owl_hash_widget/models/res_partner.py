from odoo import fields, models


class ResPartner(models.Model):
    _inherit = "res.partner"

    hash_value = fields.Char(string="Hash ID")
    hash_value_ro = fields.Char(string="Hash ID (Readonly)", related='hash_value', readonly=True)
