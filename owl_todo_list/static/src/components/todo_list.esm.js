import {Component, onWillStart, useState} from "@odoo/owl";
import {FormViewDialog} from "@web/views/view_dialogs/form_view_dialog";
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

export class OwlTodoList extends Component {
    setup() {
        this.model = "todo.item";
        this.orm = useService("orm");
        this.notification = useService("notification");
        this.dialogService = useService("dialog");
        this.action = useService("action");

        this.state = useState({
            taskList: [],
            priorityOptions: [],
        });

        onWillStart(async () => {
            await this._load();
            this.state.priorityOptions = await this.orm.call(
                this.model,
                "get_priority_options",
                []
            );
        });
    }

    async getAllTasks() {
        this.state.taskList = await this.orm.searchRead(
            this.model,
            [],
            ["name", "color", "completed", "priority"]
        );
    }

    async _load() {
        this.state.taskList = await this.orm.searchRead(
            this.model,
            [],
            ["name", "color", "completed", "priority"]
        );
    }

    async _openForm(resId = false) {
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
        if (result) await this._load();
    }

    addTask() {
        this._openForm();
    }

    editTask(task) {
        this._openForm(task.id);
    }

    async deleteTask(task) {
        try {
            await this.orm.unlink(this.model, [task.id]);
            await this._load();
        } catch {
            this.notification.add("Couldn't delete task", {type: "danger"});
        }
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

    async toggleTask(e, task) {
        await this.orm.write(this.model, [task.id], {completed: e.target.checked});
        await this.getAllTasks();
        this.notification.add(
            e.target.checked ? "Task marked completed" : "Task marked incomplete",
            {type: "success"}
        );
    }

    async updateColor(e, task) {
        await this.orm.write(this.model, [task.id], {color: e.target.value});
        await this.getAllTasks();
    }

    async updatePriority(e, task) {
        await this.orm.write(this.model, [task.id], {priority: e.target.value});
        await this.getAllTasks();
        this.notification.add("Priority updated successfully", {type: "success"});
    }
}

OwlTodoList.template = "owl_todo_list.OwlTodoList";
registry.category("actions").add("owl_todo_list.action_todo_list_js", OwlTodoList);
