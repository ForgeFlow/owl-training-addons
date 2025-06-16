from odoo import fields, models


class TodoItem(models.Model):
    _name = "todo.item"
    _description = "Todo Item"

    name = fields.Char(string="Task Name", required=True)
    completed = fields.Boolean()
    color = fields.Char()
    priority = fields.Selection(
        selection=[
            ("low", "Low"),
            ("intermediate", "Intermediate"),
            ("high", "High"),
        ],
        default="low",
        required=True,
    )
