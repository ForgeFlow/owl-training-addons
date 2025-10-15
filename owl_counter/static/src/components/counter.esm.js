import { Component, onWillStart, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";

export class Counter extends Component {

    setup() {
        this.model = "my.counter";
        this.orm = useService("orm");
        this.state = useState({
           counterList: [],
        });

        onWillStart(async () => {
            await this.loadCount();
        });
    }

    async loadCount() {
        this.state.counterList = await this.orm.searchRead(this.model, [], ["name", "count"]);
    }

    async addCounter() {
        await this.orm.create(this.model, [{count: 0, name: "New Counter"}]);
        await this.loadCount();
    }
}
Counter.template = "owl_counter.Counter";
registry.category("actions").add("owl_counter.action_counter_list", Counter)
