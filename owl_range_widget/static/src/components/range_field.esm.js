import {Component, useState} from "@odoo/owl";
import {_t} from "@web/core/l10n/translation";
import {getCurrency} from "@web/core/currency";
import {registry} from "@web/core/registry";
import {standardFieldProps} from "@web/views/fields/standard_field_props";

class RangeField extends Component {
    setup() {
        this.state = useState({
            range: this.props.value || 0,
        });
        const currency_id = this.props.record.data.currency_id;
        this.currency = getCurrency?.(currency_id?.[0])?.symbol || "";
    }
}

export const rangeField = {
    component: RangeField,
    displayName: _t("Range"),
    supportedTypes: ["integer"],
};

RangeField.template = "owl_view_widget_inheritance.RangeField";
RangeField.props = {...standardFieldProps};
registry.category("fields").add("range", rangeField);
