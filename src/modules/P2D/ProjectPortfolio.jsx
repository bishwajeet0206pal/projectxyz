import { useState } from 'react'
import { Icons } from '../../components/Icons'

function ProjectPortfolio() {
    const [selectedProject, setSelectedProject] = useState(null)

    const projects = [
        {
            id: 1,
            name: 'Acme Cloud Migration',
            client: 'Acme Corporation',
            status: 'At Risk',
            soldMargin: 28,
            currentMargin: 22,
            marginDelta: -6,
            budget: 840000,
            consumed: 520000,
            burnRate: 1.15,
            utilization: 78,
            teamSize: 8,
            startDate: '2024-01-15',
            endDate: '2024-07-30',
            milestones: { completed: 3, total: 8 },
            timesheetCompliance: 89,
            unbilledHours: 127,
            scopeChanges: 3
        },
        {
            id: 2,
            name: 'FinServ Digital Transformation',
            client: 'FinServ Inc.',
            status: 'On Track',
            soldMargin: 30,
            currentMargin: 29,
            marginDelta: -1,
            budget: 1500000,
            consumed: 380000,
            burnRate: 0.98,
            utilization: 85,
            teamSize: 12,
            startDate: '2024-02-01',
            endDate: '2024-10-15',
            milestones: { completed: 2, total: 10 },
            timesheetCompliance: 96,
            unbilledHours: 24,
            scopeChanges: 1
        },
        {
            id: 3,
            name: 'Healthcare Portal Enhancement',
            client: 'MedCare Systems',
            status: 'On Track',
            soldMargin: 26,
            currentMargin: 27,
            marginDelta: 1,
            budget: 560000,
            consumed: 420000,
            burnRate: 0.95,
            utilization: 82,
            teamSize: 6,
            startDate: '2023-10-01',
            endDate: '2024-04-30',
            milestones: { completed: 6, total: 8 },
            timesheetCompliance: 100,
            unbilledHours: 0,
            scopeChanges: 2
        },
        {
            id: 4,
            name: 'TechStart DevOps Implementation',
            client: 'TechStart Inc',
            status: 'Ahead',
            soldMargin: 35,
            currentMargin: 38,
            marginDelta: 3,
            budget: 320000,
            consumed: 85000,
            burnRate: 0.87,
            utilization: 90,
            teamSize: 4,
            startDate: '2024-02-15',
            endDate: '2024-06-30',
            milestones: { completed: 1, total: 5 },
            timesheetCompliance: 100,
            unbilledHours: 0,
            scopeChanges: 0
        },
        {
            id: 5,
            name: 'EnergyPlus Data Analytics',
            client: 'EnergyPlus Ltd',
            status: 'At Risk',
            soldMargin: 29,
            currentMargin: 24,
            marginDelta: -5,
            budget: 750000,
            consumed: 290000,
            burnRate: 1.22,
            utilization: 72,
            teamSize: 7,
            startDate: '2024-01-08',
            endDate: '2024-08-20',
            milestones: { completed: 2, total: 7 },
            timesheetCompliance: 78,
            unbilledHours: 89,
            scopeChanges: 4
        }
    ]

    const timesheetData = {
        currentWeek: '2024 Week 7',
        complianceRate: 94,
        missing: 8,
        pending: 12,
        approved: 145,
        schedule: [
            { day: 'Tuesday', action: 'Audit missing time' },
            { day: 'Wednesday', action: 'Automated reminders' },
            { day: 'Thursday', action: 'Manager escalation' },
            { day: 'Friday', action: 'Hard close' }
        ]
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'On Track': return 'var(--color-success)'
            case 'Ahead': return 'var(--color-info)'
            case 'At Risk': return 'var(--color-danger)'
            default: return 'var(--color-warning)'
        }
    }

    const formatCurrency = (value) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
        return `$${value}`
    }

    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0)
    const totalConsumed = projects.reduce((sum, p) => sum + p.consumed, 0)
    const avgMargin = (projects.reduce((sum, p) => sum + p.currentMargin, 0) / projects.length).toFixed(1)
    const atRiskCount = projects.filter(p => p.status === 'At Risk').length

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="page-title-icon p2d"><Icons.Clipboard /></span>
                    Project to Delivery
                </h1>
                <p className="page-description">
                    Project portfolio governance, timesheet management, and margin tracking
                </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-p2d)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-p2d-bg)', color: 'var(--color-p2d)' }}>
                            <Icons.Briefcase />
                        </div>
                    </div>
                    <div className="metric-value">{projects.length}</div>
                    <div className="metric-label">Active Projects</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-success)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                            <Icons.TrendingUp />
                        </div>
                    </div>
                    <div className="metric-value">{avgMargin}%</div>
                    <div className="metric-label">Blended Margin</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-danger)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                            <Icons.AlertTriangle />
                        </div>
                    </div>
                    <div className="metric-value">{atRiskCount}</div>
                    <div className="metric-label">At Risk Projects</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-info)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
                            <Icons.Clock />
                        </div>
                    </div>
                    <div className="metric-value">{timesheetData.complianceRate}%</div>
                    <div className="metric-label">Timesheet Compliance</div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-6)' }}>

                {/* Project Portfolio */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                <Icons.BarChart /> Project Portfolio
                            </h3>
                            <p className="card-subtitle">Health, margin, and burn rate visibility</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                        {projects.map(project => (
                            <div
                                key={project.id}
                                style={{
                                    padding: 'var(--spacing-4)',
                                    background: 'var(--color-bg-tertiary)',
                                    borderRadius: 'var(--radius-lg)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                }}
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-bg-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-tertiary)'}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{project.name}</div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                            {project.client} • {project.teamSize} members
                                        </div>
                                    </div>
                                    <span className={`badge ${project.status === 'On Track' ? 'badge-success' :
                                        project.status === 'Ahead' ? 'badge-info' :
                                            'badge-danger'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: 'var(--spacing-4)',
                                    marginTop: 'var(--spacing-4)'
                                }}>
                                    <div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Margin</div>
                                        <div style={{
                                            fontWeight: 600,
                                            color: project.marginDelta >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
                                        }}>
                                            {project.currentMargin}%
                                            <span style={{ fontSize: 'var(--font-size-xs)', marginLeft: '4px' }}>
                                                ({project.marginDelta >= 0 ? '+' : ''}{project.marginDelta})
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Burn Rate</div>
                                        <div style={{
                                            fontWeight: 600,
                                            color: project.burnRate > 1.1 ? 'var(--color-danger)' : project.burnRate < 0.95 ? 'var(--color-success)' : 'var(--color-text-primary)'
                                        }}>
                                            {project.burnRate.toFixed(2)}x
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Utilization</div>
                                        <div style={{ fontWeight: 600 }}>{project.utilization}%</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Milestones</div>
                                        <div style={{ fontWeight: 600 }}>{project.milestones.completed}/{project.milestones.total}</div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 'var(--spacing-3)' }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--color-text-muted)',
                                        marginBottom: 'var(--spacing-1)'
                                    }}>
                                        <span>Budget Consumed</span>
                                        <span>{formatCurrency(project.consumed)} / {formatCurrency(project.budget)}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className={`progress-fill ${(project.consumed / project.budget) > 0.9 ? 'danger' :
                                                (project.consumed / project.budget) > 0.7 ? 'warning' :
                                                    'success'
                                                }`}
                                            style={{ width: `${Math.min((project.consumed / project.budget) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                {project.unbilledHours > 0 && (
                                    <div style={{
                                        marginTop: 'var(--spacing-3)',
                                        padding: 'var(--spacing-2)',
                                        background: 'var(--color-warning-bg)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--color-warning)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-2)'
                                    }}>
                                        <Icons.AlertTriangle /> {project.unbilledHours} unbilled hours pending approval
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>

                    {/* Timesheet Compliance */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                    <Icons.Clock /> Timesheet Compliance
                                </h3>
                                <p className="card-subtitle">{timesheetData.currentWeek}</p>
                            </div>
                            <span className={`badge ${timesheetData.complianceRate >= 95 ? 'badge-success' : 'badge-warning'}`}>
                                {timesheetData.complianceRate}%
                            </span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 'var(--spacing-4)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-3)', background: 'var(--color-danger-bg)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-danger)' }}>
                                    {timesheetData.missing}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Missing</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-3)', background: 'var(--color-warning-bg)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-warning)' }}>
                                    {timesheetData.pending}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Pending</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-3)', background: 'var(--color-success-bg)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-success)' }}>
                                    {timesheetData.approved}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Approved</div>
                            </div>
                        </div>

                        <div style={{
                            padding: 'var(--spacing-3)',
                            background: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, marginBottom: 'var(--spacing-2)', color: 'var(--color-text-muted)' }}>
                                WEEKLY CLOSE SCHEDULE
                            </div>
                            {timesheetData.schedule.map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: 'var(--font-size-sm)',
                                    padding: 'var(--spacing-1) 0',
                                    borderBottom: idx < timesheetData.schedule.length - 1 ? '1px solid var(--color-border-light)' : 'none'
                                }}>
                                    <span style={{ fontWeight: 500 }}>{item.day}</span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>{item.action}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Accountability Gap Alert */}
                    <div className="card" style={{
                        background: 'var(--color-danger-bg)',
                        borderColor: 'var(--color-danger)'
                    }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                            <div style={{ color: 'var(--color-danger)' }}>
                                <Icons.AlertTriangle />
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--color-danger)', marginBottom: 'var(--spacing-3)' }}>
                                    Margin Erosion Alert
                                </h4>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-3)' }}>
                                    <strong>2 projects</strong> showing significant margin erosion vs. sold margin.
                                    Combined impact: <strong>-$82K</strong> in expected profit.
                                </p>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                    Primary causes:
                                    <ul style={{ margin: 'var(--spacing-2) 0', paddingLeft: 'var(--spacing-4)' }}>
                                        <li>Scope creep without Change Requests</li>
                                        <li>Untracked overtime hours</li>
                                        <li>"Bench on Project" - resources not released</li>
                                    </ul>
                                </div>
                                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--spacing-2)' }}>
                                    View Margin Analysis
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPortfolio
