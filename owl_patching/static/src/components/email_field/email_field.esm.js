import {
    EmailField,
    emailField,
    formEmailField,
} from "@web/views/fields/email/email_field";
import {patch} from "@web/core/utils/patch";

patch(EmailField, {
    props: {
        ...EmailField.props,
        colorProps: {type: String, optional: true},
        bgColorProps: {type: String, optional: true},
    },
    defaultProps: {
        ...EmailField.defaultProps,
        colorProps: "inherit",
        bgColorProps: "inherit",
    },
});

const patchDescr = () => ({
    extractProps({options}) {
        const props = super.extractProps(...arguments);
        props.colorProps = options.colorProps;
        props.bgColorProps = options.bgColorProps;
        return props;
    },
});

patch(emailField, patchDescr());
patch(formEmailField, patchDescr());
