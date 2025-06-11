/** @odoo-module **/

import {Component, onWillStart, useRef, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

export class OwlTodoList extends Component {
    setup() {
        this.model = "todo.item";
        this.orm = useService("orm");
        this.notification = useService("notification");

        this.closeModalButton = useRef("closeModalButton");
        this.searchInput = useRef("searchInput");
        this.nameInput = useRef("nameInput");

        this.state = useState({
            taskList: [],
            task: {name: "", color: "#ffc0f0", completed: false, priority: "low"},
            isEdit: false,
            activeId: false,
            priorityOptions: [],
        });

        onWillStart(async () => {
            await this.getAllTasks();
            const options = await this.orm.call(this.model, "get_priority_options");
            this.state.priorityOptions = options;
        });
    }

    async getAllTasks() {
        this.state.taskList = await this.orm.searchRead(
            this.model,
            [],
            ["name", "color", "completed", "priority"]
        );
    }

    addTask() {
        this.resetForm();
        this.state.isEdit = false;
        this.state.activeId = false;
    }

    editTask(task) {
        this.resetForm();
        this.state.isEdit = true;
        this.state.activeId = task.id;
        this.state.task = {...task};
    }

    async saveTask() {
        if (this.state.task.name === "") {
            this.displayNotification("Name is required.");
            this.nameInput.el.classList.add("is-invalid");
            setTimeout(() => {
                this.nameInput.el.classList.remove("is-invalid");
            }, 2000);
            return;
        }

        if (this.state.isEdit) {
            await this.orm.write(this.model, [this.state.activeId], this.state.task);
        } else {
            await this.orm.create(this.model, [this.state.task]);
        }
        await this.getAllTasks();
        this.closeModalButton.el.click();
    }

    resetForm() {
        this.state.task = {
            name: "",
            color: "#ffc0f0",
            completed: false,
            priority: "low",
        };
    }

    async deleteTask(task) {
        await this.orm.unlink(this.model, [task.id]);
        await this.getAllTasks();
    }

    async searchTasks() {
        const text = this.searchInput.el.value;
        this.state.taskList = await this.orm.searchRead(
            this.model,
            [["name", "ilike", text]],
            ["name", "color", "completed", "priority"]
        );
    }

    async toggleTask(e, task) {
        await this.orm.write(this.model, [task.id], {completed: e.target.checked});
        await this.getAllTasks();
    }

    async updateColor(e, task) {
        await this.orm.write(this.model, [task.id], {color: e.target.value});
        await this.getAllTasks();
    }

    async updatePriority(e, task) {
        await this.orm.write(this.model, [task.id], {priority: e.target.value});
        await this.getAllTasks();
    }

    displayNotification(text) {
        this.notification.add(text, {type: "danger"});
    }
}

OwlTodoList.template = "owl_todo_list.OwlTodoList";
registry.category("actions").add("owl_todo_list.action_todo_list_js", OwlTodoList);
