import {ConfirmationDialog} from "@web/core/confirmation_dialog/confirmation_dialog";
import {FormController} from "@web/views/form/form_controller";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";
import {useService} from "@web/core/utils/hooks";

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.notification = useService("notification");
        // We declare the notification service here
        // dialogService is already available in original FormController
    },

    async create() {
        const result = await super.create(...arguments);
        this.notification.add(_t("Record created successfully!"), {
            type: "info",
            title: _t("Create Record"),
        });
        return result;
    },

    async save() {
        const result = await super.save(...arguments);
        this.notification.add(_t("Record saved successfully!"), {
            type: "success",
            title: _t("Save Record"),
        });
        return result;
    },

    async duplicateRecord() {
        const result = await super.duplicateRecord(...arguments);
        this.notification.add(_t("Record duplicated successfully!"), {
            type: "warning",
            title: _t("Duplicate Record"),
        });
        return result;
    },

    async discard() {
        this.dialogService.add(ConfirmationDialog, {
            body: _t("Are you sure you want to discard the changes?"),
            confirmLabel: _t("Discard"),
            confirm: async () => {
                await super.discard(...arguments);
            },
            cancel: async () => {
                this.notification.add(_t("Changes not discarded."), {
                    title: _t("Discard changes"),
                    type: "warning",
                });
            },
        });
    },
});
