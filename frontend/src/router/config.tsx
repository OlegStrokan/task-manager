import { RouteProps } from 'react-router-dom';
import {LoginPage} from '../pages/Login/LoginPage'
import {TaskPage} from "../pages/Task/TaskPage";
import {NotFoundPage} from "../pages/NotFoundPage/NotFoundPage";
import {HomePage} from "../pages/Home/HomePage";

export enum AppRoutes {
    TASKS = 'tasks',
    LOGIN = 'login',
    HOME = 'home',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.TASKS]: '/tasks',
    [AppRoutes.LOGIN]: '/login',
    [AppRoutes.HOME]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.TASKS]: {
        path: RoutePath.tasks,
        element: <TaskPage />,
    },
    [AppRoutes.LOGIN]: {
        path: RoutePath.login,
        element: <LoginPage isAuth={false} />,
    },
    [AppRoutes.HOME]: {
        path: RoutePath.home,
        element: <HomePage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
