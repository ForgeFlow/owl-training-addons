import {defineModels, fields, models, onRpc} from "@web/../tests/web_test_helpers";

export class TodoItem extends models.Model {
    _name = "todo.item";
    name = fields.Char({});
    completed = fields.Boolean({});
    priority = fields.Selection({
        selection: [
            ["low", "Low"],
            ["intermediate", "Intermediate"],
            ["high", "High"],
        ],
        default: "low",
    });

    color = fields.Char({default: "#FFFFFF"});
    _records = [
        {
            id: 1,
            name: "Task 1",
            completed: false,
            priority: "low",
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
    /* Get_priority_options() {
        return [
            {value: "low", text: "Low"},
            {value: "intermediate", text: "Intermediate"},
            {value: "high", text: "High"},
        ]
    }*/
}

defineModels([TodoItem]);
onRpc("todo.item", "get_priority_options", () => {
    return [
        {value: "low", text: "Low"},
        {value: "intermediate", text: "Intermediate"},
        {value: "high", text: "High"},
    ];
});
