import { defineMessages } from "react-intl";

export const formMessages = defineMessages({
  /* Labels */
  email: {
    id: "global.form.email",
    defaultMessage: "Correo electrónico",
  },
  password: {
    id: "global.form.password",
    defaultMessage: "Contraseña",
  },
  /* Placeholders */
  /* Errors */
  required: {
    id: "global.form.required",
    defaultMessage: "Este campo es requerido",
  },
  invalidEmail: {
    id: "global.form.invalidEmail",
    defaultMessage: "Correo electrónico no válido",
  },
});
