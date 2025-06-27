import odoo

from odoo.addons.web.tests.test_js import WebSuite


@odoo.tests.tagged("post_install", "-at_install")
class TestJS(WebSuite):
    def get_hoot_filters(self):
        self._test_params = [("+", "@owl_todo_list")]
        return super().get_hoot_filters()

    def test_my_module_js(self):
        self.test_unit_desktop()
