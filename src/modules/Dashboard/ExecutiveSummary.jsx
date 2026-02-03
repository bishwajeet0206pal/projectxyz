import { Icons } from '../../components/Icons'

function ExecutiveSummary({ setActiveView }) {
    const lifecycleMetrics = [
        {
            stage: 'L2C',
            title: 'Active Pipeline',
            value: '$12.4M',
            trend: '+18%',
            trendUp: true,
            icon: Icons.Target,
            color: 'var(--color-l2c)',
            bgColor: 'var(--color-l2c-bg)',
            details: [
                { label: 'Opportunities', value: '47' },
                { label: 'Win Rate', value: '34%' },
                { label: 'Avg Deal Size', value: '$264K' }
            ]
        },
        {
            stage: 'D2R',
            title: 'Demand Coverage',
            value: '87%',
            trend: '-3%',
            trendUp: false,
            icon: Icons.Users,
            color: 'var(--color-d2r)',
            bgColor: 'var(--color-d2r-bg)',
            details: [
                { label: 'Open Demands', value: '34' },
                { label: 'On Bench', value: '12' },
                { label: 'In Hiring', value: '22' }
            ]
        },
        {
            stage: 'R2A',
            title: 'Avg Onboarding Time',
            value: '4.2d',
            trend: '-0.8d',
            trendUp: true,
            icon: Icons.Rocket,
            color: 'var(--color-r2a)',
            bgColor: 'var(--color-r2a-bg)',
            details: [
                { label: 'Pending', value: '8' },
                { label: 'Compliance Onboard', value: '96%' },
                { label: 'Asset Ready', value: '92%' }
            ]
        },
        {
            stage: 'P2D',
            title: 'Blended Margin',
            value: '24.8%',
            trend: '+1.2%',
            trendUp: true,
            icon: Icons.Clipboard,
            color: 'var(--color-p2d)',
            bgColor: 'var(--color-p2d-bg)',
            details: [
                { label: 'Active', value: '67' },
                { label: 'At Risk Projects', value: '4' },
                { label: 'Utilization', value: '82%' }
            ]
        },
        {
            stage: 'T2B',
            title: 'Days Sales Outstanding',
            value: '38d',
            trend: '-2d',
            trendUp: true,
            icon: Icons.DollarSign,
            color: 'var(--color-t2b)',
            bgColor: 'var(--color-t2b-bg)',
            details: [
                { label: 'Unbilled', value: '$1.2M' },
                { label: 'Pending Invoices', value: '23' },
                { label: 'Collection Rate', value: '94%' }
            ]
        }
    ]

    const cascadeAlerts = [
        {
            from: 'L2C',
            to: 'P2D',
            message: 'Deal "Acme Corp Cloud Migration" closed with 22% margin vs 28% sold. Delivery risk flagged.',
            severity: 'warning',
            time: '2 hours ago'
        },
        {
            from: 'D2R',
            to: 'R2A',
            message: '3 resources hired for "Project Phoenix" but SOW not yet signed. Pre-contract risk.',
            severity: 'danger',
            time: '4 hours ago'
        },
        {
            from: 'P2D',
            to: 'T2B',
            message: '127 unbilled hours on "Healthcare Portal" – missing client approval on Milestone 3.',
            severity: 'warning',
            time: '1 day ago'
        }
    ]

    const recentActivity = [
        { icon: Icons.FileText, title: 'SOW signed: GlobalTech Application Modernization', stage: 'L2C', time: '30 min ago' },
        { icon: Icons.User, title: 'Senior Java Developer assigned to Project Atlas', stage: 'R2A', time: '1 hour ago' },
        { icon: Icons.Clock, title: 'Timesheet compliance at 94% for current week', stage: 'P2D', time: '2 hours ago' },
        { icon: Icons.CreditCard, title: 'Invoice #INV-2024-1847 paid by FinServ Inc.', stage: 'T2B', time: '3 hours ago' },
        { icon: Icons.Users, title: 'New demand: 5 React developers for Q2 start', stage: 'D2R', time: '4 hours ago' }
    ]

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="page-title-icon" style={{ background: 'var(--color-accent-blue-light)', color: 'var(--color-accent-blue)' }}>
                        <Icons.Dashboard />
                    </span>
                    Executive Summary
                </h1>
                <p className="page-description">
                    Unified view of the IT services lifecycle - from Lead to Cash
                </p>
            </div>

            {/* Lifecycle Metrics */}
            <div className="grid grid-cols-5" style={{ marginBottom: 'var(--spacing-6)' }}>
                {lifecycleMetrics.map((metric, idx) => {
                    const IconComponent = metric.icon
                    return (
                        <div
                            key={metric.stage}
                            className={`metric-card stagger-${idx + 1}`}
                            style={{ '--metric-color': metric.color, cursor: 'pointer' }}
                            onClick={() => setActiveView(metric.stage.toLowerCase())}
                        >
                            <div className="metric-header">
                                <div className="metric-icon" style={{ background: metric.bgColor, color: metric.color }}>
                                    <IconComponent />
                                </div>
                                <span className={`metric-trend ${metric.trendUp ? 'up' : 'down'}`}>
                                    {metric.trendUp ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                                    {metric.trend}
                                </span>
                            </div>
                            <div className="metric-value">{metric.value}</div>
                            <div className="metric-label">{metric.title}</div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: 'var(--spacing-2)',
                                marginTop: 'var(--spacing-4)',
                                paddingTop: 'var(--spacing-3)',
                                borderTop: '1px solid var(--color-border-light)'
                            }}>
                                {metric.details.map((detail, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{detail.value}</div>
                                        <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{detail.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-6)', marginBottom: 'var(--spacing-6)' }}>
                {/* Cascade Alerts */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                <Icons.AlertTriangle /> Data Cascade Alerts
                            </h3>
                            <p className="card-subtitle">Cross-stage integrity issues requiring attention</p>
                        </div>
                        <span className="badge badge-danger">{cascadeAlerts.length} Active</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                        {cascadeAlerts.map((alert, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: 'var(--spacing-4)',
                                    background: alert.severity === 'danger' ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)',
                                    borderRadius: 'var(--radius-lg)'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-2)' }}>
                                    <span className={`badge badge-${alert.from.toLowerCase()}`}>{alert.from}</span>
                                    <Icons.ArrowRight />
                                    <span className={`badge badge-${alert.to.toLowerCase()}`}>{alert.to}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                        {alert.time}
                                    </span>
                                </div>
                                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', margin: 0 }}>
                                    {alert.message}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                <Icons.Activity /> Recent Activity
                            </h3>
                            <p className="card-subtitle">Latest events across the lifecycle</p>
                        </div>
                        <a href="#" style={{ fontSize: 'var(--font-size-sm)' }}>View All</a>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {recentActivity.map((activity, idx) => {
                            const IconComponent = activity.icon
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 'var(--spacing-3)',
                                        padding: 'var(--spacing-3) 0',
                                        borderBottom: idx < recentActivity.length - 1 ? '1px solid var(--color-border-light)' : 'none'
                                    }}
                                >
                                    <div style={{
                                        color: 'var(--color-text-muted)',
                                        marginTop: '2px'
                                    }}>
                                        <IconComponent />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-1)' }}>
                                            {activity.title}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                            <span className={`badge badge-${activity.stage.toLowerCase()}`} style={{ fontSize: '10px' }}>
                                                {activity.stage}
                                            </span>
                                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                                {activity.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Lifecycle Flow Visualization */}
            <div className="card">
                <div className="card-header">
                    <div>
                        <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                            <Icons.Layers /> Lifecycle Flow
                        </h3>
                        <p className="card-subtitle">End-to-end process visibility from commercial genesis to cash realization</p>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--spacing-6) var(--spacing-4)',
                    background: 'var(--color-bg-tertiary)',
                    borderRadius: 'var(--radius-lg)'
                }}>
                    {lifecycleMetrics.map((metric, idx) => {
                        const IconComponent = metric.icon
                        return (
                            <div key={metric.stage} style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: 'var(--spacing-3)',
                                        borderRadius: 'var(--radius-lg)',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                    onClick={() => setActiveView(metric.stage.toLowerCase())}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = metric.bgColor
                                        e.currentTarget.style.transform = 'translateY(-4px)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'transparent'
                                        e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                >
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: 'var(--radius-xl)',
                                        background: metric.bgColor,
                                        border: `2px solid ${metric.color}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 'var(--spacing-2)',
                                        color: metric.color
                                    }}>
                                        <IconComponent />
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: metric.color }}>
                                        {metric.stage}
                                    </div>
                                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', textAlign: 'center', maxWidth: '80px' }}>
                                        {metric.title}
                                    </div>
                                </div>
                                {idx < lifecycleMetrics.length - 1 && (
                                    <div style={{
                                        width: '60px',
                                        height: '2px',
                                        background: 'var(--color-border)',
                                        margin: '0 var(--spacing-2)'
                                    }} />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ExecutiveSummary
