import { Suspense } from 'react'
import './App.css'
import {AppRouter} from "./router/AppRouter";

export const  App = () => {

  return (
      <div >
        <Suspense fallback="">
            <AppRouter />
        </Suspense>
      </div>
  )
}

