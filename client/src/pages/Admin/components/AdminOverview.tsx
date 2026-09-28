import React from "react";

interface AdminOverviewProps {
    projects: number;
    requirements: number;
    todos: number;
    progress: number;
    visits: number;
    uniqueVisitors: number;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({
    projects,
    requirements,
    todos,
    progress,
    visits,
    uniqueVisitors,
}) => {
    return (
        <section id="summary">
            <h2>Overview</h2>

            <div className="admin-summary">
                <div className="summary-card">
                    <strong>{projects}</strong>
                    <span>Projects</span>
                </div>

                <div className="summary-card">
                    <strong>{requirements}</strong>
                    <span>Requirements</span>
                </div>

                <div className="summary-card">
                    <strong>{todos}</strong>
                    <span>Todos</span>
                </div>

                <div className="summary-card">
                    <strong>{progress}%</strong>
                    <span>Progress</span>
                </div>

                <div className="summary-card">
                    <strong>{visits}</strong>
                    <span>Visits</span>
                </div>

                <div className="summary-card">
                    <strong>{uniqueVisitors}</strong>
                    <span>Unique Visitors</span>
                </div>
            </div>
        </section>
    );
};

export default AdminOverview;