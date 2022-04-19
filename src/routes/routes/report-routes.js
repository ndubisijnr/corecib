import ReportEngine from "@/views/report/ReportEngine";
import ReportEngineSingle from "@/views/report/ReportEngineSingle";
import listOfPeriodicReports from "../../views/report/ListOfPeriodicReports";

export default [
    {
        path: '/report-engine',
        name: 'ReportEngine',
        meta: {layout: 'on-boarding',authRequired:true},
        component: ReportEngine,
    },
    {
        path: '/report-engine-single',
        name: 'ReportEngineSingle',
        meta: {layout: 'on-boarding',authRequired:true},
        component: ReportEngineSingle,
    },
    {
        path: '/periodic-report',
        name: 'PeriodicReports',
        meta: {layout: 'on-boarding',authRequired:true},
        component: listOfPeriodicReports,
    },
];
