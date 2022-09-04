import React from 'react'
import PropTypes from "prop-types";
import { Helmet } from 'react-helmet';
const SEO = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>Linktory | {title}</title>
            <meta name="robots" content="noindex, follow" />
            <meta name="description" content="Store all your important links 📌" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Helmet>
    )
}
SEO.propTypes = {
    title: PropTypes.string
};

export default SEO;