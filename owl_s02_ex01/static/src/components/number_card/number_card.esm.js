import {Component} from "@odoo/owl";

export class NumberCard extends Component {
    static template = "owl_s02_ex01.NumberCard";
    static props = {
        title: {type: String},
        subtitle: {type: String},
        value: {type: Number},
        extraClass: {type: String},
    };
}
