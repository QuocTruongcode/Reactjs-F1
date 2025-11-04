export const adminMenu = [
    { // Quan ly nguoi dung
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-manage'
            },
        ]
    },

    { // Quan ly phong kham
        name: 'menu.admin.admin-clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/user-clinic'
            },

        ]
    },

    { // manage specialty
        name: 'menu.admin.admin-specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/user-specialty'
            },

        ]
    },

    { // manage handBook
        name: 'menu.admin.admin-handBook', menus: [
            {
                name: 'menu.admin.manage-handBook', link: '/system/user-handBook'
            },

        ]
    },
];