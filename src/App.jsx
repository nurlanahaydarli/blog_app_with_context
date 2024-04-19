import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import {Spinner} from "@chakra-ui/react";
// import Layout from './Layout/Layout';
import {ROUTER} from "./constant/router";


const Home =lazy(()=>import('./pages/home/Home'))
const About =lazy(()=>import('./pages/about/About'))
const NotFound =lazy(()=>import('./pages/notFound/NotFound'))
const Articles =lazy(()=>import('./pages/articles/Articles'))
const ArticleDetail =lazy(()=>import('./pages/articles/detail/ArticleDetail'))
const ArticleCreate =lazy(()=>import('./pages/articles/create/ArticleCreate'))
const Favorites =lazy(()=>import('./pages/favorites/Favorites'))
const Faq =lazy(()=>import('./pages/faq/Faq'))
const Setting =lazy(()=>import('./pages/Setting/Setting'))

function App() {

  return (
    <>
        <Suspense fallback={
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        }>
            <Routes>
                <Route path={ROUTER.HOME} element={<Home />} />
                <Route path={ROUTER.ABOUT} element={<About />} />
                <Route path={ROUTER.FAQ}  element={<Faq />} />
                <Route path={ROUTER.SETTING}  element={<Setting />} />

                <Route path={ROUTER.FAV}  element={<Favorites />} />

                <Route path={ROUTER.ARTICLES}  element={<Articles />} />
                <Route path={ROUTER.ARTICLE_CREATE}  element={<ArticleCreate />} />
                <Route path={ROUTER.ARTICLES+ "/:id"}  element={<ArticleDetail />} />

                <Route path="*"  element={<NotFound />} />
            </Routes>
        </Suspense>

    </>
  )
}

export default App
