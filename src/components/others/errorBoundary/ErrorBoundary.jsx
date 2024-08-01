import { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '..';

class ErrorBoundary extends Component {
    state = {
        error: false,
    };

    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
