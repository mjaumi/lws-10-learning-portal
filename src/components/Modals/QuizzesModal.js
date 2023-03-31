import React, { useEffect, useState } from 'react';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { useAddQuizMutation } from '../../features/quizzes/quizzesApi';
import { useGetVideosQuery } from '../../features/videos/videosApi';

const QuizzesModal = ({ isModalOpen, setIsModalOpen }) => {
    // integration of RTK Query hooks here
    const [addQuiz, { isSuccess, isError, isLoading }] = useAddQuizMutation();
    const { data: videos } = useGetVideosQuery();

    // integration of react hooks here
    const [question, setQuestion] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [quizOption1, setQuizOption1] = useState('');
    const [quizOption2, setQuizOption2] = useState('');
    const [quizOption3, setQuizOption3] = useState('');
    const [quizOption4, setQuizOption4] = useState('');
    const [isQuizOption1Correct, setIsQuizOption1Correct] = useState(false);
    const [isQuizOption2Correct, setIsQuizOption2Correct] = useState(false);
    const [isQuizOption3Correct, setIsQuizOption3Correct] = useState(false);
    const [isQuizOption4Correct, setIsQuizOption4Correct] = useState(false);

    // informing and navigating user based on quiz add success or error here
    useEffect(() => {
        if (isSuccess) {
            console.log('Quiz Added Successfully!!.');
            setIsModalOpen(false);
        }

        if (isError) {
            console.log('Failed To Add New Quiz!!');
        }
    }, [isSuccess, isError, setIsModalOpen]);

    // this function is resetting the form
    const resetForm = () => {
        setQuestion('');
        setVideoTitle('');
        setQuizOption1('');
        setQuizOption2('');
        setQuizOption3('');
        setQuizOption4('');
        setIsQuizOption1Correct(false);
        setIsQuizOption2Correct(false);
        setIsQuizOption3Correct(false);
        setIsQuizOption4Correct(false);
    }

    const quizFormHandler = e => {
        e.preventDefault();

        if (isQuizOption1Correct || isQuizOption2Correct || isQuizOption3Correct || isQuizOption4Correct) {

            let options = [
                {
                    id: 1,
                    option: quizOption1,
                    isCorrect: isQuizOption1Correct,
                },
                {
                    id: 2,
                    option: quizOption2,
                    isCorrect: isQuizOption2Correct,
                },
            ];

            if (quizOption3.length) {
                options.push(
                    {
                        id: 3,
                        option: quizOption3,
                        isCorrect: isQuizOption3Correct,
                    },
                );
            }

            if (quizOption4.length) {
                options.push(
                    {
                        id: 4,
                        option: quizOption4,
                        isCorrect: isQuizOption4Correct,
                    },
                );
            }

            addQuiz({
                question,
                video_id: videos.find(video => video.title === videoTitle).id,
                video_title: videoTitle,
                options,
            });
            resetForm();
        } else {
            console.log('Please, Select At Least 1 Correct Answer!!');
        }
    }

    // handler function to handle modal close
    const modalCloseHandler = () => {
        setIsModalOpen(false);
        resetForm();
    }

    // rendering the quizzes modal component here
    return (
        <div data-theme='learning-portal-theme'>
            <input type='checkbox' id='video-modal' className='modal-toggle' />
            <div className={`modal modal-bottom sm:modal-middle bg-primary/60 ${isModalOpen && 'modal-open'}`}>
                <div className='modal-box !max-w-5xl relative bg-primary border-2 border-secondary'>
                    <button onClick={modalCloseHandler} className='btn btn-sm btn-circle absolute right-2 top-2'>✕</button>
                    <h3 className='font-bold text-lg text-center my-5 text-white'>Add New Quiz</h3>
                    <form onSubmit={quizFormHandler}>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Quiz Question
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <input type='text' placeholder='Quiz Question Here...' className='input input-bordered w-full bg-neutral' required value={question} onChange={e => setQuestion(e.target.value)} />
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Select Assignment Video
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <select className='select select-bordered w-full bg-neutral font-normal' required value={videoTitle} onChange={e => setVideoTitle(e.target.value)}>
                                <option value='' hidden>Select Video</option>
                                {
                                    videos?.map(video => <option key={video.id}>
                                        {video.title}
                                    </option>
                                    )
                                }
                            </select>
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Quiz Option 1
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <div className='flex'>
                                <div className='w-full'>
                                    <input type='text' placeholder='Quiz Option 1 Here...' className='input input-bordered w-full bg-neutral' required value={quizOption1} onChange={e => setQuizOption1(e.target.value)} />
                                </div>
                                <div className='flex items-center justify-end w-1/4 ml-3'>
                                    <label className='label cursor-pointer'>
                                        <span className='label-text text-secondary w-full text-right mr-3'>
                                            Is Option 1 Correct?
                                        </span>
                                        <input type='checkbox' className='checkbox checkbox-secondary bg-neutral' checked={isQuizOption1Correct} onChange={e => setIsQuizOption1Correct(e.target.checked)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Quiz Option 2
                                    <span className='text-accent'>*</span>
                                </span>
                            </label>
                            <div className='flex'>
                                <div className='w-full'>
                                    <input type='text' placeholder='Quiz Option 2 Here...' className='input input-bordered w-full bg-neutral' required value={quizOption2} onChange={e => setQuizOption2(e.target.value)} />
                                </div>
                                <div className='flex items-center justify-end w-1/4 ml-3'>
                                    <label className='label cursor-pointer'>
                                        <span className='label-text text-secondary w-full text-right mr-3'>
                                            Is Option 2 Correct?
                                        </span>
                                        <input type='checkbox' className='checkbox checkbox-secondary bg-neutral' checked={isQuizOption2Correct} onChange={e => setIsQuizOption2Correct(e.target.checked)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Quiz Option 3
                                </span>
                            </label>
                            <div className='flex'>
                                <div className='w-full'>
                                    <input type='text' placeholder='Quiz Option 3 Here...' className='input input-bordered w-full bg-neutral' value={quizOption3} onChange={e => setQuizOption3(e.target.value)} />
                                </div>
                                <div className='flex items-center justify-end w-1/4 ml-3'>
                                    <label className='label cursor-pointer'>
                                        <span className='label-text text-secondary w-full text-right mr-3'>
                                            Is Option 3 Correct?
                                        </span>
                                        <input type='checkbox' className='checkbox checkbox-secondary bg-neutral' checked={isQuizOption3Correct} onChange={e => setIsQuizOption3Correct(e.target.checked)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='form-control w-full text-secondary mb-4'>
                            <label className='label'>
                                <span className='label-text text-secondary'>
                                    Quiz Option 4
                                </span>
                            </label>
                            <div className='flex'>
                                <div className='w-full'>
                                    <input type='text' placeholder='Quiz Option 4 Here...' className='input input-bordered w-full bg-neutral' value={quizOption4} onChange={e => setQuizOption4(e.target.value)} />
                                </div>
                                <div className='flex items-center justify-end w-1/4 ml-3'>
                                    <label className='label cursor-pointer'>
                                        <span className='label-text text-secondary w-full text-right mr-3'>
                                            Is Option 4 Correct?
                                        </span>
                                        <input type='checkbox' className='checkbox checkbox-secondary bg-neutral' checked={isQuizOption4Correct} onChange={e => setIsQuizOption4Correct(e.target.checked)} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='modal-action'>
                            <button type='button' onClick={modalCloseHandler} className='btn btn-sm btn-accent border-2 border-accent hover:bg-transparent rounded-full w-28 capitalize'>
                                <ImCancelCircle className='mr-2' />
                                Cancel
                            </button>
                            <button type='submit' className='btn btn-sm btn-secondary border-2 border-secondary hover:bg-transparent hover:text-white rounded-full capitalize w-28 px-5 disabled:opacity-80 disabled:cursor-not-allowed' disabled={isLoading}>
                                <BsFillCloudUploadFill className='mr-2' />
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuizzesModal;