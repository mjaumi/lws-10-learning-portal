import React from 'react';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import QuizzesTableRow from './QuizzesTableRow';
import Loading from '../UI/Loading';
import Error from '../UI/Error';
import Warning from '../UI/Warning';

const QuizzesTable = () => {
    // initializing RTK Query hook here
    const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <Loading />;
    }

    if (!isLoading && isError) {
        content = <Error error={'Failed To Load The Quizzes!!'} />;
    }

    if (!isLoading && !isError && !quizzes.length) {
        content = <Warning warning={'No Quiz Found!! But You Can Add Some.'} />;
    }

    if (!isLoading && !isError && quizzes.length) {
        content =
            <table className='divide-y-1 text-base divide-gray-600 w-full'>
                <thead>
                    <tr>
                        <th className='table-th'>Question</th>
                        <th className='table-th'>Video</th>
                        <th className='table-th justify-center'>Action</th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-slate-600/50'>
                    {
                        quizzes.map(quiz => <QuizzesTableRow
                            key={quiz.id}
                            quizId={quiz.id}
                            question={quiz.question}
                            videoTitle={quiz.video_title}
                        />)
                    }
                </tbody>
            </table>;
    }


    // rendering the quizzes table component here
    return content;
};

export default QuizzesTable;