import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { semesterStatusOptions } from "../../../constant/semester";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addRegisterSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemster } = useGetAllSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);

  const academicSemesterOptions = academicSemster?.data?.map((value) => ({
    value: value._id,
    label: `${value.name} ${value.year}`,
  }));

  const onsubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    console.log(semesterData);
    try {
      const res = (await addRegisterSemester(semesterData)) as TResponse<any>;
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
        <PHForm onSubmit={onsubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name="startDate" label="Start Date" />
          <PHDatePicker name="endDate" label="End Date" />
          <PHInput name="maxCredit" label="Max Credit" type="number" />
          <PHInput name="minCredit" label="Min Credit" type="number" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
