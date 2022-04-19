import Proprietor from "../../views/proprietor/Proprietor";

export default [
    {
        path: '/proprietors',
        name: 'Proprietors',
        meta: {layout: 'on-boarding',authRequired:true},
        component: Proprietor,
    }
];
