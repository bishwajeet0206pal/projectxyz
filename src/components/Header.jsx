import { Icons } from './Icons'

function Header() {
    return (
        <header className="header">
            <div className="header-search">
                <span className="header-search-icon"><Icons.Search /></span>
                <input
                    type="text"
                    placeholder="Search opportunities, resources, projects..."
                />
            </div>

            <div className="header-actions">
                <button className="header-btn" title="Notifications">
                    <Icons.Bell />
                    <span className="header-btn-badge">5</span>
                </button>

                <button className="header-btn" title="Data Cascade Alerts">
                    <Icons.AlertTriangle />
                    <span className="header-btn-badge">2</span>
                </button>

                <button className="header-btn" title="Quick Actions">
                    <Icons.Zap />
                </button>

                <div className="header-user">
                    <div className="header-user-avatar">JD</div>
                    <div className="header-user-info">
                        <div className="header-user-name">John Doe</div>
                        <div className="header-user-role">Delivery Director</div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
