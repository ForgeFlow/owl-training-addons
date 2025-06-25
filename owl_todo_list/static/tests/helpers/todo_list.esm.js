import {defineModels, fields, models, onRpc} from "@web/../tests/web_test_helpers";

export class TodoItem extends models.Model {
    _name = "todo.item";
    name = fields.Char({required: true});
    completed = fields.Boolean({default: false});
    priority = fields.Selection({
        selection: [
            ["low", "Low"],
            ["intermediate", "Intermediate"],
            ["high", "High"],
        ],
        default: "intermediate",
    });
    color = fields.Char({default: "#ffffff"});
    _records = [
        {
            id: 1,
            name: "Task 1",
            completed: false,
            priority: "intermediate",
            color: "#ff0000",
        },
    ];
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
        `,
    };
}
defineModels([TodoItem]);
onRpc("todo.item", "get_priority_options", () => {
    return [
        {value: "low", text: "Low"},
        {value: "intermediate", text: "Intermediate"},
        {value: "high", text: "High"},
    ];
});
