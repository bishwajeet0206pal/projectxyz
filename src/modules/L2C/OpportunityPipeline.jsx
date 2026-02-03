import { useState } from 'react'
import { Icons } from '../../components/Icons'

function OpportunityPipeline() {
    const [selectedDeal, setSelectedDeal] = useState(null)
    const [activeTooltip, setActiveTooltip] = useState(null)

    const stages = [
        { id: 'lead', name: 'Lead', color: '#94a3b8' },
        { id: 'qualified', name: 'Qualified', color: '#8b5cf6' },
        { id: 'proposal', name: 'Proposal', color: '#0891b2' },
        { id: 'negotiation', name: 'Negotiation', color: '#f59e0b' },
        { id: 'won', name: 'Won', color: '#22c55e' }
    ]

    const opportunities = [
        {
            id: 1,
            name: 'GlobalTech ERP Modernization',
            client: 'GlobalTech Inc.',
            value: 1250000,
            stage: 'negotiation',
            probability: 75,
            soldMargin: 28,
            expectedMargin: 24,
            presalesCost: 45000,
            owner: 'Sarah Chen',
            daysInStage: 12,
            nextAction: 'Final pricing review'
        },
        {
            id: 2,
            name: 'DataFlow Analytics Platform',
            client: 'DataFlow Systems',
            value: 680000,
            stage: 'proposal',
            probability: 50,
            soldMargin: 32,
            expectedMargin: 30,
            presalesCost: 28000,
            owner: 'Mike Johnson',
            daysInStage: 8,
            nextAction: 'Technical demo scheduled'
        },
        {
            id: 3,
            name: 'SecureBank Digital Transformation',
            client: 'SecureBank Corp',
            value: 2100000,
            stage: 'qualified',
            probability: 35,
            soldMargin: 30,
            expectedMargin: 28,
            presalesCost: 15000,
            owner: 'Lisa Park',
            daysInStage: 5,
            nextAction: 'Discovery workshop'
        },
        {
            id: 4,
            name: 'HealthFirst Patient Portal',
            client: 'HealthFirst Medical',
            value: 450000,
            stage: 'lead',
            probability: 15,
            soldMargin: 26,
            expectedMargin: 26,
            presalesCost: 3500,
            owner: 'Tom Wilson',
            daysInStage: 3,
            nextAction: 'Initial call scheduled'
        },
        {
            id: 5,
            name: 'RetailMax POS Integration',
            client: 'RetailMax Inc.',
            value: 320000,
            stage: 'won',
            probability: 100,
            soldMargin: 28,
            expectedMargin: 22,
            presalesCost: 32000,
            owner: 'Sarah Chen',
            daysInStage: 0,
            nextAction: 'SOW in progress'
        },
        {
            id: 6,
            name: 'EduTech Learning Platform',
            client: 'EduTech Solutions',
            value: 890000,
            stage: 'proposal',
            probability: 60,
            soldMargin: 30,
            expectedMargin: 29,
            presalesCost: 41000,
            owner: 'Mike Johnson',
            daysInStage: 15,
            nextAction: 'Competitive review'
        }
    ]

    const formatCurrency = (value) => {
        if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
        if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
        return `$${value}`
    }

    const getStageOpportunities = (stageId) =>
        opportunities.filter(opp => opp.stage === stageId)

    const getStageTotal = (stageId) =>
        getStageOpportunities(stageId).reduce((sum, opp) => sum + opp.value, 0)

    const totalPipeline = opportunities.reduce((sum, opp) => sum + opp.value, 0)
    const weightedPipeline = opportunities.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0)
    const totalPresales = opportunities.reduce((sum, opp) => sum + opp.presalesCost, 0)

    // Calculation tooltip content
    const getTooltipContent = (type) => {
        switch (type) {
            case 'totalPipeline':
                return {
                    title: 'Total Pipeline',
                    formula: 'Sum of all opportunity values',
                    calculation: opportunities.map(opp => ({
                        name: opp.name,
                        value: opp.value
                    })),
                    total: totalPipeline,
                    source: 'CRM System (Salesforce)'
                }
            case 'weightedPipeline':
                return {
                    title: 'Weighted Pipeline',
                    formula: 'Value × Win Probability',
                    calculation: opportunities.map(opp => ({
                        name: opp.name,
                        value: opp.value,
                        probability: opp.probability,
                        weighted: opp.value * opp.probability / 100
                    })),
                    total: weightedPipeline,
                    source: 'CRM System (Salesforce)'
                }
            case 'presales':
                return {
                    title: 'Presales Investment',
                    formula: 'Sum of presales costs',
                    calculation: opportunities.map(opp => ({
                        name: opp.name,
                        value: opp.presalesCost
                    })),
                    total: totalPresales,
                    source: 'Time & Expense System'
                }
            case 'activeOpportunities':
                return {
                    title: 'Active Opportunities',
                    formula: 'Count of open deals',
                    calculation: stages.map(stage => ({
                        name: stage.name,
                        count: getStageOpportunities(stage.id).length
                    })),
                    total: opportunities.length,
                    source: 'CRM System (Salesforce)'
                }
            default:
                return null
        }
    }

    const InfoTooltip = ({ type }) => {
        const content = getTooltipContent(type)
        if (!content) return null

        return (
            <div
                className="info-tooltip-trigger"
                onMouseEnter={() => setActiveTooltip(type)}
                onMouseLeave={() => setActiveTooltip(null)}
            >
                <Icons.Info />
                {activeTooltip === type && (
                    <div className="calculation-tooltip">
                        <div className="calculation-tooltip-header">
                            <strong>{content.title}</strong>
                            <span className="calculation-tooltip-source">Source: {content.source}</span>
                        </div>
                        <div className="calculation-tooltip-formula">
                            <Icons.Activity /> {content.formula}
                        </div>
                        <div className="calculation-tooltip-breakdown">
                            {type === 'activeOpportunities' ? (
                                content.calculation.map((item, idx) => (
                                    <div key={idx} className="calculation-row">
                                        <span className="calculation-name">{item.name}</span>
                                        <span className="calculation-value">{item.count} deals</span>
                                    </div>
                                ))
                            ) : type === 'weightedPipeline' ? (
                                content.calculation.map((item, idx) => (
                                    <div key={idx} className="calculation-row">
                                        <span className="calculation-name">{item.name.substring(0, 20)}...</span>
                                        <span className="calculation-value">
                                            {formatCurrency(item.value)} × {item.probability}% = {formatCurrency(item.weighted)}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                content.calculation.map((item, idx) => (
                                    <div key={idx} className="calculation-row">
                                        <span className="calculation-name">{item.name.substring(0, 25)}...</span>
                                        <span className="calculation-value">{formatCurrency(item.value)}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="calculation-tooltip-total">
                            <span>Total</span>
                            <span>{type === 'activeOpportunities' ? content.total : formatCurrency(content.total)}</span>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="page-header">
                <h1 className="page-title">
                    <span className="page-title-icon l2c"><Icons.Target /></span>
                    Lead to Contract
                </h1>
                <p className="page-description">
                    Opportunity pipeline management with margin accountability
                </p>
            </div>

            {/* Summary Metrics */}
            <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-6)' }}>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-l2c)', position: 'relative' }}>
                    <InfoTooltip type="totalPipeline" />
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-l2c-bg)', color: 'var(--color-l2c)' }}>
                            <Icons.PieChart />
                        </div>
                    </div>
                    <div className="metric-value">{formatCurrency(totalPipeline)}</div>
                    <div className="metric-label">Total Pipeline</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-success)', position: 'relative' }}>
                    <InfoTooltip type="weightedPipeline" />
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                            <Icons.TrendingUp />
                        </div>
                    </div>
                    <div className="metric-value">{formatCurrency(weightedPipeline)}</div>
                    <div className="metric-label">Weighted Pipeline</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-warning)', position: 'relative' }}>
                    <InfoTooltip type="presales" />
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                            <Icons.DollarSign />
                        </div>
                    </div>
                    <div className="metric-value">{formatCurrency(totalPresales)}</div>
                    <div className="metric-label">Presales Investment</div>
                </div>
                <div className="metric-card" style={{ '--metric-color': 'var(--color-info)', position: 'relative' }}>
                    <InfoTooltip type="activeOpportunities" />
                    <div className="metric-header">
                        <div className="metric-icon" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
                            <Icons.Briefcase />
                        </div>
                    </div>
                    <div className="metric-value">{opportunities.length}</div>
                    <div className="metric-label">Active Opportunities</div>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="kanban-board">
                {stages.map(stage => (
                    <div key={stage.id} className="kanban-column">
                        <div className="kanban-column-header">
                            <div className="kanban-column-title">
                                <span style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: stage.color
                                }}></span>
                                {stage.name}
                            </div>
                            <div className="kanban-column-count">
                                {getStageOpportunities(stage.id).length}
                            </div>
                        </div>
                        <div style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-muted)',
                            marginBottom: 'var(--spacing-3)',
                            fontWeight: 500
                        }}>
                            {formatCurrency(getStageTotal(stage.id))}
                        </div>
                        <div className="kanban-cards">
                            {getStageOpportunities(stage.id).map(opp => {
                                const marginRisk = opp.soldMargin - opp.expectedMargin
                                return (
                                    <div
                                        key={opp.id}
                                        className="kanban-card"
                                        onClick={() => setSelectedDeal(opp)}
                                    >
                                        <div className="kanban-card-title">{opp.name}</div>
                                        <div className="kanban-card-meta">
                                            <Icons.Briefcase /> {opp.client}
                                        </div>
                                        <div className="kanban-card-value">{formatCurrency(opp.value)}</div>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            marginTop: 'var(--spacing-3)',
                                            paddingTop: 'var(--spacing-3)',
                                            borderTop: '1px solid var(--color-border-light)'
                                        }}>
                                            <span className="badge badge-info">{opp.probability}%</span>
                                            {marginRisk > 0 && (
                                                <span style={{
                                                    fontSize: 'var(--font-size-xs)',
                                                    color: marginRisk > 3 ? 'var(--color-danger)' : 'var(--color-warning)'
                                                }}>
                                                    {opp.soldMargin}% → {opp.expectedMargin}%
                                                </span>
                                            )}
                                        </div>
                                        <div style={{
                                            fontSize: 'var(--font-size-xs)',
                                            color: 'var(--color-text-muted)',
                                            marginTop: 'var(--spacing-2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-1)'
                                        }}>
                                            <Icons.User /> {opp.owner}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Deal Detail Modal */}
            {selectedDeal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }} onClick={() => setSelectedDeal(null)}>
                    <div
                        className="card"
                        style={{ width: '600px', maxHeight: '80vh', overflow: 'auto' }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">{selectedDeal.name}</h3>
                                <p className="card-subtitle">{selectedDeal.client}</p>
                            </div>
                            <button
                                className="btn btn-ghost"
                                onClick={() => setSelectedDeal(null)}
                            >
                                <Icons.X />
                            </button>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 'var(--spacing-4)',
                            marginBottom: 'var(--spacing-6)'
                        }}>
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-4)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-accent-blue)' }}>
                                    {formatCurrency(selectedDeal.value)}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Deal Value</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-4)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>{selectedDeal.probability}%</div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Win Probability</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--spacing-4)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-warning)' }}>
                                    {formatCurrency(selectedDeal.presalesCost)}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Presales Cost</div>
                            </div>
                        </div>

                        {/* Margin Analysis */}
                        <div style={{
                            padding: 'var(--spacing-4)',
                            background: selectedDeal.soldMargin - selectedDeal.expectedMargin > 3 ? 'var(--color-danger-bg)' : 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--spacing-4)'
                        }}>
                            <h4 style={{
                                marginBottom: 'var(--spacing-3)',
                                fontSize: 'var(--font-size-sm)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-2)'
                            }}>
                                <Icons.Activity /> Margin Analysis
                            </h4>
                            <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Sold Margin</div>
                                    <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700 }}>{selectedDeal.soldMargin}%</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}>
                                    <Icons.ArrowRight />
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Expected Margin</div>
                                    <div style={{
                                        fontSize: 'var(--font-size-lg)',
                                        fontWeight: 700,
                                        color: selectedDeal.soldMargin - selectedDeal.expectedMargin > 3 ? 'var(--color-danger)' : undefined
                                    }}>
                                        {selectedDeal.expectedMargin}%
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Delta</div>
                                    <div style={{
                                        fontSize: 'var(--font-size-lg)',
                                        fontWeight: 700,
                                        color: selectedDeal.soldMargin - selectedDeal.expectedMargin > 0 ? 'var(--color-danger)' : 'var(--color-success)'
                                    }}>
                                        {selectedDeal.soldMargin - selectedDeal.expectedMargin > 0 ? '-' : '+'}{Math.abs(selectedDeal.soldMargin - selectedDeal.expectedMargin)}pp
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                            <button className="btn btn-primary" style={{ flex: 1 }}>
                                <Icons.FileText /> View SOW
                            </button>
                            <button className="btn btn-secondary" style={{ flex: 1 }}>
                                <Icons.BarChart /> Full Analysis
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default OpportunityPipeline
