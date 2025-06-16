import {Component, onWillStart, useState} from "@odoo/owl";
import {FormViewDialog} from "@web/views/view_dialogs/form_view_dialog";
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

export class OwlTodoList extends Component {
    setup() {
        this.model = "todo.item";
        this.orm = useService("orm");
        this.dialogService = useService("dialog");
        this.notification = useService("notification");
        this.action = useService("action");

        this.state = useState({
            taskList: [],
        });

        onWillStart(async () => {
            await this.getAllTasks();
        });
    }

    async getAllTasks() {
        this.state.taskList = await this.orm.searchRead(
            this.model,
            [],
            ["name", "color", "completed", "priority"]
        );
    }

    async _openForm(resId = null) {
        const result = await new Promise((resolve) => {
            this.dialogService.add(
                FormViewDialog,
                {
                    resModel: this.model,
                    resId,
                    title: resId ? "Edit Task" : "New Task",
                    preventCreate: false,
                    onRecordSaved: () => resolve(true),
                },
                {onClose: () => resolve(false)}
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

    async updateColor(e, task) {
        await this.orm.write(this.model, [task.id], {color: e.target.value});
        await this.getAllTasks();
        this.notification.add("Task edited successfully", {"type": "success"});
    }

     async toggleTask(e, task) {
        await this.orm.write(this.model, [task.id], {completed: e.target.checked});
        await this.getAllTasks();
        this.notification.add(
            e.target.checked ? "Task marked completed" : "Task marked incomplete",
            {type: "success"}
        );
    }

    openInForm(task) {
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: this.model,
            res_id: task.id,
            views: [[false, "form"]],
            target: "current",
        });
    }

    async deleteTask(task) {
        try {
            await this.orm.unlink(this.model, [task.id]);
            await this.getAllTasks();
        } catch {
            this.notification.add("Couldn't delete task", {type: "danger"});
        }
    }
}

OwlTodoList.template = "owl_todo_list.OwlTodoList";
registry.category("actions").add("owl_todo_list.action_todo_list_js", OwlTodoList);
