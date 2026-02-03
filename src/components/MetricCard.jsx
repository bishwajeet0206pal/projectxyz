import { Icons } from './Icons'

function MetricCard({
    title,
    value,
    trend,
    trendUp = true,
    icon: IconComponent,
    color = 'var(--color-accent-blue)',
    bgColor = 'var(--color-accent-blue-light)',
    details = [],
    onClick
}) {
    return (
        <div
            className="metric-card"
            style={{ '--metric-color': color, cursor: onClick ? 'pointer' : 'default' }}
            onClick={onClick}
        >
            <div className="metric-header">
                {IconComponent && (
                    <div className="metric-icon" style={{ background: bgColor, color: color }}>
                        <IconComponent />
                    </div>
                )}
                {trend && (
                    <span className={`metric-trend ${trendUp ? 'up' : 'down'}`}>
                        {trendUp ? <Icons.TrendingUp /> : <Icons.TrendingDown />}
                        {trend}
                    </span>
                )}
            </div>

            <div className="metric-value">{value}</div>
            <div className="metric-label">{title}</div>

            {details.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(details.length, 3)}, 1fr)`,
                    gap: 'var(--spacing-2)',
                    marginTop: 'var(--spacing-4)',
                    paddingTop: 'var(--spacing-3)',
                    borderTop: '1px solid var(--color-border-light)'
                }}>
                    {details.map((detail, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{detail.value}</div>
                            <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>{detail.label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MetricCard
