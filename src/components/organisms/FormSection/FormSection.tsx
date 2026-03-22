import {TabsContent} from "@/components/atoms/tabs";
import {useFormContext} from "react-hook-form";
import {Input} from "@/components/atoms/input";
import {Label} from "@/components/atoms/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/atoms/select";

interface BaseField {
    label: string;
    name: string;
}

interface InputField extends BaseField {
    fieldType: "input";
    inputType?: React.HTMLInputTypeAttribute;
    placeholder?: string;
}

interface SelectField extends BaseField {
    fieldType: "select";
    options: ReadonlyArray<{ label: string; value: string }>;
}

export type FieldConfig = InputField | SelectField;

interface FormSectionProps {
    title: string;
    fields: readonly FieldConfig[];
    sectionId: string;
}

export function FormSection({title, fields, sectionId}: FormSectionProps) {
    const {
        register,
        formState: {errors},
        getValues,
        setValue,
    } = useFormContext();

    const hasValue = (fieldName: string): boolean => {
        const currentValue = getValues?.(fieldName);
        return !!currentValue && currentValue !== "";
    };

    return (
        <TabsContent
            value={sectionId}
            className="rounded-xl border border-border bg-card p-6 mt-4"
        >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
                {title}
            </h3>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
                {fields.map((field) => {
                    const fieldError = errors?.[field.name];
                    const fieldHasValue = hasValue(field.name);
                    const currentValue = getValues?.(field.name) || "";

                    return (
                        <div key={field.name} className="space-y-1.5">
                            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                {field.label}
                            </Label>

                            {field.fieldType === "input" && (
                                <Input
                                    {...register(field.name)}
                                    type={field.inputType ?? "text"}
                                    placeholder={field.placeholder}
                                    disabled={fieldHasValue}
                                />
                            )}

                            {field.fieldType === "select" && fieldHasValue ? (
                                <Input value={currentValue} disabled readOnly/>
                            ) : field.fieldType === "select" ? (
                                <Select
                                    value={currentValue}
                                    onValueChange={(value) =>
                                        setValue(field.name, value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione..."/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : null}

                            {fieldError && (
                                <p className="text-xs font-medium text-destructive mt-1">
                                    {String(fieldError.message)}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </TabsContent>
    );
}
