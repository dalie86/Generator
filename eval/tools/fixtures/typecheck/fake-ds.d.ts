// Миниатюрная «дизайн-система» для теста проверки типов.
declare global {
  namespace JSX {
    type Element = unknown;
    interface IntrinsicElements {
      [name: string]: Record<string, unknown>;
    }
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  children?: unknown;
}
export declare function Button(props: ButtonProps): JSX.Element;

export interface TextFieldProps {
  label: string;
  required?: boolean;
  error?: string;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
