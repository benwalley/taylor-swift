/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Song } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
}) {
  const labelElement = <Text>{label}</Text>;
  const { tokens } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            color={tokens.colors.brand.primary[80]}
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
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
    lyrics: [],
    year: "",
    date: "",
    singer: "",
    writer: "",
    notes: "",
    other: "",
    artistId: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [album, setAlbum] = React.useState(initialValues.album);
  const [lyrics, setLyrics] = React.useState(initialValues.lyrics);
  const [year, setYear] = React.useState(initialValues.year);
  const [date, setDate] = React.useState(initialValues.date);
  const [singer, setSinger] = React.useState(initialValues.singer);
  const [writer, setWriter] = React.useState(initialValues.writer);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [other, setOther] = React.useState(initialValues.other);
  const [artistId, setArtistId] = React.useState(initialValues.artistId);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = songRecord
      ? { ...initialValues, ...songRecord }
      : initialValues;
    setName(cleanValues.name);
    setAlbum(cleanValues.album);
    setLyrics(cleanValues.lyrics ?? []);
    setCurrentLyricsValue("");
    setYear(cleanValues.year);
    setDate(cleanValues.date);
    setSinger(cleanValues.singer);
    setWriter(cleanValues.writer);
    setNotes(cleanValues.notes);
    setOther(cleanValues.other);
    setArtistId(cleanValues.artistId);
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
  const [currentLyricsValue, setCurrentLyricsValue] = React.useState("");
  const lyricsRef = React.createRef();
  const validations = {
    name: [{ type: "Required" }],
    album: [],
    lyrics: [],
    year: [],
    date: [],
    singer: [],
    writer: [],
    notes: [],
    other: [],
    artistId: [],
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
          date,
          singer,
          writer,
          notes,
          other,
          artistId,
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
              date,
              singer,
              writer,
              notes,
              other,
              artistId,
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
              date,
              singer,
              writer,
              notes,
              other,
              artistId,
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
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics: values,
              year,
              date,
              singer,
              writer,
              notes,
              other,
              artistId,
            };
            const result = onChange(modelFields);
            values = result?.lyrics ?? values;
          }
          setLyrics(values);
          setCurrentLyricsValue("");
        }}
        currentFieldValue={currentLyricsValue}
        label={"Lyrics"}
        items={lyrics}
        hasError={errors.lyrics?.hasError}
        setFieldValue={setCurrentLyricsValue}
        inputFieldRef={lyricsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Lyrics"
          isRequired={false}
          isReadOnly={false}
          value={currentLyricsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.lyrics?.hasError) {
              runValidationTasks("lyrics", value);
            }
            setCurrentLyricsValue(value);
          }}
          onBlur={() => runValidationTasks("lyrics", currentLyricsValue)}
          errorMessage={errors.lyrics?.errorMessage}
          hasError={errors.lyrics?.hasError}
          ref={lyricsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "lyrics")}
        ></TextField>
      </ArrayField>
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
              date,
              singer,
              writer,
              notes,
              other,
              artistId,
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
        label="Date"
        isRequired={false}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year,
              date: value,
              singer,
              writer,
              notes,
              other,
              artistId,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
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
              date,
              singer: value,
              writer,
              notes,
              other,
              artistId,
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
              date,
              singer,
              writer: value,
              notes,
              other,
              artistId,
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
              date,
              singer,
              writer,
              notes: value,
              other,
              artistId,
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
              date,
              singer,
              writer,
              notes,
              other: value,
              artistId,
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
      <TextField
        label="Artist id"
        isRequired={false}
        isReadOnly={false}
        value={artistId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              album,
              lyrics,
              year,
              date,
              singer,
              writer,
              notes,
              other,
              artistId: value,
            };
            const result = onChange(modelFields);
            value = result?.artistId ?? value;
          }
          if (errors.artistId?.hasError) {
            runValidationTasks("artistId", value);
          }
          setArtistId(value);
        }}
        onBlur={() => runValidationTasks("artistId", artistId)}
        errorMessage={errors.artistId?.errorMessage}
        hasError={errors.artistId?.hasError}
        {...getOverrideProps(overrides, "artistId")}
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
