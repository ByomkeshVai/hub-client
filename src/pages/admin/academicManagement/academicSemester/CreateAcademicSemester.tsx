import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import { Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";

const CreateAcademicSemester = () => {
  const onsubmit: SubmitErrorHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onsubmit}>
          <PHInput type="text" name="text" label="name" />
          <PHSelect label="name" />
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
