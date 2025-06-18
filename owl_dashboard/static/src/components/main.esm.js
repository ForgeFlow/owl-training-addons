import { Component, onWillStart, useState } from "@odoo/owl";
import { FormViewDialog } from "@web/views/view_dialogs/form_view_dialog";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Selector } from "./selector/selector.esm";

export class OwlDashboard extends Component {
    setup() {
        this.model = "model";
        this.orm = useService("orm");
        this.dialogService = useService("dialog");
        this.notification = useService("notification");
        this.action = useService("action");
        // this.yearOptions = [2025, 2024, 2023, 2022, 2021, 2020];
        // this.monthOptions = [1,2,3,4,5,6,7,8,9,10,11,12];

        this.state = useState({
            salesOrderCount: 0,
            newCustomersCount: 0,
            numberOfSalesForLast12Months: [
                ["2025-06", 0],
                ["2025-05", 0],
                ["2025-04", 0],
                ["2025-03", 0],
                ["2025-02", 0],
                ["2025-01", 0],
                ["2024-12", 0],
                ["2024-11", 0],
            ],
            selectedYear: 2025,
            selectedMonth: 6,
        });

        onWillStart(async () => {
            let vals = await this.orm.call(this.model, "get_values", []);
            console.log(vals);
            this.state.salesOrderCount = vals.salesOrderCount;
            this.state.newCustomersCount = vals.newCustomersCount;

            this.requestTable();
        });
    }

    async requestTable() {
        if (this.state.selectedMonth > 12) {
            this.state.selectedMonth = 12;
        } else if (this.state.selectedMonth < 1) {
            this.state.selectedMonth = 1;
        }
        let vals = await this.orm.call(this.model, "get_table", [
            this.state.selectedYear,
            this.state.selectedMonth,
        ]);
        console.log(vals);
        this.state.numberOfSalesForLast12Months = vals;
    }

    async _openForm(resid = null) {
        const result = await new Promise((resolve) => {
            this.dialogService.add(
                FormViewDialog,
                {
                    resModel: this.model,
                    resId: resid,
                    title: resid ? "Edit" : "New",
                    preventCreate: false,
                    onRecordSaved: () => resolve(true),
                },
                { onClose: () => resolve(false) },
            );
        });
        if (result) await new Promise();
    }

    openInForm(task) {
        this.action.doAction({
            type: "ir.actions.act_window",
            res_model: this.model,
            res_id: task.id,
            views: [[false, "form"]],
            target: "current",
        });
    }
}

OwlDashboard.template = "owl_dashboard.OwlDashboard";
OwlDashboard.components = { Selector };
registry
    .category("actions")
    .add("owl_dashboard.action_dashboard_js", OwlDashboard);
