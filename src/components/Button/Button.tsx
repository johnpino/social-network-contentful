import { ReactNode } from "react";

type ButtonProps = {
  type: HTMLButtonElement["type"];
  children: ReactNode;
  fullWidth?: boolean;
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`p-2 rounded border-black border-2 hover:bg-slate-200 ${
        props.fullWidth && "w-full"
      }`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
