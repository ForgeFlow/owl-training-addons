import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import {FormViewDialog} from "@web/views/view_dialogs/form_view_dialog";
import { registry } from "@web/core/registry";

export class OwlTodoList extends Component {
    setup() {
        this.model = "todo.item";
        this.orm = useService("orm");
        this.dialogService = useService("dialog");
        this.priorityOptions = [];
        this.state = useState({
            taskList: [],
        });

        onWillStart(async () => {
            await this.getAllTasks();
            this.priorityOptions = await this.orm.call(
                this.model,
                "get_priority_options",
                []
            )
        })
    }

    async getAllTasks() {
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed", "priority"])
    }

    async _openForm(resid=false) {
        const result = await new Promise((resolve) => {
            this.dialogService.add(
                FormViewDialog,
                {
                    resModel: this.model,
                    resId:resid,
                    title: resid ? "Edit Task" : "New Task",
                    preventCreate: false,
                    onRecordSaved: () => resolve(true),
                },
                {onClose: ()=> resolve(false)}
            );
        });
        if (result) await this.getAllTasks();
    }

    addTask() {
        this._openForm();
    }

    editTask(task) {
        this._openForm(task.id);
    }
    async updatePriority(e, task) {
        await this.orm.write(this.model, [task.id], {priority: e.target.value})
    }
}
OwlTodoList.template = "owl_todo_list.OwlTodoList";
registry.category("actions").add("owl_todo_list.action_todo_list_js", OwlTodoList);
