{
    "name": "Owl Patching",
    "version": "18.0.1.0.0",
    "summary": "Owl Patching Example",
    "depends": ["web", "contacts"],
    "author": "ForgeFlow",
    "website": "https://github.com/ForgeFlow/owl-training-addons",
    "license": "AGPL-3",
    "data": ["views/res_partner_views.xml"],
    "assets": {
        "web.assets_backend": [
            "owl_patching/static/src/components/**/*.js",
            "owl_patching/static/src/components/**/*.xml",
        ],
        "web.assets_unit_tests": [
            "owl_patching/static/tests/**/*",
        ],
    },
    "installable": True,
    "application": False,
}
