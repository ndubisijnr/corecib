import UserManagementView from "../../views/userManagement/AddNewBusiness";

export default [

    {
        path: '/add-business',
        component: UserManagementView,
        name: 'AddNewBusiness',
        meta: { layout: 'dashboard', authRequired: true },
    },

];
