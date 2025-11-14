import CategoriesSection from './components/CategoriesSection'
import FeaturesSection from './components/FeaturesSection'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import HowItWorks from './components/HowItWorks'
// import PricingPreview from './components/PricingPreview'
// import BlogSection from './components/BlogSection'
import Footer from '~/components/Footer'
import FinalCTA from './components/FinalCTA'
import PricingPreview from './components/PricingPreview'

// ===== MAIN LANDING PAGE COMPONENT =====
export default function LandingPage() {
  return (
    <div className='min-h-screen bg-white text-neutral-900 font-inter'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      {/* <FeaturedListings />
      <TestimonialsSection /> */}
      <HowItWorks />
      <PricingPreview />
      {/* <BlogSection /> */}
      <FinalCTA />
      <Footer />
    </div>
  )
}
