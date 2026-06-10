from odoo import fields, models, api


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

    @api.model
    def get_priority_options(self):
        priority_list = []

        for key, value in self._fields["priority"].selection:
            priority_list.append({"value":str(key), "text":value})

        return priority_list
