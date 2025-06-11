{
    "name": "Owl Range Widget",
    "version": "18.0.1.0.0",
    "summary": "Owl Range Widget Creation",
    "depends": ["web", "account", "contacts"],
    "author": "ForgeFlow",
    "website": "https://github.com/ForgeFlow/owl-training-addons",
    "license": "AGPL-3",
    "data": [
        "views/res_partner.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "owl_range_widget/static/src/components/*.js",
            "owl_range_widget/static/src/components/*.xml",
        ],
    },
    "installable": True,
    "application": False,
}
