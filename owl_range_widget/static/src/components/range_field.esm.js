import {Component} from "@odoo/owl";
import {_t} from "@web/core/l10n/translation";
import {getCurrency} from "@web/core/currency";
import {standardFieldProps} from "@web/views/fields/standard_field_props";
import {registry} from "@web/core/registry";

export class RangeField extends Component {
    setup() {
        const currency_id = this.props.record.data.currency_id;
        this.currency = getCurrency?.(currency_id?.[0])?.symbol || "";
    }
}

export const rangeField = {
    component: RangeField,
    displayName: _t("Range"),
    supportedTypes: ["integer"],
};

RangeField.template = "owl_range_widget.RangeField";
RangeField.props = {...standardFieldProps};
registry.category("fields").add("range", rangeField);
