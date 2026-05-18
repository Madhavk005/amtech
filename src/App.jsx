import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
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
const AutomationComputerisation = lazy(() => import('./pages/AutomationComputerisation'))
const Contact = lazy(() => import('./pages/Contact'))
const Configurator = lazy(() => import('./pages/Configurator'))
const ROICalculator = lazy(() => import('./pages/ROICalculator'))
const SolutionFinder = lazy(() => import('./pages/SolutionFinder'))

function App() {
  return (
    <>
      <Preloader />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="services" element={<Services />} />
            <Route path="industries" element={<Industries />} />
            <Route path="industries/:industryId" element={<Industries />} />
            <Route path="manufacturing" element={<Manufacturing />} />
            <Route path="manufacturing/production" element={<Production />} />
            <Route path="manufacturing/design-advantage" element={<DesignAdvantage />} />
            <Route path="manufacturing/automation-computerisation" element={<AutomationComputerisation />} />
            <Route path="contact" element={<Contact />} />
            <Route path="configurator" element={<Configurator />} />
            <Route path="roi-calculator" element={<ROICalculator />} />
            <Route path="solution-finder" element={<SolutionFinder />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
