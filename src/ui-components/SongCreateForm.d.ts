/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SongCreateFormInputValues = {
    name?: string;
    album?: string;
    lyrics?: string;
    year?: string;
    singer?: string;
    writer?: string;
    notes?: string;
    other?: string;
};
export declare type SongCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    album?: ValidationFunction<string>;
    lyrics?: ValidationFunction<string>;
    year?: ValidationFunction<string>;
    singer?: ValidationFunction<string>;
    writer?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
    other?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SongCreateFormOverridesProps = {
    SongCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    album?: PrimitiveOverrideProps<TextFieldProps>;
    lyrics?: PrimitiveOverrideProps<TextFieldProps>;
    year?: PrimitiveOverrideProps<TextFieldProps>;
    singer?: PrimitiveOverrideProps<TextFieldProps>;
    writer?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
    other?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SongCreateFormProps = React.PropsWithChildren<{
    overrides?: SongCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SongCreateFormInputValues) => SongCreateFormInputValues;
    onSuccess?: (fields: SongCreateFormInputValues) => void;
    onError?: (fields: SongCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SongCreateFormInputValues) => SongCreateFormInputValues;
    onValidate?: SongCreateFormValidationValues;
} & React.CSSProperties>;
export default function SongCreateForm(props: SongCreateFormProps): React.ReactElement;
