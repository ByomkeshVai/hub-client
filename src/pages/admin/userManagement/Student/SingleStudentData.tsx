import { useParams } from "react-router-dom";

const SingleStudentData = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h1>This is SingleStudentData {studentId}</h1>
    </div>
  );
};

export default SingleStudentData;
