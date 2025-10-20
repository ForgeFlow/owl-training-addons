import {Component, onWillStart, useState} from "@odoo/owl";
import {NumberCard} from "./number_card/number_card.esm";
import {Table} from "./table/table.esm";
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

export class SaleDashboard extends Component {
    setup() {
        this.orm = useService("orm");
        this.modelSaleOrder = "sale.order";
        this.modelCustomer = "res.partner";

        this.monthOptions = Array.from({length: 12}, (_, i) => {
            const date = new Date(2025, i);
            return {
                value: i,
                label: date.toLocaleString("default", {month: "long"}),
            };
        });

        this.state = useState({
            SOLastMonth: 0,
            newCustomersLastMonth: 0,
            SOByMonth: [],
        });

        onWillStart(async () => {
            this.currentMonth = this.selectedMonth = new Date().getMonth();
            this.currentYear = this.selectedYear = new Date().getFullYear();
            await this._loadSaleOrders();
            await this._loadNewCustomers();
            await this._loadSaleOrdersCount();
        });
    }

    async _loadSaleOrders() {
        const year = parseInt(this.selectedYear, 10);
        const month = parseInt(this.selectedMonth, 10);
        const nMDate = new Date(year, month + 1, 1);
        const sDate = new Date(year, month, 1);
        this.state.SOLastMonth = await this.orm.searchCount(
            this.modelSaleOrder,
            [
                ["date_order", ">=", sDate.toISOString()],
                ["date_order", "<", nMDate.toISOString()],
            ],
            []
        );
    }

    async _loadNewCustomers() {
        const year = parseInt(this.selectedYear, 10);
        const month = parseInt(this.selectedMonth, 10);
        const nMDate = new Date(year, month + 1, 1);
        const sDate = new Date(year, month, 1);
        const orders = await this.orm.call("sale.order", "read_group", [
            [],
            ["partner_id", "date_order:min"],
            ["partner_id"],
        ]);
        const newCustomers = orders.filter((order) => {
            const date_order = order.date_order;
            return (
                date_order >= sDate.toISOString() && date_order < nMDate.toISOString()
            );
        });
        this.state.newCustomersLastMonth = newCustomers.length;
    }

    async _loadSaleOrdersCount() {
        const year = parseInt(this.selectedYear, 10);
        const month = parseInt(this.selectedMonth, 10);
        const nMDate = new Date(year, month + 1, 1);
        const sDate = new Date(year, month - 11, 1);
        const orders = await this.orm.searchRead(
            this.modelSaleOrder,
            [
                ["date_order", ">=", sDate.toISOString()],
                ["date_order", "<", nMDate.toISOString()],
            ],
            ["id", "date_order"]
        );
        const salesByMonth = {};
        for (const order of orders) {
            const date = new Date(order.date_order);
            const monthName = date.toLocaleString("default", {month: "long"});
            const key = `${monthName} ${date.getFullYear()}`;
            salesByMonth[key] = (salesByMonth[key] || 0) + 1;
        }
        const norm = [];
        for (let i = 11; i >= 0; i--) {
            const date = new Date(year, month - i, 1);
            const monthName = date.toLocaleString("default", {month: "long"});
            const key = `${monthName} ${date.getFullYear()}`;
            norm.push({
                month: key,
                count: salesByMonth[key] || 0,
            });
        }
        this.state.SOByMonth = norm;
    }

    async onMonthChange(ev) {
        this.selectedMonth = ev.target.value;
        await this._loadSaleOrders();
        await this._loadNewCustomers();
        await this._loadSaleOrdersCount();
    }
    async onYearChange(ev) {
        this.selectedYear = ev.target.value;
        await this._loadSaleOrders();
        await this._loadNewCustomers();
        await this._loadSaleOrdersCount();
    }
}

SaleDashboard.template = "owl_s02_ex01.SaleDashboard";
SaleDashboard.components = {NumberCard, Table};
registry.category("actions").add("owl_s02_ex01.action_sale_dashboard", SaleDashboard);
