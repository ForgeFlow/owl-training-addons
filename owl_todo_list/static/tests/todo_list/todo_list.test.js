import {MockServer, contains, mountWithCleanup} from "@web/../tests/web_test_helpers";
import {animationFrame, click, edit, select} from "@odoo/hoot-dom";
import {expect, test} from "@odoo/hoot";
import {OwlTodoList} from "@owl_todo_list/components/todo_list.esm";

test("Adding a task", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container").toHaveCount(1);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    expect(".todo-list-container .todo-new").toHaveCount(1);
    click(".todo-list-container .todo-new");
    await animationFrame();
    expect(".o_dialog .o_form_view").toHaveCount(1);
    expect(".o_dialog .o_form_view .o_field_widget[name='name']").toHaveCount(1);
    click(".o_dialog .o_form_view .o_field_widget[name='name'] input");
    await animationFrame();
    edit("New Task");
    await animationFrame();
    click(".o_dialog .o_form_button_save");
    await animationFrame();
    expect(".todo-list-container .todo-item").toHaveCount(2);
});

test("Clicking Completed", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    const todoItemId = MockServer.env["todo.item"].search([])[0];
    var todoItem = MockServer.env["todo.item"].read([todoItemId])[0];
    expect(todoItem.completed).toBe(false);
    click(".todo-list-container .todo-item .todo-item-completed");
    await animationFrame();
    todoItem = MockServer.env["todo.item"].read([todoItemId])[0];
    expect(todoItem.completed).toBe(true);
});

test("Change Priority", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    const todoItemId = MockServer.env["todo.item"].search([])[0];
    var todoItem = MockServer.env["todo.item"].read([todoItemId])[0];
    expect(todoItem.priority).toBe("intermediate");
    click(".todo-list-container .todo-item select[name='priority']");
    await animationFrame();
    select("high");
    await animationFrame();
    todoItem = MockServer.env["todo.item"].read([todoItemId])[0];
    expect(todoItem.priority).toBe("high");
});

test("Change Color", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container .todo-item").toHaveCount(1);
    const todoItemId = MockServer.env["todo.item"].search([])[0];
    var todoItem = MockServer.env["todo.item"].read([todoItemId])[0];
    expect(todoItem.priority).toBe("intermediate");
    await contains(".todo-list-container .todo-item .todo-item-color").edit("#fefefe");
    await animationFrame();
    todoItem = MockServer.env["todo.item"].read([todoItemId])[0];
    expect(todoItem.color).toBe("#fefefe");
});
