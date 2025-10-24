import {defineModels, fields, models} from "@web/../tests/web_test_helpers";
class MyCounter extends models.Model {
    _name = "my.counter";
    name = fields.Char({required: true});
    count = fields.Integer();
    _records = [];
}
defineModels([MyCounter]);
