import {FormController} from "@web/views/form/form_controller";
import {patch} from "@web/core/utils/patch";
import {useService} from "@web/core/utils/hooks";

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.effect = useService("effect");
    },

    async save(...args) {
        const result = await super.save(...args);
        if (result) {
            this.effect.add({
                message: "Thanks for saving!",
                type: "rainbow_man",
            });
        }
        return result;
    },
});
