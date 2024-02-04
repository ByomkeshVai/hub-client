import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type PHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelect = ({ label, name, options }: PHSelectProps) => {
  return (
    <Form.Item label={label}>
      <Controller
        rules={{
          required: true,
        }}
        name={name}
        render={({ field }) => (
          <Select {...field} style={{ width: "100%" }} options={options} />
        )}
      />
    </Form.Item>
  );
};

export default PHSelect;
