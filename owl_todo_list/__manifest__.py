{
    "name": "Owl Todo List",
    "version": "18.0.1.0.0",
    "summary": "Owl Todo List",
    "depends": ["web"],
    "author": "ForgeFlow",
    "website": "https://github.com/ForgeFlow/owl-training-addons",
    "license": "AGPL-3",
    "data": [
        "security/ir.model.access.csv",
        "views/todo_item.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "owl_todo_list/static/src/components/**/*.js",
            "owl_todo_list/static/src/components/**/*.xml",
        ],
    },
    "installable": True,
    "application": True,
}
