import {Component, onWillStart, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {registry} from "@web/core/registry";

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
            ["name", "count"]
        );
    }
    async addCounter() {
        await this.orm.create(this.model, [{count: 0, name: "New Counter"}]);
        await this.loadCount();
    }
    async increment(counter) {
        counter.count += 1;
        await this.orm.write(this.model, [counter.id], {count: counter.count});
    }
    async deleteCounter(counter) {
        await this.orm.unlink(this.model, [counter.id]);
        await this.loadCount();
    }
    async updateName(e, counter) {
        await this.orm.write(this.model, [counter.id], {name: e.target.value});
    }
}

Counter.template = "owl_course.Counter";
registry.category("actions").add("owl_counter.action_counter_list", Counter);
