{
    "name": "OWL Counter",
    "version": "18.0.1.0.0",
    "summary": "Owl Counter",
    "author": "ForgeFlow",
    "website": "https://github.com/ForgeFlow/owl-training-addons",
    "license": "AGPL-3",
    "depends": ["web"],
    "data": [
        "security/ir.model.access.csv",
        "views/counter.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "owl_counter/static/src/components/**/*.js",
            "owl_counter/static/src/components/**/*.xml",
        ],
        "web.assets_unit_tests": [
            "owl_counter/static/tests/**/*",
        ],
    },
    "application": True,
}
