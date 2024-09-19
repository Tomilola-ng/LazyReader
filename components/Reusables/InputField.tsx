interface INPUT_FIELD {
  type: string;
  label: string;
  name: string;
  onChange: (inp: any) => void;
  required?: boolean;
}

export default function InputField({
  type,
  label,
  name,
  onChange,
  required,
}: INPUT_FIELD) {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        required={required || true}
        className="rounded hover:border-primary border p-2 w-full outline-none mt-1 caret-primary"
      />
    </div>
  );
}
