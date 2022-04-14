import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { DashboardActions } from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Alert from '../layout/Alert';

const Dashboard = ({ auth, deleteAccount, getCurrentProfile, profile: { profile, loading } }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.loading) {
            navigate('/login');
        }
    }, [auth.isAuthenticated, auth.loading, navigate]);

    useEffect(() => {
        if (auth.isAuthenticated) {
            getCurrentProfile();
        }
    }, []);

    return (
        <section className="container">
            <Alert />
            {loading && profile === null ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome {auth?.user?.name}
                    </p>
                    {profile !== null ? (
                        <>
                            <DashboardActions />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />
                            <div className="my-2">
                                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                    <i className="fas fa-user-minus"></i> Delete My Account
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>You have not yet setup profile, please add some info</p>
                            <Link to="/create-profile" className="btn btn-primary my-1">
                                Create Profile
                            </Link>
                        </>
                    )}
                </>
            )}
        </section>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
