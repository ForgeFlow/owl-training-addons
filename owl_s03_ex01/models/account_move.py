from odoo import fields, models


class AccountMove(models.Model):
    _inherit = "account.move"

    move_hash_id = fields.Char()
