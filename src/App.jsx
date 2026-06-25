import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/layout/Layout'
import Preloader from './components/ui/Preloader'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Services = lazy(() => import('./pages/Services'))
const Industries = lazy(() => import('./pages/Industries'))
const Manufacturing = lazy(() => import('./pages/Manufacturing'))
const Production = lazy(() => import('./pages/Production'))
const DesignAdvantage = lazy(() => import('./pages/DesignAdvantage'))
const Contact = lazy(() => import('./pages/Contact'))
const Configurator = lazy(() => import('./pages/Configurator'))
const SteelPlantCranes = lazy(() => import('./pages/SteelPlantCranes'))

function App() {
  const location = useLocation()

  return (
    <>
      <Preloader />
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:productId" element={<ProductDetail />} />
              <Route path="products/steel-plant-cranes" element={<SteelPlantCranes />} />
              <Route path="services" element={<Services />} />
              <Route path="industries" element={<Industries />} />
              <Route path="industries/:industryId" element={<Industries />} />
              <Route path="manufacturing" element={<Manufacturing />} />
              <Route path="manufacturing/production" element={<Production />} />
              <Route path="manufacturing/design-advantage" element={<DesignAdvantage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="configurator" element={<Configurator />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Analytics />
    </>
  )
}

export default App
