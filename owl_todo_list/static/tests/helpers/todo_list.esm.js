import {defineModels, fields, models, onRpc} from "@web/../tests/web_test_helpers";

export class TodoItem extends models.Model {
    _name = "todo.item";
    _records = [
        {id: 1, name: "Buy groceries", completed: false},
    ];
    name = fields.Char({string: "Task"});
    completed = fields.Boolean({string: "Completed"});
    priority = fields.Selection({
        string: "Priority",
        selection: [
            ["low", "Low"],
            ["intermediate", "Intermediate"],
            ["high", "High"],
        ], default: "intermediate",
    });
    color = fields.Char({default: "#ffffff"});
    _views = {
        form: `
            <form>
                <sheet>
                    <group>
                        <field name="name" />
                        <field name="color" widget="color" />
                        <field name="priority" />
                        <field name="completed" />
                    </group>
                </sheet>
            </form>
        `
    }
};

defineModels([TodoItem]);

onRpc("todo.item", "get_priority_options", () => {
    return [
        {value: "low", text: "Low"},
        {value: "intermediate", text: "Intermediate"},
        {value: "high", text: "High"},
    ];
});