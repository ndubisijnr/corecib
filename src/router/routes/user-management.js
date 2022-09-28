import UserManagementView from "../../views/userManagement/UserManagementView";

export default [

    {
        path: '/users',
        component: UserManagementView,
        name: 'UserManagementView',
        meta: { layout: 'dashboard', auth: true },
    },

];
