import { useEffect, useState } from 'react';
import { useLazyGetAssignmentMarkByStudentAndAssignmentIdQuery } from '../features/assignmentMark/assignmentMarkApi';

// custom hook to check has student submitted the assignment or not
const useHasStudentSubmittedAssignment = (studentId, assignmentId) => {
    // integration of RTK Query hooks here
    const [triggerGetAssignmentMarkByStudentAndAssignmentId, { data, isSuccess }] = useLazyGetAssignmentMarkByStudentAndAssignmentIdQuery();

    // integration of react hooks here
    const [hasSubmittedAssignment, setHasSubmittedAssignment] = useState(false);
    const [hasAssignmentsLoaded, setHasAssignmentsLoaded] = useState(false);

    console.log(data);

    // getting assignment mark entries to check if the student has submitted the assignment or not
    useEffect(() => {
        triggerGetAssignmentMarkByStudentAndAssignmentId({ studentId, videoId: assignmentId }, false);

        if (isSuccess) {
            if (data.length) {
                setHasSubmittedAssignment(true);
            } else {
                setHasSubmittedAssignment(false);
            }
            setHasAssignmentsLoaded(isSuccess);
        }
    }, [studentId, assignmentId, data, isSuccess, triggerGetAssignmentMarkByStudentAndAssignmentId]);

    return {
        hasSubmittedAssignment,
        hasAssignmentsLoaded,
    };
}

export default useHasStudentSubmittedAssignment;
