import {FormController} from "@web/views/form/form_controller";
import {_t} from "@web/core/l10n/translation";
import {patch} from "@web/core/utils/patch";
import {useService} from "@web/core/utils/hooks";

patch(FormController.prototype, {
    setup() {
        super.setup();
        this.effectService = useService("effect");
    },

    async save() {
        const result = await super.save(...arguments);
        this.effectService.add({
            message: _t("Thanks for saving!"),
            type: "rainbow_man",
            fadeout: "fast",
            /** FIXME: Get the image in a better way :) */
            img_url:"http://localhost:18069/web/image/res.users/1/avatar_128?unique=1750686583712",
        });
        return result;
    },

});
