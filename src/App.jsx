import { useState } from 'react'
import './index.css'

// Import module components
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ExecutiveSummary from './modules/Dashboard/ExecutiveSummary'
import OpportunityPipeline from './modules/L2C/OpportunityPipeline'
import DemandForecast from './modules/D2R/DemandForecast'
import OnboardingTracker from './modules/R2A/OnboardingTracker'
import ProjectPortfolio from './modules/P2D/ProjectPortfolio'
import InvoiceDashboard from './modules/T2B/InvoiceDashboard'

function App() {
  const [activeView, setActiveView] = useState('dashboard')

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <ExecutiveSummary onNavigate={setActiveView} />
      case 'l2c':
        return <OpportunityPipeline />
      case 'd2r':
        return <DemandForecast />
      case 'r2a':
        return <OnboardingTracker />
      case 'p2d':
        return <ProjectPortfolio />
      case 't2b':
        return <InvoiceDashboard />
      default:
        return <ExecutiveSummary onNavigate={setActiveView} />
    }
  }

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        <Header />
        <div className="page-content">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
