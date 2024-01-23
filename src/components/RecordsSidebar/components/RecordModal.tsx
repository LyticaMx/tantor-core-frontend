import { useFormatMessage } from "@/hooks/useFormatMessage";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { modalMessages } from "../messages";
import { PlusIcon } from "@heroicons/react/24/outline";

interface FormValues {
  name: string;
}

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialState?: FormValues;
}

const RecordModal = (props: Props) => {
  const getMessage = useFormatMessage(modalMessages);
  const formik = useFormik<FormValues>({
    initialValues: {
      name: props.initialState?.name ?? "",
    },
    onSubmit: (values: FormValues) => {
      console.log(values);
      props.onOpenChange(false);
    },
    validationSchema: object({
      name: string().required(getMessage("required")),
    }),
    enableReinitialize: true,
  });

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="flex gap-2 items-center">
            <PlusIcon className="w-5 h-5" />
            {getMessage("newRecord")}
          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Input
              name="name"
              type="text"
              className="mb-4"
              label={getMessage("name")}
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errorMessage={formik.touched.name && formik.errors.name}
            />
            <Button type="submit" color="primary" fullWidth>
              {getMessage("create")}
            </Button>
          </form>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default RecordModal;
