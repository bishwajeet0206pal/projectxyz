import { useState } from 'react'
import { Icons } from './Icons'

function Sidebar({ activeView, setActiveView, isCollapsed, setIsCollapsed }) {
    const [collapsedSections, setCollapsedSections] = useState({
        lifecycle: false,
        quickActions: false
    })

    const toggleSection = (section) => {
        if (isCollapsed) return // Don't toggle sections when sidebar is collapsed
        setCollapsedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const navItems = [
        { id: 'dashboard', icon: Icons.Dashboard, label: 'Executive Summary', section: 'overview' },
        { id: 'l2c', icon: Icons.Target, label: 'Lead to Contract', section: 'lifecycle', badge: 12, color: 'l2c' },
        { id: 'd2r', icon: Icons.Users, label: 'Demand to Resource', section: 'lifecycle', badge: 8, color: 'd2r' },
        { id: 'r2a', icon: Icons.Rocket, label: 'Resource to Assignment', section: 'lifecycle', badge: 5, color: 'r2a' },
        { id: 'p2d', icon: Icons.Clipboard, label: 'Project to Delivery', section: 'lifecycle', badge: 24, color: 'p2d' },
        { id: 't2b', icon: Icons.DollarSign, label: 'Time to Billing', section: 'lifecycle', badge: 7, color: 't2b' },
    ]

    const overviewItems = navItems.filter(item => item.section === 'overview')
    const lifecycleItems = navItems.filter(item => item.section === 'lifecycle')

    return (
        <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">P</div>
                    {!isCollapsed && <span className="sidebar-logo-text">ProjectX</span>}
                </div>
                <button
                    className="sidebar-toggle"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <Icons.ChevronLeft style={{
                        transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                    }} />
                </button>
            </div>

            <nav className="sidebar-nav">
                {/* Overview - Always visible */}
                <div className="nav-section">
                    {overviewItems.map(item => {
                        const IconComponent = item.icon
                        return (
                            <div
                                key={item.id}
                                className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                                onClick={() => setActiveView(item.id)}
                                title={isCollapsed ? item.label : undefined}
                            >
                                <span className="nav-icon"><IconComponent /></span>
                                {!isCollapsed && <span className="nav-label">{item.label}</span>}
                            </div>
                        )
                    })}
                </div>

                {/* Lifecycle Stages - Collapsible */}
                <div className="nav-section">
                    {!isCollapsed && (
                        <div
                            className="nav-section-title collapsible"
                            onClick={() => toggleSection('lifecycle')}
                        >
                            <span>Lifecycle Stages</span>
                            <Icons.ChevronDown style={{
                                transform: collapsedSections.lifecycle ? 'rotate(-90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }} />
                        </div>
                    )}
                    <div className={`nav-section-content ${!isCollapsed && collapsedSections.lifecycle ? 'collapsed' : ''}`}>
                        {lifecycleItems.map(item => {
                            const IconComponent = item.icon
                            return (
                                <div
                                    key={item.id}
                                    className={`nav-item ${item.color} ${activeView === item.id ? 'active' : ''}`}
                                    onClick={() => setActiveView(item.id)}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <span className="nav-icon"><IconComponent /></span>
                                    {!isCollapsed && (
                                        <>
                                            <span className="nav-label">{item.label}</span>
                                            {item.badge && <span className="nav-badge">{item.badge}</span>}
                                        </>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Quick Actions - Collapsible */}
                <div className="nav-section">
                    {!isCollapsed && (
                        <div
                            className="nav-section-title collapsible"
                            onClick={() => toggleSection('quickActions')}
                        >
                            <span>Quick Actions</span>
                            <Icons.ChevronDown style={{
                                transform: collapsedSections.quickActions ? 'rotate(-90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }} />
                        </div>
                    )}
                    <div className={`nav-section-content ${!isCollapsed && collapsedSections.quickActions ? 'collapsed' : ''}`}>
                        <div className="nav-item" title={isCollapsed ? 'Settings' : undefined}>
                            <span className="nav-icon"><Icons.Settings /></span>
                            {!isCollapsed && <span className="nav-label">Settings</span>}
                        </div>
                        <div className="nav-item" title={isCollapsed ? 'Analytics' : undefined}>
                            <span className="nav-icon"><Icons.BarChart /></span>
                            {!isCollapsed && <span className="nav-label">Analytics</span>}
                        </div>
                        <div className="nav-item" title={isCollapsed ? 'Alerts' : undefined}>
                            <span className="nav-icon"><Icons.Bell /></span>
                            {!isCollapsed && (
                                <>
                                    <span className="nav-label">Alerts</span>
                                    <span className="nav-badge" style={{ background: 'var(--color-danger)' }}>3</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {!isCollapsed && (
                <div style={{
                    padding: 'var(--spacing-4)',
                    borderTop: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)'
                }}>
                    <div style={{ marginBottom: 'var(--spacing-2)', fontWeight: 500 }}>
                        Data Sync
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                        <span style={{
                            width: '6px',
                            height: '6px',
                            background: 'var(--color-success)',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite'
                        }}></span>
                        Live • Last sync: 2 min ago
                    </div>
                </div>
            )}
        </aside>
    )
}

export default Sidebar
