/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMarvelService } from 'src/services';
import { AppBanner } from 'src/components/interface';
import { setContent } from 'src/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    const [parent] = useAutoAnimate();
    const { getComic, getCharacter, clearError, process, setProcess } =
        useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
        }
    };

    const onDataLoaded = data => {
        setData(data);
    };

    return (
        <>
            <AppBanner />
            <section ref={parent}>{setContent(process, Component, data)}</section>
        </>
    );
};

SinglePage.propTypes = {
    Component: PropTypes.object.isRequired,
    dataType: PropTypes.string.isRequired,
};

export default SinglePage;
