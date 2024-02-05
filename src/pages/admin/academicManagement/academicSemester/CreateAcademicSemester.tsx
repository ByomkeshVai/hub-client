import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import PHForm from "../../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { semesterOptions } from "../../../../constant/semester";
import { monthOptions } from "../../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../schema/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global";
import { TAcademicSemester } from "../../../../types";

const getCurrentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((value) => ({
  value: String(getCurrentYear + value),
  label: String(getCurrentYear + value),
}));

const CreateAcademicSemester = () => {
  const [addAcedmicSemester] = useAddAcademicSemesterMutation();
  const onsubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    const name = semesterOptions[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcedmicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester Created", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Semester Name"
            name="name"
            options={semesterOptions}
          />
          <PHSelect label="Semester Year" name="year" options={yearOptions} />
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
