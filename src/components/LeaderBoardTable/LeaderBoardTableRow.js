import React from 'react';

const LeaderBoardTableRow = ({ rank, studentData, userId }) => {
    // destructuring the student data object here
    const { studentId, studentName, quizMark, assignmentMark } = studentData || {};

    // rendering leaderboard table row component here
    return (
        <tr className={`${studentId === userId ? 'border-2 border-cyan' : 'border-b border-slate-600/50'}`}>
            <td className='table-td text-center'>{rank}</td>
            <td className='table-td text-center'>{studentName}</td>
            <td className='table-td text-center'>{quizMark}</td>
            <td className='table-td text-center'>{assignmentMark}</td>
            <td className='table-td text-center'>{assignmentMark + quizMark}</td>
        </tr>
    );
};

export default LeaderBoardTableRow;