import React from 'react';
import { useGetQuizzesQuery } from '../../features/quizzes/quizzesApi';
import QuizzesTableRow from './QuizzesTableRow';

const QuizzesTable = () => {
    // initializing RTK Query hook here
    const { data: quizzes, isLoading, isError } = useGetQuizzesQuery();

    // deciding what to render
    let content = null;

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    if (!isLoading && isError) {
        content = <p>Error...</p>;
    }

    if (!isLoading && !isError && !quizzes.length) {
        content = <p>No Quiz Found!!</p>;
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
                            id={quiz.id}
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