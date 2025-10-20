{
    "name": "OWL Session 02 Exercise 01",
    "version": "18.0.1.0.0",
    "summary": "OWL Session 02 Exercise 01 - Create a Dashboard",
    "author": "ForgeFlow",
    "website": "https://github.com/ForgeFlow/owl-training-addons",
    "license": "AGPL-3",
    "depends": ["web", "sale"],
    "data": ["views/sale_dashboard_views.xml"],
    "assets": {
        "web.assets_backend": [
            "owl_s02_ex01/static/src/components/**/*.js",
            "owl_s02_ex01/static/src/components/**/*.xml",
            "owl_s02_ex01/static/src/components/**/*.scss",
        ],
        "web.assets_unit_tests": [
            "owl_s02_ex01/static/tests/**/*",
        ],
    },
    "application": True,
}
