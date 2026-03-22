"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/atoms/select";

import { useLocalizacao } from "@/hooks/useLocalizacao";

import {
  Controller,
  useWatch,
  useFormContext,
  useFormState
} from "react-hook-form";
import React from "react";

interface LocationSelectProps {
  name: string;
  label: string;
  tipo: "PAIS" | "ILHA" | "CONCELHO" | "FREGUESIA" | "ZONA" | "NACIONALIDADE";
  parentName?: string;
  parentDefault?: string;
  rules?: any;
  required?: boolean;
  prefixo: "ilhas" | "concelho";
  disabled?: boolean; 
}

const LocationSelect: React.FC<LocationSelectProps> = ({
  name,
  label,
  tipo,
  parentName,
  parentDefault,
  rules,
  prefixo = "ilhas",
  disabled = false,
}) => {
  const { control } = useFormContext();

  const watchedParent = useWatch({
    control,
    name: parentName || "",
  });

  const parentValue = parentDefault ?? (parentName ? watchedParent : undefined);

  const { data: optionsData, error } = useLocalizacao({
    tipo,
    pais: parentValue ? String(parentValue) : undefined,
    prefixo,
  });

  const { errors } = useFormState({ control });

  const getNestedError = (name: string): any => {
    return name
      .split(".")
      .reduce((obj: any, key) => obj?.[key], errors as any);
  };

  const errorMessage = getNestedError(name)?.message;

  return (
    <div className="flex flex-col gap-1">
       <label className="text-sm">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full" disabled={disabled}>
                <SelectValue placeholder={`Selecione ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {!error &&
                  optionsData?.map((option) => (
                    <SelectItem key={option.value} value={option.value as any}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default LocationSelect;
