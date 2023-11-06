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
export declare type ArtistCreateFormInputValues = {
    name?: string;
};
export declare type ArtistCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArtistCreateFormOverridesProps = {
    ArtistCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArtistCreateFormProps = React.PropsWithChildren<{
    overrides?: ArtistCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ArtistCreateFormInputValues) => ArtistCreateFormInputValues;
    onSuccess?: (fields: ArtistCreateFormInputValues) => void;
    onError?: (fields: ArtistCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArtistCreateFormInputValues) => ArtistCreateFormInputValues;
    onValidate?: ArtistCreateFormValidationValues;
} & React.CSSProperties>;
export default function ArtistCreateForm(props: ArtistCreateFormProps): React.ReactElement;
