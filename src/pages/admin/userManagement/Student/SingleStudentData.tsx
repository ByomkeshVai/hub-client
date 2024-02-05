import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagement.api";
import { Row, Spin } from "antd";

const SingleStudentData = () => {
  const { studentId } = useParams();
  const { data: student, isLoading } = useGetSingleStudentQuery(studentId);

  if (isLoading) {
    <Row justify="center">
      <Spin fullscreen size="large" />;
    </Row>;
  }

  console.log(student?.data);
  return (
    <div>
      <h1>This is SingleStudentData {studentId}</h1>
    </div>
  );
};

export default SingleStudentData;
