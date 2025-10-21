import {Component} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {standardFieldProps} from "@web/views/fields/standard_field_props";
import {useInputField} from "@web/views/fields/input_field_hook";

export class HashGeneratorField extends Component {
    setup() {
        useInputField({getValue: () => this.props.record.data[this.props.name] || ""});
    }

    generateHash() {
        const hash = this._generateRandomString(this.props.strLength);
        this.props.record.update({[this.props.name]: hash});
    }
    _generateRandomString(defaultLength) {
        let result = "";
        while (result.length < defaultLength) {
            result += Math.random().toString(36).substring(2);
        }
        return result.substring(0, defaultLength);
    }
}

export const hashGeneratorField = {
    component: HashGeneratorField,
    displayName: "Hash Generator",
    supportedTypes: ["char"],
    extractProps: ({options}) => ({
        strLength: Number(options.strLength) || 16,
    }),
};

HashGeneratorField.template = "owl_s03_ex01.HashGeneratorField";
HashGeneratorField.props = {
    ...standardFieldProps,
    strLength: {type: Number, optional: true},
};
registry.category("fields").add("form.hash_generator", hashGeneratorField);
