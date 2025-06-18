import {Component} from "@odoo/owl";
export class Selector extends Component {
    static props = {
        value: String,
        options: Array,
        onChange: Function,
    };
}

Selector.template = "owl_todo_list.Selector";
