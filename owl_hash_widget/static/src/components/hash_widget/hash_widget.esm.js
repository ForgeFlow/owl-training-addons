import {Component} from "@odoo/owl";
import {_t} from "@web/core/l10n/translation";
import {standardFieldProps} from "@web/views/fields/standard_field_props";
import { useInputField } from "@web/views/fields/input_field_hook";
import {registry} from "@web/core/registry";



export class HashField extends Component {
    setup() {
        this.title = _t("Generate Hash");
        useInputField({ getValue: () => this.props.record.data[this.props.name] || "" });
    }

    async onClickHashButton() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let hash = '';
        const size = this.props.size || 12;

        for (let i = 0; i < size; i++) {
            hash += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        await this.props.record.update({ [this.props.name]: hash });
    }
}

export const hashField = {
    component: HashField,
    displayName: _t("Hash"),
    supportedTypes: ["char"],
    extractProps: ({ attrs }) => ({
        placeholder: attrs.placeholder,
        size: attrs.size || 12,
    }),
};

// HashField template and properties
HashField.template = "owl_hash_widget.HashField";
HashField.props = {...standardFieldProps,
    placeholder: { type: String, optional: true },
    size: {optional: true, default: 12 },
};
registry.category("fields").add("form.hash", hashField);
