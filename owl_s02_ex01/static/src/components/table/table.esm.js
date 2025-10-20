import {Component} from "@odoo/owl";

export class Table extends Component {
    static template = "owl_s02_ex01.Table";
    static props = {
        data: {type: Array},
    };
}
