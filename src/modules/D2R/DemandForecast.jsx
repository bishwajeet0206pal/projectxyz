import { Icons } from '../../components/Icons'

function DemandForecast() {
    const demandData = [
        { role: 'Senior Java Developer', skill: 'Java/Spring', demand: 8, supply: 5, gap: 3, probability: 75, status: 'critical' },
        { role: 'React Developer', skill: 'React/TypeScript', demand: 6, supply: 4, gap: 2, probability: 60, status: 'warning' },
        { role: 'DevOps Engineer', skill: 'AWS/K8s', demand: 4, supply: 3, gap: 1, probability: 80, status: 'normal' },
        { role: 'Data Engineer', skill: 'Python/Spark', demand: 5, supply: 2, gap: 3, probability: 50, status: 'critical' },
        { role: 'QA Automation', skill: 'Selenium/Cypress', demand: 3, supply: 3, gap: 0, probability: 90, status: 'normal' },
        { role: 'Scrum Master', skill: 'Agile/SAFe', demand: 2, supply: 1, gap: 1, probability: 85, status: 'warning' }
    ]

    const benchResources = [
        { name: 'Alex Thompson', skill: 'Java/Spring', daysOnBench: 12, utilization: 0, availability: 'Immediate' },
        { name: 'Maria Garcia', skill: 'React/Node', daysOnBench: 5, utilization: 20, availability: 'Partial' },
        { name: 'James Lee', skill: 'Python/ML', daysOnBench: 18, utilization: 0, availability: 'Immediate' },
        { name: 'Sara Wilson', skill: 'AWS/DevOps', daysOnBench: 3, utilization: 40, availability: 'Partial' }
    ]

    const totalDemand = demandData.reduce((sum, d) => sum + d.demand, 0)
    const totalSupply = demandData.reduce((sum, d) => sum + d.supply, 0)
    const totalGap = demandData.reduce((sum, d) => sum + d.gap, 0)
    const benchCost = benchResources.reduce((sum, r) => sum + (r.daysOnBench * 800), 0)

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="page-title-icon d2r"><Icons.Users /></span>
                    Demand to Resource
                </h1>
                <p className="page-description">
                    Resource demand forecasting and bench management
                </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-d2r)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-d2r-bg)', color: 'var(--color-d2r)' }}>
                            <Icons.Users />
                        </div>
                    </div>
                    <div className="metric-value">{totalDemand}</div>
                    <div className="metric-label">Open Demands</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-success)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                            <Icons.CheckCircle />
                        </div>
                    </div>
                    <div className="metric-value">{totalSupply}</div>
                    <div className="metric-label">Available Supply</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-danger)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                            <Icons.AlertTriangle />
                        </div>
                    </div>
                    <div className="metric-value">{totalGap}</div>
                    <div className="metric-label">Unfilled Gap</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-warning)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                            <Icons.DollarSign />
                        </div>
                    </div>
                    <div className="metric-value">${(benchCost / 1000).toFixed(0)}K</div>
                    <div className="metric-label">Monthly Bench Cost</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-6)' }}>
                {/* Demand Table */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                <Icons.BarChart /> Demand Forecast
                            </h3>
                            <p className="card-subtitle">Probability-weighted resource requirements</p>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Skill</th>
                                    <th style={{ textAlign: 'center' }}>Demand</th>
                                    <th style={{ textAlign: 'center' }}>Supply</th>
                                    <th style={{ textAlign: 'center' }}>Gap</th>
                                    <th>Probability</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {demandData.map((row, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: 500 }}>{row.role}</td>
                                        <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{row.skill}</td>
                                        <td style={{ textAlign: 'center' }}>{row.demand}</td>
                                        <td style={{ textAlign: 'center' }}>{row.supply}</td>
                                        <td style={{
                                            textAlign: 'center',
                                            fontWeight: 600,
                                            color: row.gap > 2 ? 'var(--color-danger)' : row.gap > 0 ? 'var(--color-warning)' : 'var(--color-success)'
                                        }}>
                                            {row.gap > 0 ? `-${row.gap}` : '0'}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                                <div className="progress-bar" style={{ width: '60px' }}>
                                                    <div className="progress-fill info" style={{ width: `${row.probability}%` }} />
                                                </div>
                                                <span style={{ fontSize: 'var(--font-size-xs)' }}>{row.probability}%</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${row.status === 'critical' ? 'badge-danger' :
                                                row.status === 'warning' ? 'badge-warning' :
                                                    'badge-success'
                                                }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bench Resources */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                <Icons.Clock /> Bench Resources
                            </h3>
                            <p className="card-subtitle">Available for immediate deployment</p>
                        </div>
                        <span className="badge badge-info">{benchResources.length}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                        {benchResources.map((resource, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: 'var(--spacing-4)',
                                    background: 'var(--color-bg-tertiary)',
                                    borderRadius: 'var(--radius-lg)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: 'var(--spacing-1)' }}>{resource.name}</div>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{resource.skill}</div>
                                    </div>
                                    <span className={`badge ${resource.availability === 'Immediate' ? 'badge-success' : 'badge-warning'}`}>
                                        {resource.availability}
                                    </span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-4)',
                                    marginTop: 'var(--spacing-3)',
                                    fontSize: 'var(--font-size-xs)'
                                }}>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Days on bench: </span>
                                        <span style={{
                                            fontWeight: 600,
                                            color: resource.daysOnBench > 14 ? 'var(--color-danger)' : undefined
                                        }}>
                                            {resource.daysOnBench}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ color: 'var(--color-text-muted)' }}>Utilization: </span>
                                        <span style={{ fontWeight: 600 }}>{resource.utilization}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Forecasting Paradox Alert */}
            <div className="card" style={{
                marginTop: 'var(--spacing-6)',
                background: 'var(--color-info-bg)',
                borderColor: 'var(--color-info)'
            }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                    <div style={{ color: 'var(--color-info)' }}>
                        <Icons.AlertTriangle />
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--color-info)', marginBottom: 'var(--spacing-2)' }}>
                            The Forecasting Paradox
                        </h4>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                            <strong>3 resources</strong> are being hired for opportunities still in proposal stage (50-60% probability).
                            If deals don't close, estimated bench cost impact: <strong>$45K/month</strong>.
                            Consider waiting for higher probability triggers or arranging soft commitments.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DemandForecast
