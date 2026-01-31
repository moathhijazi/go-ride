import React, { useEffect } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Icon } from "../ui/icon";
import { CircleAlert } from "lucide-react-native";

interface FormInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function ZodInput<T extends FieldValues>({
  control,
  name,
  label,
  ...inputProps
}: FormInputProps<T>) {
  
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <View style={{ marginBottom: 16 }}>
          {label && (
            <Text style={{ marginBottom: 6, fontWeight: "600" }}>
              {label}
            </Text>
          )}

          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={{
              borderWidth: 1,
              borderColor: fieldState.error ? "#ef4444" : "#e5e7eb",
              borderRadius: 12,
              padding: 12,
            }}
            {...inputProps}
          />

          {fieldState.error && (
            <View className="mt-2 flex flex-row items-center gap-x-2">

              <Icon as={CircleAlert} size={17} color={"#ef4444"}/>
              <Text className="text-red-500">{fieldState.error.message}</Text>
           </View>
          )}
        </View>
      )}
    />
  );
}
