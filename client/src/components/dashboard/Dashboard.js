import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ auth, getCurrentProfile, profile: { profile, loading } }) => {
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
            {loading && profile === null ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Welcome {auth?.user?.name}
                    </p>
                    {profile !== null ? (
                        <>has</>
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
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
