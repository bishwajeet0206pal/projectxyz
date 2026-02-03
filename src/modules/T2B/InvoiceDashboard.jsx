import { Icons } from '../../components/Icons'

function InvoiceDashboard() {
    const invoices = [
        {
            id: 'INV-2024-1852',
            client: 'Acme Corporation',
            project: 'Cloud Migration',
            amount: 124500,
            status: 'Pending Approval',
            portalStatus: 'SES Submitted',
            portal: 'SAP Ariba',
            submittedDate: '2024-02-08',
            dueDate: '2024-03-09',
            daysOutstanding: 0
        },
        {
            id: 'INV-2024-1847',
            client: 'FinServ Inc.',
            project: 'Digital Transformation',
            amount: 185000,
            status: 'Paid',
            portalStatus: 'Completed',
            portal: 'Coupa',
            submittedDate: '2024-01-15',
            dueDate: '2024-02-14',
            daysOutstanding: 0
        },
        {
            id: 'INV-2024-1839',
            client: 'MedCare Systems',
            project: 'Healthcare Portal',
            amount: 67800,
            status: 'Disputed',
            portalStatus: 'Rejected',
            portal: 'Fieldglass',
            submittedDate: '2024-01-28',
            dueDate: '2024-02-27',
            daysOutstanding: 15,
            disputeReason: 'Invalid PO Number'
        },
        {
            id: 'INV-2024-1831',
            client: 'TechStart Inc',
            project: 'DevOps Implementation',
            amount: 42300,
            status: 'Overdue',
            portalStatus: 'Approved',
            portal: 'Direct',
            submittedDate: '2024-01-10',
            dueDate: '2024-02-09',
            daysOutstanding: 8
        },
        {
            id: 'INV-2024-1825',
            client: 'EnergyPlus Ltd',
            project: 'Data Analytics',
            amount: 98500,
            status: 'Pending Approval',
            portalStatus: 'SES Pending',
            portal: 'SAP Ariba',
            submittedDate: '2024-02-05',
            dueDate: '2024-03-06',
            daysOutstanding: 0
        }
    ]

    const unbilledRevenue = [
        {
            project: 'Acme Cloud Migration',
            hours: 127,
            rate: 185,
            amount: 23495,
            reason: 'Missing Milestone Approval',
            age: 18
        },
        {
            project: 'EnergyPlus Analytics',
            hours: 89,
            rate: 165,
            amount: 14685,
            reason: 'PO Extension Pending',
            age: 12
        },
        {
            project: 'Healthcare Portal',
            hours: 45,
            rate: 155,
            amount: 6975,
            reason: 'Scope Change Not Documented',
            age: 8
        }
    ]

    const dsoMetrics = {
        current: 38,
        target: 45,
        trend: -2,
        distribution: [
            { range: '0-30 days', amount: 452000, percent: 58 },
            { range: '31-60 days', amount: 234000, percent: 30 },
            { range: '61-90 days', amount: 67800, percent: 9 },
            { range: '90+ days', amount: 23100, percent: 3 }
        ]
    }

    const formatCurrency = (value) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`
        if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`
        return `$${value.toFixed(0)}`
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return 'var(--color-success)'
            case 'Pending Approval': return 'var(--color-warning)'
            case 'Disputed': return 'var(--color-danger)'
            case 'Overdue': return 'var(--color-danger)'
            default: return 'var(--color-text-muted)'
        }
    }

    const totalUnbilled = unbilledRevenue.reduce((sum, r) => sum + r.amount, 0)
    const pendingInvoices = invoices.filter(i => i.status !== 'Paid').length
    const overdueAmount = invoices.filter(i => i.status === 'Overdue' || i.status === 'Disputed')
        .reduce((sum, i) => sum + i.amount, 0)

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="page-title-icon t2b"><Icons.DollarSign /></span>
                    Time to Billing
                </h1>
                <p className="page-description">
                    Invoice management, portal status, and revenue realization
                </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-t2b)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-t2b-bg)', color: 'var(--color-t2b)' }}>
                            <Icons.Calendar />
                        </div>
                        <span className="metric-trend up">
                            <Icons.TrendingDown /> {Math.abs(dsoMetrics.trend)}d
                        </span>
                    </div>
                    <div className="metric-value">{dsoMetrics.current}d</div>
                    <div className="metric-label">Days Sales Outstanding</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-warning)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                            <Icons.FileText />
                        </div>
                    </div>
                    <div className="metric-value">{pendingInvoices}</div>
                    <div className="metric-label">Pending Invoices</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-danger)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                            <Icons.AlertTriangle />
                        </div>
                    </div>
                    <div className="metric-value">{formatCurrency(overdueAmount)}</div>
                    <div className="metric-label">Overdue / Disputed</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-accent-purple)' }}>
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-accent-purple)' }}>
                            <Icons.DollarSign />
                        </div>
                    </div>
                    <div className="metric-value">{formatCurrency(totalUnbilled)}</div>
                    <div className="metric-label">Unbilled Revenue</div>
                </div>
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-6)' }}>

                {/* Invoice Dashboard */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                <Icons.FileText /> Invoice Status
                            </h3>
                            <p className="card-subtitle">Portal submissions and payment tracking</p>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Invoice</th>
                                    <th>Client / Project</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                    <th>Portal</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(invoice => (
                                    <tr key={invoice.id} style={{
                                        background: invoice.status === 'Disputed' || invoice.status === 'Overdue'
                                            ? 'var(--color-danger-bg)' : undefined
                                    }}>
                                        <td>
                                            <div style={{ fontWeight: 500 }}>{invoice.id}</div>
                                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                                Due: {invoice.dueDate}
                                            </div>
                                        </td>
                                        <td>
                                            <div>{invoice.client}</div>
                                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                                                {invoice.project}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--color-accent-blue)' }}>
                                            {formatCurrency(invoice.amount)}
                                        </td>
                                        <td>
                                            <div style={{ fontSize: 'var(--font-size-sm)' }}>{invoice.portal}</div>
                                            <span className={`badge ${invoice.portalStatus === 'Completed' ? 'badge-success' :
                                                invoice.portalStatus === 'Approved' ? 'badge-success' :
                                                    invoice.portalStatus === 'SES Submitted' ? 'badge-info' :
                                                        invoice.portalStatus === 'Rejected' ? 'badge-danger' :
                                                            'badge-warning'
                                                }`} style={{ fontSize: '10px' }}>
                                                {invoice.portalStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                                <span style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: getStatusColor(invoice.status)
                                                }} />
                                                <span style={{ fontWeight: 500, color: getStatusColor(invoice.status) }}>
                                                    {invoice.status}
                                                </span>
                                            </div>
                                            {invoice.disputeReason && (
                                                <div style={{
                                                    fontSize: 'var(--font-size-xs)',
                                                    color: 'var(--color-danger)',
                                                    marginTop: 'var(--spacing-1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--spacing-1)'
                                                }}>
                                                    <Icons.AlertTriangle /> {invoice.disputeReason}
                                                </div>
                                            )}
                                            {invoice.daysOutstanding > 0 && invoice.status !== 'Paid' && (
                                                <div style={{
                                                    fontSize: 'var(--font-size-xs)',
                                                    color: 'var(--color-warning)',
                                                    marginTop: 'var(--spacing-1)'
                                                }}>
                                                    {invoice.daysOutstanding}d overdue
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>

                    {/* DSO Distribution */}
                    <div className="card">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                    <Icons.BarChart /> Aging Analysis
                                </h3>
                                <p className="card-subtitle">Receivables by age bucket</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            {dsoMetrics.distribution.map((bucket, idx) => (
                                <div key={idx}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        fontSize: 'var(--font-size-sm)',
                                        marginBottom: 'var(--spacing-1)'
                                    }}>
                                        <span>{bucket.range}</span>
                                        <span style={{ fontWeight: 600 }}>{formatCurrency(bucket.amount)}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className={`progress-fill ${idx === 0 ? 'success' :
                                                idx === 1 ? 'info' :
                                                    idx === 2 ? 'warning' :
                                                        'danger'
                                                }`}
                                            style={{ width: `${bucket.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Unbilled Revenue */}
                    <div className="card" style={{
                        background: 'rgba(139, 92, 246, 0.05)',
                        borderColor: 'var(--color-accent-purple)'
                    }}>
                        <div className="card-header">
                            <div>
                                <h3 className="card-title" style={{ color: 'var(--color-accent-purple)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                                    <Icons.DollarSign /> Unbilled Revenue
                                </h3>
                                <p className="card-subtitle">Work completed but not yet invoiced</p>
                            </div>
                            <span style={{
                                fontSize: 'var(--font-size-xl)',
                                fontWeight: 700,
                                color: 'var(--color-accent-purple)'
                            }}>
                                {formatCurrency(totalUnbilled)}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                            {unbilledRevenue.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        padding: 'var(--spacing-3)',
                                        background: 'var(--color-bg-tertiary)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ fontWeight: 500, fontSize: 'var(--font-size-sm)' }}>{item.project}</div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-accent-purple)' }}>
                                            {formatCurrency(item.amount)}
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--color-text-muted)',
                                        marginTop: 'var(--spacing-2)'
                                    }}>
                                        {item.hours}h × ${item.rate}/hr • {item.age}d old
                                    </div>
                                    <div style={{
                                        fontSize: 'var(--font-size-xs)',
                                        color: 'var(--color-warning)',
                                        marginTop: 'var(--spacing-1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-1)'
                                    }}>
                                        <Icons.AlertTriangle /> {item.reason}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Portal Fatigue Alert */}
                    <div style={{
                        padding: 'var(--spacing-4)',
                        background: 'var(--color-warning-bg)',
                        borderRadius: 'var(--radius-lg)'
                    }}>
                        <h4 style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-2)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                            <Icons.Refresh /> Portal Fatigue
                        </h4>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                            Managing <strong>4 different portals</strong> (Ariba, Coupa, Fieldglass, Direct)
                            with varying SES/invoice workflows. Consider cXML automation for high-volume clients.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDashboard
