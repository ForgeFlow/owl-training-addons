import {FormController} from "@web/views/form/form_controller";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";
import {useService} from "@web/core/utils/hooks";

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.notification = useService("notification");
    },

    async create() {
        const result = await super.create(...arguments);
        this.notification.add(_t("Record created successfully!"), {
            type: "info",
            title: _t("Create Record"),
        });
        return result;
    },
});
