import { Outlet, NavLink } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar" className="side-bar">
                <h2>React Projects</h2>
                <nav>
                    <div className="side-bar-list">
                        <NavLink className={({isActive}) => isActive ? 'list-item active' : 'list-item'} to={'/parent'}>Parent Component</NavLink>
                    </div>
                    <div className="side-bar-list">
                        <NavLink className={({isActive}) => isActive ? 'list-item active' : 'list-item'} to={'/transactions'}>Transactions</NavLink>
                    </div>
                    <div className="side-bar-list">
                        <NavLink className={({isActive}) => isActive ? 'list-item active' : 'list-item'} to={'/contact-manager'}>Contact Manager</NavLink>
                    </div>
                </nav>
            </div>
            <div id="detail" className="render-layout">
                <Outlet />
            </div>
        </>
    );
}