import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import NewTaskForm from '../NewTaskForm/NewTaskForm';

function Header({onTaskCreate}) {
    return (
        <header className="header">
            <h1>todos</h1>

            <NewTaskForm onTaskCreate={onTaskCreate} />
        </header>
    );
}

Header.propTypes = {
    onTaskCreate: PropTypes.func.isRequired
};

export default Header;