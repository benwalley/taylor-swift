/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Song } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SongUpdateForm(props) {
  const {
    id: idProp,
    song,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    album: "",
    lyrics: "",
    year: "",
    singer: "",
    writer: "",
    notes: "",
    other: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [album, setAlbum] = React.useState(initialValues.album);
  const [lyrics, setLyrics] = React.useState(initialValues.lyrics);
  const [year, setYear] = React.useState(initialValues.year);
  const [singer, setSinger] = React.useState(initialValues.singer);
  const [writer, setWriter] = React.useState(initialValues.writer);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [other, setOther] = React.useState(initialValues.other);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = songRecord
      ? { ...initialValues, ...songRecord }
      : initialValues;
    setName(cleanValues.name);
    setAlbum(cleanValues.album);
    setLyrics(cleanValues.lyrics);
    setYear(cleanValues.year);
    setSinger(cleanValues.singer);
    setWriter(cleanValues.writer);
    setNotes(cleanValues.notes);
    setOther(cleanValues.other);
    setErrors({});
  };
  const [songRecord, setSongRecord] = React.useState(song);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Song, idProp) : song;
      setSongRecord(record);
    };
    queryData();
  }, [idProp, song]);
  React.useEffect(resetStateValues, [songRecord]);
  const validations = {
    name: [{ type: "Required" }],
    album: [],
    lyrics: [],
    year: [],
    singer: [],
    writer: [],
    notes: [],
    other: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value = getDisplayValue
      ? getDisplayValue(currentValue)
      : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          album,
          lyrics,
          year,
          singer,
          writer,
          notes,
          other,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Song.copyOf(songRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SongUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              album,
              lyrics,
              year,
              singer,
              writer,
              notes,
              other,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Album"
        isRequired={false}
        isReadOnly={false}
        value={album}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album: value,
              lyrics,
              year,
              singer,
              writer,
              notes,
              other,
            };
            const result = onChange(modelFields);
            value = result?.album ?? value;
          }
          if (errors.album?.hasError) {
            runValidationTasks("album", value);
          }
          setAlbum(value);
        }}
        onBlur={() => runValidationTasks("album", album)}
        errorMessage={errors.album?.errorMessage}
        hasError={errors.album?.hasError}
        {...getOverrideProps(overrides, "album")}
      ></TextField>
      <TextField
        label="Lyrics"
        isRequired={false}
        isReadOnly={false}
        value={lyrics}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics: value,
              year,
              singer,
              writer,
              notes,
              other,
            };
            const result = onChange(modelFields);
            value = result?.lyrics ?? value;
          }
          if (errors.lyrics?.hasError) {
            runValidationTasks("lyrics", value);
          }
          setLyrics(value);
        }}
        onBlur={() => runValidationTasks("lyrics", lyrics)}
        errorMessage={errors.lyrics?.errorMessage}
        hasError={errors.lyrics?.hasError}
        {...getOverrideProps(overrides, "lyrics")}
      ></TextField>
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        value={year}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year: value,
              singer,
              writer,
              notes,
              other,
            };
            const result = onChange(modelFields);
            value = result?.year ?? value;
          }
          if (errors.year?.hasError) {
            runValidationTasks("year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("year", year)}
        errorMessage={errors.year?.errorMessage}
        hasError={errors.year?.hasError}
        {...getOverrideProps(overrides, "year")}
      ></TextField>
      <TextField
        label="Singer"
        isRequired={false}
        isReadOnly={false}
        value={singer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year,
              singer: value,
              writer,
              notes,
              other,
            };
            const result = onChange(modelFields);
            value = result?.singer ?? value;
          }
          if (errors.singer?.hasError) {
            runValidationTasks("singer", value);
          }
          setSinger(value);
        }}
        onBlur={() => runValidationTasks("singer", singer)}
        errorMessage={errors.singer?.errorMessage}
        hasError={errors.singer?.hasError}
        {...getOverrideProps(overrides, "singer")}
      ></TextField>
      <TextField
        label="Writer"
        isRequired={false}
        isReadOnly={false}
        value={writer}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year,
              singer,
              writer: value,
              notes,
              other,
            };
            const result = onChange(modelFields);
            value = result?.writer ?? value;
          }
          if (errors.writer?.hasError) {
            runValidationTasks("writer", value);
          }
          setWriter(value);
        }}
        onBlur={() => runValidationTasks("writer", writer)}
        errorMessage={errors.writer?.errorMessage}
        hasError={errors.writer?.hasError}
        {...getOverrideProps(overrides, "writer")}
      ></TextField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year,
              singer,
              writer,
              notes: value,
              other,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <TextField
        label="Other"
        isRequired={false}
        isReadOnly={false}
        value={other}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year,
              singer,
              writer,
              notes,
              other: value,
            };
            const result = onChange(modelFields);
            value = result?.other ?? value;
          }
          if (errors.other?.hasError) {
            runValidationTasks("other", value);
          }
          setOther(value);
        }}
        onBlur={() => runValidationTasks("other", other)}
        errorMessage={errors.other?.errorMessage}
        hasError={errors.other?.hasError}
        {...getOverrideProps(overrides, "other")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || song)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || song) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
