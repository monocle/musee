import React from "react";

interface ButtonProps {
  text?: string | JSX.Element;
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

type Props = ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  className,
  isLoading = false,
  children,
  ...rest
}: Props) {
  let fullClassName = "btn ";

  fullClassName += isLoading ? "loading " : "";
  fullClassName += className ?? "";

  return (
    <button {...rest} className={fullClassName}>
      {!isLoading && (
        <>
          {text}
          {children}
        </>
      )}
    </button>
  );
}
