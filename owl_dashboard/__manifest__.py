{
    "name": "Owl Dashboar",
    "version": "18.0.1.0.0",
    "summary": "Owl Dashboar",
    "depends": ["web"],
    "author": "Hugo",
    "website": "https://github.com/Hugo-Trentesaux/owl-training-addons",
    "license": "AGPL-3",
    "data": [
        "security/ir.model.access.csv",
        "views/view.xml",
    ],
    "assets": {
        "web.assets_backend": [
           "owl_dashboard/static/src/components/**/*.js",
           "owl_dashboard/static/src/components/**/*.js",
           "owl_dashboard/static/src/components/**/*.xml",
        ],
    },
    "installable": True,
    "application": True,
}
