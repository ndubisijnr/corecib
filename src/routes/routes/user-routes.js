import Users from "../../views/user/Users";
import Roles from "@/views/user/Roles";
import CreateRole from "@/views/user/CreateRole";
import CheckerQueue from "@/views/queues/CheckerQueue";
import Partners from "@/views/user/Partners";
import AuditTrails from "@/views/user/AuditTrails";
import Parameterization from "@/views/user/Parameterization";
import ImtoUsers from "@/views/user/ImtoUsers";
import Sandbox from "@/views/developer/Sandbox";
import MakerQueue from "@/views/queues/MakerQueue";
import SystemSettings from "@/views/config/SystemSettings";
import AuditTrailsMto from "@/views/user/AuditTrailsMto";
import uploadUsers from "../../views/user/UploadUsers";

export default [
    {
        path: '/users',
        name: 'Users',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Users,
    },
    {
        path: '/upload-users',
        name: 'UploadUsers',
        meta: {layout: 'on-boarding',authRequired:true},
        component: uploadUsers,
    },
    {
        path: '/imto-users',
        name: 'ImtoUsers',
        meta: {layout: 'on-boarding',authRequired:true},
        component: ImtoUsers,
    },
    {
        path: '/api-keys',
        name: 'Sandbox',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Sandbox,
    },
    {
        path: '/roles',
        name: 'Roles',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Roles,
    },
    {
        path: '/create-role',
        name: 'CreateRole',
        meta: {layout: 'on-boarding',authRequired:true},
        component: CreateRole,
    },
    {
        path: '/checkers-queue',
        name: 'CheckerQueue',
        meta: {layout: 'on-boarding',authRequired:true},
        component: CheckerQueue,
    },
    {
        path: '/makers-queue',
        name: 'MakerQueue',
        meta: {layout: 'on-boarding',authRequired:true},
        component: MakerQueue,
    },
    {
        path: '/partners',
        name: 'Partners',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Partners,
    },
    {
        path: '/audit-trails',
        name: 'AuditTrails',
        meta: {layout: 'on-boarding',authRequired:true},
        component: AuditTrails,
    },
    {
        path: '/audit-trails-mto',
        name: 'AuditTrailsMto',
        meta: {layout: 'on-boarding',authRequired:true},
        component: AuditTrailsMto,
    },
    {
        path: '/parameterization',
        name: 'parameterization',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Parameterization,
    },
    {
        path: '/system-settings',
        name: 'SystemSettings',
        meta: {layout: 'on-boarding',authRequired:true},
        component: SystemSettings,
    },
];
