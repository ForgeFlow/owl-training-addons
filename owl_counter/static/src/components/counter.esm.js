import {Component, onWillStart, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

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
        this.state.counterList = await this.orm.searchRead(
            this.model,
            [],
            ["count", "name"]
        );
    }

    async addCounter() {
        await this.orm.create(this.model, [{count: 0, name: "New counter"}]);
        await this.loadCount();
    }
}

Counter.template = "owl_counter.Counter";
registry.category("actions").add("owl_counter.action_counter_list", Counter);
