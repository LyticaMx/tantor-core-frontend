import PasswordInput from "@/components/PasswordInput";
import { useAuth } from "@/context/Auth";
import { useFormatMessage } from "@/hooks/useFormatMessage";
import { Button, Input } from "@nextui-org/react";
import { useFormik } from "formik";
import { object, string } from "yup";

interface FormValues {
  email: string;
  password: string;
}

const AuthForm = () => {
  const getMessage = useFormatMessage();
  const { actions } = useAuth();

  const formik = useFormik<FormValues>({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => await actions?.signIn(values),
    validationSchema: object({
      email: string()
        .required(getMessage("required"))
        .email(getMessage("invalidEmail")),
      password: string().required(getMessage("required")),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      onReset={formik.handleReset}
      className="w-full"
    >
      <Input
        name="email"
        type="email"
        label={getMessage("email")}
        className="mb-4"
        fullWidth
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.touched.email && formik.errors.email}
      />
      <PasswordInput
        name="password"
        label={getMessage("password")}
        fullWidth
        className="mb-4"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.touched.password && formik.errors.password}
      />
      <Button type="submit" fullWidth variant="solid" color="primary">
        Iniciar sesión
      </Button>
    </form>
  );
};

export default AuthForm;
