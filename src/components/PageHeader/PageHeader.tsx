
import React, { Component } from 'react';
import './PageHeader.css'; // Assuming you have CSS for the component

class PageHeader extends React.Component {
    render() {
        return (
            <div className="cmp-adaptiveform-pageheader">
                <div>
                    <img src='./wkndLogo.png' title="Logo" alt="Logo" data-emptytext="Image" />
                </div>
                <div>
                    <p><b>Adventures</b></p>
                </div>
            </div>
        );
    }
}

export default PageHeader;