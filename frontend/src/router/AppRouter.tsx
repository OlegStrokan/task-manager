import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import {routeConfig} from "./config";
import {PageLoader} from "../components/PageLoader/PageLoader";

export const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
            <Route
                key={path}
                path={path}
                element={(
                    <Suspense fallback={<PageLoader/>}>
                        <div>
                            {element}
                        </div>
                    </Suspense>
                )}
            />
        ))}
    </Routes>
)
