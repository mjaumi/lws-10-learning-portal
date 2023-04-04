import React from 'react';
import { useGetAssignmentMarkQuery } from '../../features/assignmentMark/assignmentMarkApi';
import { useGetQuizMarksQuery } from '../../features/quizMark/quizMarkApi';
import { useSelector } from 'react-redux';
import LeaderBoardTableRow from './LeaderBoardTableRow';
import { useGetStudentsQuery } from '../../features/users/usersApi';

const LeaderBoardTable = () => {
    // integration of RTK Query hooks here
    const { data: allAssignmentMarks, isLoading, isError } = useGetAssignmentMarkQuery();
    const { data: allQuizMarks, isLoading: isQuizLoading, isError: isQuizError } = useGetQuizMarksQuery();
    const { data: students, isLoading: isStudentLoading, isError: isStudentError } = useGetStudentsQuery();

    // integration of react-redux hooks here
    const { user } = useSelector(state => state.auth);

    // this function is returning student id to use in reducer
    const findStudentId = (studentId, student, findFromObj) => {
        return student.id === findFromObj.student_id ? studentId = student.id : studentId;
    }

    // this function is to merge the students who submitted quizzes or assignments or both
    const mergeStudents = (totalStudents, student, studentsSubmittedQuiz) => {
        if (studentsSubmittedQuiz.findIndex(studentQ => studentQ.id === student.id) === -1) {
            totalStudents.push(student);
        }
        return totalStudents;
    }

    // deciding what to render here
    let content = null;

    if (isLoading || isQuizLoading || isStudentLoading) {
        content = <p>Loading...</p>;
    }

    if (!(isLoading && isQuizLoading && isStudentLoading)
        && (isError || isQuizError || isStudentError)) {
        content = <p>Error...</p>;
    }

    if (!(isLoading && isQuizLoading && isStudentLoading)
        && !(isError && isQuizError && isStudentError)
        && !(allAssignmentMarks?.length && allQuizMarks?.length && students?.length)) {
        content = <p>No Data Found!!</p>;
    }

    if (!(isLoading || isQuizLoading) && !(isError || isQuizError)
        && (allAssignmentMarks?.length || allQuizMarks?.length) && students?.length) {

        // getting all the students who submitted quiz
        const studentsSubmittedQuiz = students.filter(student => student.id === allQuizMarks.reduce((studentId, quizMark) => findStudentId(studentId, student, quizMark), 0));

        // getting all the students who submitted assignment
        const studentsSubmittedAssignment = students.filter(student => student.id === allAssignmentMarks.reduce((studentId, mark) => findStudentId(studentId, student, mark), 0));

        // finding total number of students who submitted quizzes or assignments or both
        const totalSubmittedStudents = studentsSubmittedAssignment.reduce((totalStudents, student) => mergeStudents(totalStudents, student, studentsSubmittedQuiz), [...studentsSubmittedQuiz]);

        // mapping the leaderboard data here
        let leaderboardData = null;

        if (students.length > 20) {
            leaderboardData = totalSubmittedStudents.map(student => {
                return {
                    studentId: student.id,
                    studentName: student.name,
                    quizMark: allQuizMarks.reduce((total, quizMark) => quizMark.student_id === student.id ? total += quizMark.mark : total, 0),
                    assignmentMark: allAssignmentMarks.reduce((total, assignmentMark) => (assignmentMark.student_id === student.id && assignmentMark.status === 'published') ? total += assignmentMark.mark : total, 0)
                }
            });
        } else {
            leaderboardData = students.map(student => {
                return {
                    studentId: student.id,
                    studentName: student.name,
                    quizMark: allQuizMarks.reduce((total, quizMark) => quizMark.student_id === student.id ? total += quizMark.mark : total, 0),
                    assignmentMark: allAssignmentMarks.reduce((total, assignmentMark) => (assignmentMark.student_id === student.id && assignmentMark.status === 'published') ? total += assignmentMark.mark : total, 0)
                }
            });
        }


        // sorting the leaderboard data here
        const sortedLeaderboardData = leaderboardData.sort((ld1, ld2) => ((ld1.quizMark + ld1.assignmentMark) < (ld2.quizMark + ld2.assignmentMark)) ? 1 : ((ld1.quizMark + ld1.assignmentMark) > (ld2.quizMark + ld2.assignmentMark)) ? -1 : 0);

        // ranking student data here
        let rank = 1;

        const rankedLeaderboardData = sortedLeaderboardData.map((studentData, index) => {
            if (index > 0) {
                if ((sortedLeaderboardData[index - 1].quizMark + sortedLeaderboardData[index - 1].assignmentMark) > (studentData.assignmentMark + studentData.quizMark)) {
                    rank++;
                }
            }
            return {
                ...studentData,
                rank,
            };
        }, 1);

        const userData = rankedLeaderboardData.find(data => data.studentId === user.id);

        content =
            <>
                <div>
                    <h3 className='text-lg font-bold'>Your Position in Leaderboard</h3>
                    <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
                        <thead>
                            <tr>
                                <th className='table-th !text-center'>Rank</th>
                                <th className='table-th !text-center'>Name</th>
                                <th className='table-th !text-center'>Quiz Mark</th>
                                <th className='table-th !text-center'>Assignment Mark</th>
                                <th className='table-th !text-center'>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className='border-2 border-cyan'>
                                <td className='table-td text-center font-bold'>{userData.rank}</td>
                                <td className='table-td text-center font-bold'>{user.name}</td>
                                <td className='table-td text-center font-bold'>{userData ? userData.quizMark : 0}</td>
                                <td className='table-td text-center font-bold'>{userData ? userData.assignmentMark : 0}</td>
                                <td className='table-td text-center font-bold'>{userData ? userData.assignmentMark + userData.quizMark : 0}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='my-8'>
                    <h3 className='text-lg font-bold'>Top 20 Result</h3>
                    <table className='text-base w-full border border-slate-600/50 rounded-md my-4'>
                        <thead>
                            <tr className='border-b border-slate-600/50'>
                                <th className='table-th !text-center'>Rank</th>
                                <th className='table-th !text-center'>Name</th>
                                <th className='table-th !text-center'>Quiz Mark</th>
                                <th className='table-th !text-center'>Assignment Mark</th>
                                <th className='table-th !text-center'>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                rankedLeaderboardData.map((studentData) => {
                                    return <LeaderBoardTableRow
                                        key={studentData.studentId}
                                        rank={studentData.rank}
                                        studentData={studentData}
                                        userId={user.id}
                                    />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>;
    }

    // rendering leader board table component here
    return (
        <div className='mx-auto max-w-7xl px-5 lg:px-0'>
            {content}
        </div>
    );
};

export default LeaderBoardTable;