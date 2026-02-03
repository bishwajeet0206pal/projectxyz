import { Icons } from '../../components/Icons'

function OnboardingTracker() {
    const onboardingData = [
        {
            name: 'Jennifer Martinez',
            role: 'Senior Java Developer',
            project: 'Acme Cloud Migration',
            startDate: '2024-02-19',
            internalChecklist: { completed: 8, total: 10 },
            clientChecklist: { completed: 3, total: 6 },
            assetStatus: 'Pending',
            complianceStatus: 'Complete',
            sowSigned: true
        },
        {
            name: 'Robert Kim',
            role: 'DevOps Engineer',
            project: 'FinServ Transformation',
            startDate: '2024-02-22',
            internalChecklist: { completed: 10, total: 10 },
            clientChecklist: { completed: 6, total: 6 },
            assetStatus: 'Complete',
            complianceStatus: 'Complete',
            sowSigned: true
        },
        {
            name: 'Amanda Foster',
            role: 'React Developer',
            project: 'Project Phoenix',
            startDate: '2024-02-26',
            internalChecklist: { completed: 4, total: 10 },
            clientChecklist: { completed: 0, total: 6 },
            assetStatus: 'Not Started',
            complianceStatus: 'In Progress',
            sowSigned: false,
            risk: 'Pre-contract'
        },
        {
            name: 'David Chen',
            role: 'Data Engineer',
            project: 'EnergyPlus Analytics',
            startDate: '2024-02-28',
            internalChecklist: { completed: 6, total: 10 },
            clientChecklist: { completed: 2, total: 6 },
            assetStatus: 'In Progress',
            complianceStatus: 'Complete',
            sowSigned: true
        },
        {
            name: 'Sophie Turner',
            role: 'QA Lead',
            project: 'Healthcare Portal',
            startDate: '2024-02-15',
            internalChecklist: { completed: 10, total: 10 },
            clientChecklist: { completed: 5, total: 6 },
            assetStatus: 'Complete',
            complianceStatus: 'Complete',
            sowSigned: true
        }
    ]

    const allocations = [
        { resource: 'Jennifer Martinez', project: 'Acme Cloud Migration', type: 'Hard', utilization: 100, startDate: '2024-02-19', endDate: '2024-07-30' },
        { resource: 'Robert Kim', project: 'FinServ Transformation', type: 'Hard', utilization: 100, startDate: '2024-02-22', endDate: '2024-10-15' },
        { resource: 'Amanda Foster', project: 'Project Phoenix', type: 'Soft', utilization: 100, startDate: '2024-02-26', endDate: '2024-08-30' },
        { resource: 'David Chen', project: 'EnergyPlus Analytics', type: 'Hard', utilization: 80, startDate: '2024-02-28', endDate: '2024-08-20' },
        { resource: 'Sophie Turner', project: 'Healthcare Portal', type: 'Hard', utilization: 100, startDate: '2024-02-15', endDate: '2024-04-30' }
    ]

    const pendingOnboarding = onboardingData.filter(d => d.internalChecklist.completed < d.internalChecklist.total).length
    const atRisk = onboardingData.filter(d => d.risk).length
    const avgOnboardingTime = 4.2

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="page-title-icon r2a"><Icons.Rocket /></span>
                    Resource to Assignment
                </h1>
                <p className="page-description">
                    Onboarding management and allocation tracking
                </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-r2a)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-r2a-bg)', color: 'var(--color-r2a)' }}>
                            <Icons.User />
                        </div>
                    </div>
                    <div className="metric-value">{pendingOnboarding}</div>
                    <div className="metric-label">Pending Onboarding</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-danger)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                            <Icons.AlertTriangle />
                        </div>
                    </div>
                    <div className="metric-value">{atRisk}</div>
                    <div className="metric-label">At Risk / Blocked</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-warning)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                            <Icons.FileText />
                        </div>
                    </div>
                    <div className="metric-value">{onboardingData.filter(d => !d.sowSigned).length}</div>
                    <div className="metric-label">Pre-Contract Risks</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-success)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                            <Icons.Clock />
                        </div>
                    </div>
                    <div className="metric-value">{avgOnboardingTime}d</div>
                    <div className="metric-label">Avg Onboarding Time</div>
                </div>
            </div>

            {/* Onboarding Checklist Table */}
            <div className="card" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div className="card-header">
                    <div>
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                            <Icons.CheckCircle /> Onboarding Checklist Tracker
                        </h3>
                        <p className="card-subtitle">Resource onboarding progress and blockers</p>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Project</th>
                                <th>Start Date</th>
                                <th>Internal Checklist</th>
                                <th>Client Checklist</th>
                                <th>Assets</th>
                                <th>Compliance</th>
                                <th>SOW</th>
                            </tr>
                        </thead>
                        <tbody>
                            {onboardingData.map((row, idx) => (
                                <tr key={idx} style={{ background: row.risk ? 'var(--color-danger-bg)' : undefined }}>
                                    <td>
                                        <div style={{ fontWeight: 600 }}>{row.name}</div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{row.role}</div>
                                    </td>
                                    <td>{row.project}</td>
                                    <td>{row.startDate}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                            <div className="progress-bar" style={{ width: '80px' }}>
                                                <div
                                                    className={`progress-fill ${row.internalChecklist.completed === row.internalChecklist.total ? 'success' : 'info'}`}
                                                    style={{ width: `${(row.internalChecklist.completed / row.internalChecklist.total) * 100}%` }}
                                                />
                                            </div>
                                            <span style={{ fontSize: 'var(--font-size-xs)' }}>
                                                {row.internalChecklist.completed}/{row.internalChecklist.total}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                            <div className="progress-bar" style={{ width: '80px' }}>
                                                <div
                                                    className={`progress-fill ${row.clientChecklist.completed === row.clientChecklist.total ? 'success' : row.clientChecklist.completed === 0 ? 'danger' : 'warning'}`}
                                                    style={{ width: `${(row.clientChecklist.completed / row.clientChecklist.total) * 100}%` }}
                                                />
                                            </div>
                                            <span style={{ fontSize: 'var(--font-size-xs)' }}>
                                                {row.clientChecklist.completed}/{row.clientChecklist.total}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${row.assetStatus === 'Complete' ? 'badge-success' :
                                                row.assetStatus === 'In Progress' ? 'badge-warning' :
                                                    row.assetStatus === 'Pending' ? 'badge-info' :
                                                        'badge-danger'
                                            }`}>
                                            {row.assetStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${row.complianceStatus === 'Complete' ? 'badge-success' :
                                                row.complianceStatus === 'In Progress' ? 'badge-warning' :
                                                    'badge-danger'
                                            }`}>
                                            {row.complianceStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {row.sowSigned ? (
                                            <span style={{ color: 'var(--color-success)' }}><Icons.CheckCircle /></span>
                                        ) : (
                                            <span className="badge badge-danger">SOW Pending</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Allocation Overview */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                            <Icons.Calendar /> Allocation Overview
                        </h3>
                        <p className="card-subtitle">Soft vs Hard booking status</p>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Project</th>
                                <th>Type</th>
                                <th>Utilization</th>
                                <th>Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allocations.map((row, idx) => (
                                <tr key={idx}>
                                    <td style={{ fontWeight: 500 }}>{row.resource}</td>
                                    <td>{row.project}</td>
                                    <td>
                                        <span className={`badge ${row.type === 'Hard' ? 'badge-success' : 'badge-warning'}`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                            <div className="progress-bar" style={{ width: '60px' }}>
                                                <div className="progress-fill success" style={{ width: `${row.utilization}%` }} />
                                            </div>
                                            <span style={{ fontSize: 'var(--font-size-xs)' }}>{row.utilization}%</span>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                        {row.startDate} → {row.endDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OnboardingTracker
