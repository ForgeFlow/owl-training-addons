import {expect, test} from "@odoo/hoot";
import {animationFrame, click, edit, select} from "@odoo/hoot-dom";
import {MockServer, contains, mountWithCleanup} from "@web/../tests/web_test_helpers";

import {OwlTodoList} from "@owl_todo_list/components/todo_list.esm";

test("OwlTodoList: Click on Complete", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    const todoItemId = MockServer.env["todo.item"].search([])[0];
    var todoItem = MockServer.env["todo.item"].read([todoItemId]);
    expect(todoItem[0].completed).toBe(false);
    click(".todo-list-container .todo-item .todo-item-completed");
    await animationFrame();
    todoItem = MockServer.env["todo.item"].read([todoItemId]);
    expect(todoItem[0].completed).toBe(true);
});

test("OwlTodoList: Change Priority", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    const todoItemId = MockServer.env["todo.item"].search([])[0];
    var todoItem = MockServer.env["todo.item"].read([todoItemId]);
    expect(todoItem[0].priority).toBe("intermediate");
    click(".todo-list-container .todo-item .todo-item-priority");
    await animationFrame();
    select("high");
    await animationFrame();
    todoItem = MockServer.env["todo.item"].read([todoItemId]);
    expect(todoItem[0].priority).toBe("high");
});

test("OwlTodoList: Change Color", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    const todoItemId = MockServer.env["todo.item"].search([])[0];
    var todoItem = MockServer.env["todo.item"].read([todoItemId]);
    expect(todoItem[0].color).toBe("#ffffff");
    await contains(".todo-list-container .todo-item .todo-item-color").edit("#ff0000");
    await animationFrame();
    todoItem = MockServer.env["todo.item"].read([todoItemId]);
    expect(todoItem[0].color).toBe("#ff0000");
});

test("OwlTodoList: Creating New", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    click(".todo-list-container .todo-list-create");
    await animationFrame();
    expect(".o_form_view").toHaveCount(1);
    click(".o_form_view .o_field_widget[name='name'] input");
    await animationFrame();
    edit("New Task");
    await animationFrame();
    click(".o_form_button_save");
    await animationFrame();
    expect(".todo-list-container .todo-item").toHaveCount(2);
});

test("OwlTodoList: Edit a task", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    await animationFrame();
    click(".todo-list-container .todo-item .todo-item-edit");
    await animationFrame();
    expect(".o_form_view").toHaveCount(1);
    expect(".o_form_view .o_field_widget[name='name'] input").toHaveValue(
        "Buy groceries"
    );
});

test("OwlTodoList: Edit through name", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    await animationFrame();
    click(".todo-list-container .todo-item .todo-item-name");
    await animationFrame();
    expect(".o_form_view").toHaveCount(1);
    expect(".o_form_view .o_field_widget[name='name'] input").toHaveValue(
        "Buy groceries"
    );
});

// TODO: Add a test for deleting a task
