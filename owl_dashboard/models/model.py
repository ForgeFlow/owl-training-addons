from odoo import api, fields, models


class Model(models.Model):
    _name = "model"
    _description = "Model"

    name = fields.Char(string="Name", required=True)