"use client";

import { Search } from "lucide-react";
import { ChangeEventHandler, ComponentProps, useState } from "react";
import { Input } from "./input";

interface Props extends ComponentProps<"input"> {
  onSearch: (query: string) => void;
  classes?: { root?: string };
}

export const SearchInput = ({
  onSearch,
  onChange,
  className,
  placeholder = "Search a product...",
  ...props
}: Props) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (typingTimeout) clearTimeout(typingTimeout);

    const queryValue = event.target.value;

    const newTypingTimeout = setTimeout(() => {
      onSearch(queryValue);
    }, 500);

    setTypingTimeout(newTypingTimeout);

    if (onChange) onChange(event);
  };

  return (
    <Input
      className={className}
      placeholder={placeholder}
      suffix={<Search />}
      onChange={handleChange}
      {...props}
    />
  );
};
