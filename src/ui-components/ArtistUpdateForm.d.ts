/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Artist } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ArtistUpdateFormInputValues = {
    name?: string;
};
export declare type ArtistUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArtistUpdateFormOverridesProps = {
    ArtistUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArtistUpdateFormProps = React.PropsWithChildren<{
    overrides?: ArtistUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    artist?: Artist;
    onSubmit?: (fields: ArtistUpdateFormInputValues) => ArtistUpdateFormInputValues;
    onSuccess?: (fields: ArtistUpdateFormInputValues) => void;
    onError?: (fields: ArtistUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArtistUpdateFormInputValues) => ArtistUpdateFormInputValues;
    onValidate?: ArtistUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ArtistUpdateForm(props: ArtistUpdateFormProps): React.ReactElement;
