import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { semesterOptions } from "../../../../constant/semester";
import { monthOptions } from "../../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schema/academicManagement.schema";

const getCurrentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((value) => ({
  value: String(getCurrentYear + value),
  label: String(getCurrentYear + value),
}));

const CreateAcademicSemester = () => {
  const onsubmit: SubmitErrorHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="name" name="name" options={semesterOptions} />
          <PHSelect label="year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
