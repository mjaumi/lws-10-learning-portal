import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { videosApi } from '../features/videos/videosApi';

// custom hook to get the first video id from the server
const useGetFirstVideoId = () => {
    // integration of react hooks here
    const [firstVideo, setFirstVideo] = useState([]);
    const [isFirstVideoFetched, setIsFirstVideoFetched] = useState(false);

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // fetching the first video from the server here
    useEffect(() => {
        dispatch(videosApi.endpoints.getTheFirstVideo.initiate())
            .unwrap()
            .then(data => {
                setFirstVideo(data);
                setIsFirstVideoFetched(true);
            })
            .catch();
    }, [dispatch]);

    return {
        videoId: firstVideo[0]?.id,
        isFirstVideoFetched,
    };
}

export default useGetFirstVideoId;
