import {MockServer, mountWithCleanup} from "@web/../tests/web_test_helpers";
import {animationFrame, click, edit} from "@odoo/hoot-dom";
import {expect, test} from "@odoo/hoot";
import {OwlTodoList} from "@owl_todo_list/components/todo_list.esm";

test("Adding a new task", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container").toHaveCount(1);
    expect(".todo-list-container .todo-list-item").toHaveCount(1);
    click(".todo-list-container .o_button_add_task");
    await animationFrame();
    expect(".o_dialog .o_form_view").toHaveCount(1);
    click(".o_dialog .o_form_view [name='name'] input");
    await animationFrame();
    edit("newTask");
    await animationFrame();
    click(".o_dialog .o_form_button_save");
    await animationFrame();
    expect(".todo-list-container .todo-list-item").toHaveCount(2);
});
test("Complete a task", async () => {
    await mountWithCleanup(OwlTodoList);
    expect(".todo-list-container").toHaveCount(1);
    expect(".todo-list-container .todo-list-item").toHaveCount(1);
    var todoItem = MockServer.env["todo.item"].read([1])[0];
    expect(todoItem.completed).toBe(false);
    click(".todo-list-container .todo-list-item [name='completed']");
    await animationFrame();
    expect(".o_notification_content").toHaveCount(1);
    todoItem = MockServer.env["todo.item"].read([1])[0];
    expect(todoItem.completed).toBe(true);
});
