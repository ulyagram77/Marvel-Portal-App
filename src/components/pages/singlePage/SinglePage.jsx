/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from 'src/services/MarvelService';
import Spinner from 'src/components/others/spinner/Spinner';
import ErrorMessage from 'src/components/others/errorMessage/ErrorMessage';
import AppBanner from 'src/components/interface/appBanner/AppBanner';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id).then(onDataLoaded);
                break;
            case 'character':
                getCharacter(id).then(onDataLoaded);
        }
    };

    const onDataLoaded = data => {
        setData(data);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

SinglePage.propTypes = {
    Component: PropTypes.object.isRequired,
    dataType: PropTypes.string.isRequired,
};

export default SinglePage;
