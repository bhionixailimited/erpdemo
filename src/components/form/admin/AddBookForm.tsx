import { Autocomplete, Skeleton, TextField } from "@mui/material";
import {
  AddAuthor,
  AddBookCategory,
  AddBookPublication,
} from "components/admin";
import {
  Button,
  CustomAutocomplete,
  InputField,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useDeferredValue, useMemo, useState } from "react";
import BatchType from "types/batch";
import { BookType } from "types/book";
import { BookCategoryType } from "types/bookcategory";
import { PublicationType } from "types/publication";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

type dataType = {
  data: BookType;
};
type authorType = {
  data: PublicationType[];
};
type categoryType = {
  data: BookCategoryType[];
};
const AddBookForm = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [publicationSearch, setPublicationSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [batchSearch, setBatchSearch] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const publicationText = useDeferredValue(publicationSearch);
  const categoryText = useDeferredValue(categorySearch);
  const batchText = useDeferredValue(batchSearch);
  const { edit, editId } = useRouter().query;
  const { data: authors, isValidating: authorValidating } =
    useSWRFetch<authorType>(
      `author?pageNo=1` + (searchText ? `&searchTitle=${searchText}` : "")
    );
  const { data: publications, isValidating: publicationValidating } =
    useSWRFetch<authorType>(
      `publication?pageNo=1` +
        (publicationText ? `&searchTitle=${publicationText}` : "")
    );
  const { data: categories, isValidating: categoryValidating } =
    useSWRFetch<categoryType>(
      `book-Category?pageNo=1` +
        (categoryText ? `&searchTitle=${categoryText}` : "")
    );
  const { mutate: bookAdd } = useFetch();
  const {
    data: book,
    mutate,
    isValidating,
  } = useSWRFetch<dataType>(editId && `book/${editId}`);
  const { data: batch, isValidating: batchValidating } = useSWRFetch<{
    data?: BatchType[];
  }>(
    `batch?course=true&branch=true&session=true&pageNo=1` +
      (batchText ? `&searchTitle=${batchText}` : "")
  );
  const [tags, setTags] = useState<any>(() => (editId ? book?.data?.tags : []));
  const router = useRouter();
  const [addNewItemTitle, setAddNewItemTitle] = useState("");

  const addFormSchema = useMemo(() => {
    return [
      {
        key: "0",
        label: "Image",
        name: "image",
        initialValue: "",
        validationSchema: Yup.string(),
        type: "file",
      },
      {
        key: "1",
        label: "Book Title *",
        name: "title",
        initialValue: "",
        validationSchema: Yup.string().required("Title is required"),
        type: "text",
      },

      {
        key: "2",
        label: "Author",
        name: "author",
        initialValue: "",
        type: "autocomplete",
        options: authors?.data?.map((data: PublicationType) => ({
          label: `${data?.name}`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "3",
        label: "Accession Number *",
        name: "accessionNumber",
        initialValue: "",
        validationSchema: Yup.string().required("Accession Number is required"),
        type: "text",
      },
      {
        key: "4",
        label: "Price",
        name: "price",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "number",
      },
      {
        key: "5",
        label: "Book Summary",
        name: "summery",
        initialValue: "",
        validationSchema: Yup.string(),
        type: "textarea",
        multiline: true,
        row: 5,
      },
      {
        key: "6",
        label: "Publication",
        name: "publication",
        initialValue: "",
        // validationSchema: Yup.string().required("Publication is required"),
        type: "autocomplete",
        options: publications?.data?.map((data: PublicationType) => ({
          label: `${data?.name}`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "7",
        label: "Date of publication",
        name: "dateOfPublication",
        initialValue: "",
        // validationSchema: Yup.string().required("Publication date is required"),
        type: "date",
      },
      {
        key: "8",
        label: "Category",
        name: "category",
        initialValue: "",
        // validationSchema: Yup.string().required("Book category is required"),
        type: "autocomplete",
        options: categories?.data?.map((data: BookCategoryType) => ({
          label: `${data?.title ? data?.title : " "}`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "9",
        label: "Number of books *",
        name: "quantity",
        initialValue: "",
        validationSchema: Yup.string().required("Book quantity is required"),
        type: "number",
      },
      {
        key: "10",
        label: "Batch",
        name: "batch",
        initialValue: "",
        // validationSchema: Yup.string().required("Book category is required"),
        type: "autocomplete",
        options: batch?.data?.map((data) => ({
          label: `${data?.course?.title} ${data?.branch?.title} (${data?.session?.title})`,
          value: data?._id,
          key: data?._id,
        })),
      },
      {
        key: "11",
        label: "Tags",
        name: "tags",
        initialValue: tags,
      },
    ];
  }, [
    authors?.data,
    batch?.data,
    categories?.data,
    publications?.data,
    tags,
    editId,
  ]);

  const initialValues = addFormSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = addFormSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    initialValues: editId
      ? {
          image: book?.data?.imageUrl,
          title: book?.data?.title,
          author: book?.data?.author?._id,
          accessionNumber: book?.data?.accessionNumber,
          price: book?.data?.price,
          summery: book?.data?.summery,
          quantity: book?.data?.quantity,
          publication: book?.data?.publication?._id,
          batch: book?.data?.batch?._id,
          dateOfPublication:
            book?.data?.dateOfPublication &&
            dayjs(`${book?.data?.dateOfPublication}`).format("YYYY-MM-DD"),

          category: book?.data?.bookCategory?._id,
          tags: book?.data?.tags ? book?.data?.tags : [],
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // return;
      try {
        const response = await bookAdd({
          path: editId ? `book/update/${editId}` : `book/create`,
          method: editId ? "PUT" : "POST",
          body: autoAddFormdata({
            ...values,
            category:
              typeof values?.category === "object"
                ? values?.category?.value
                : values?.category,
            batch:
              typeof values?.batch === "object"
                ? values?.batch?.value
                : values?.batch,
            author:
              typeof values?.author === "object"
                ? values?.author?.value
                : values?.author,
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        notify.success(response?.data?.message);
        mutate();
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
    enableReinitialize: true,
  });

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col bg-white rounded-xl shadow-xl">
      <AddAuthor
        addNewItemTitle={addNewItemTitle}
        setAddNewItemTitle={setAddNewItemTitle}
      />
      <AddBookCategory
        addNewItemTitle={addNewItemTitle}
        setAddNewItemTitle={setAddNewItemTitle}
      />
      <AddBookPublication
        addNewItemTitle={addNewItemTitle}
        setAddNewItemTitle={setAddNewItemTitle}
      />

      {isValidating ? (
        <div className=" gap-4 w-full mx-auto py-8 px-4 bg-white shadow-xl">
          <Skeleton variant="text" height={30} width={100} animation="wave" />
          <Skeleton variant="text" width={100} animation="wave" />
          <Skeleton variant="text" width={400} animation="wave" />
          <Skeleton variant="rounded" height={300} animation="wave" />
          <div className="grid grid-cols-2 gap-4 md:gap-8 h-fit w-full  ">
            {Array(7)
              .fill(0)
              ?.map((item, index) => (
                <span className="flex flex-col gap-4" key={index}>
                  <Skeleton variant="text" width={80} animation="wave" />
                  <Skeleton variant="rounded" height={50} animation="wave" />
                </span>
              ))}
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-semibold tracking-wide border-b text-2xl p-4 text-theme text-center">
            {edit ? `Update` : `Add New`} Book
          </h3>
          <form
            className="grid grid-cols-2 gap-4 p-4"
            onSubmit={formik.handleSubmit}
          >
            {addFormSchema?.map((item, i) => {
              if (item?.name === "tags") {
                return (
                  <div className="w-full flex flex-col gap-4 " key={i}>
                    <h3 className={""}>{"Select Tags"}</h3>
                    <Autocomplete
                      multiple
                      value={formik?.values?.tags}
                      options={[]}
                      defaultValue={formik?.values?.tags}
                      freeSolo
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_e, value) => {
                        formik.setFieldValue("tags", value);
                      }}
                    />
                  </div>
                );
              }
              if (item?.type === "file") {
                return (
                  <div
                    className="w-full col-span-2 flex flex-col items-center"
                    key={item?.key}
                  >
                    <h3 className="font-medium tracking-wide mb-4 text-base">
                      Upload Book Image
                    </h3>
                    <UploadFile
                      outerClassName="max-w-sm w-full"
                      url={
                        formik.values.image &&
                        (typeof formik.values.image === "string"
                          ? formik.values.image
                          : URL.createObjectURL(formik?.values?.image))
                      }
                      onChange={(e: any) =>
                        formik?.setFieldValue("image", e.target.files[0])
                      }
                    />
                  </div>
                );
              } else if (item?.type === "textarea") {
                return (
                  <div className="w-full col-span-2" key={item?.key}>
                    <InputField
                      label={item?.label}
                      name={item?.name}
                      type={"text"}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      error={Boolean(
                        formik?.touched[item?.name] &&
                          formik?.errors[item?.name]
                      )}
                      helperText={
                        formik?.touched[item?.name] &&
                        (formik?.errors[item?.name] as any)
                      }
                      value={formik?.values[item?.name]}
                      multiline={item?.multiline}
                      rows={item?.row}
                    />
                  </div>
                );
              } else if (item?.type === "autocomplete") {
                if (item?.name === "author") {
                  return (
                    <div
                      className="w-full col-span-2 lg:col-span-1"
                      key={item?.key}
                    >
                      {isValidating ? (
                        <Skeleton
                          variant="rounded"
                          height={50}
                          animation="wave"
                        />
                      ) : (
                        <CustomAutocomplete
                          label={item?.label}
                          isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                          }
                          onSearchTextChange={(e) =>
                            setSearchTitle(e?.target?.value)
                          }
                          value={
                            formik.values?.[item?.name]
                              ? authors?.data
                                  ?.filter(
                                    (value: any) =>
                                      value?._id === formik.values?.[item?.name]
                                  )
                                  .map((item) => {
                                    return {
                                      label: `${item?.name}`,
                                      value: item?._id,
                                      key: item?._id,
                                    };
                                  })?.[0]
                              : editId
                              ? {
                                  label: " ",
                                  value: " ",
                                  key: " ",
                                }
                              : undefined
                          }
                          noOptionText={
                            <div className="w-full flex flex-col gap-2">
                              <small className="tracking-wide">
                                No {item?.label?.toLowerCase()} found
                              </small>
                              <div
                                className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                onClick={() =>
                                  item?.name === "publication"
                                    ? router?.push(
                                        `/panel/admin/config/publication`
                                      )
                                    : item?.name === "category"
                                    ? router?.push(
                                        `/panel/admin/config/book-category`
                                      )
                                    : item?.name === "author"
                                    ? router?.push(`/panel/admin/config/author`)
                                    : ""
                                }
                              >
                                Add New {item?.label}
                              </div>
                            </div>
                          }
                          onChange={(_e, value) => {
                            formik?.setFieldValue("author", value?.value);
                          }}
                          options={item?.options || []}
                        />
                      )}
                    </div>
                  );
                }
                if (item?.name === "publication") {
                  return (
                    <div
                      className="w-full col-span-2 lg:col-span-1"
                      key={item?.key}
                    >
                      {isValidating ? (
                        <Skeleton
                          variant="rounded"
                          height={50}
                          animation="wave"
                        />
                      ) : (
                        <CustomAutocomplete
                          label={item?.label}
                          isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                          }
                          onSearchTextChange={(e) =>
                            setPublicationSearch(e?.target?.value)
                          }
                          value={
                            formik.values?.[item?.name]
                              ? publications?.data
                                  ?.filter(
                                    (value: any) =>
                                      value?._id === formik.values?.[item?.name]
                                  )
                                  .map((item) => {
                                    return {
                                      label: `${item?.name}`,
                                      value: item?._id,
                                      key: item?._id,
                                    };
                                  })?.[0]
                              : editId
                              ? {
                                  label: " ",
                                  value: " ",
                                  key: " ",
                                }
                              : undefined
                          }
                          noOptionText={
                            <div className="w-full flex flex-col gap-2">
                              <small className="tracking-wide">
                                No {item?.label?.toLowerCase()} found
                              </small>
                              <div
                                className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                onClick={() =>
                                  item?.name === "publication"
                                    ? router?.push(
                                        `/panel/admin/config/publication`
                                      )
                                    : item?.name === "category"
                                    ? router?.push(
                                        `/panel/admin/config/book-category`
                                      )
                                    : item?.name === "author"
                                    ? router?.push(`/panel/admin/config/author`)
                                    : ""
                                }
                              >
                                Add New {item?.label}
                              </div>
                            </div>
                          }
                          onChange={(_e, value) => {
                            formik?.setFieldValue(item?.name, value?.value);
                          }}
                          options={item?.options || []}
                        />
                      )}
                    </div>
                  );
                }
                if (item?.name === "category") {
                  return (
                    <div
                      className="w-full col-span-2 lg:col-span-1"
                      key={item?.key}
                    >
                      {isValidating ? (
                        <Skeleton
                          variant="rounded"
                          height={50}
                          animation="wave"
                        />
                      ) : (
                        <CustomAutocomplete
                          label={item?.label}
                          isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                          }
                          onSearchTextChange={(e) =>
                            setCategorySearch(e?.target?.value)
                          }
                          value={
                            formik.values?.[item?.name]
                              ? categories?.data
                                  ?.filter(
                                    (value: any) =>
                                      value?._id === formik.values?.[item?.name]
                                  )
                                  .map((item) => {
                                    return {
                                      label: `${item?.title}`,
                                      value: item?._id,
                                      key: item?._id,
                                    };
                                  })?.[0]
                              : editId
                              ? {
                                  label: " ",
                                  value: " ",
                                  key: " ",
                                }
                              : undefined
                          }
                          noOptionText={
                            <div className="w-full flex flex-col gap-2">
                              <small className="tracking-wide">
                                No {item?.label?.toLowerCase()} found
                              </small>
                              <div
                                className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                onClick={() =>
                                  item?.name === "publication"
                                    ? router?.push(
                                        `/panel/admin/config/publication`
                                      )
                                    : item?.name === "category"
                                    ? router?.push(
                                        `/panel/admin/config/book-category`
                                      )
                                    : item?.name === "author"
                                    ? router?.push(`/panel/admin/config/author`)
                                    : ""
                                }
                              >
                                Add New {item?.label}
                              </div>
                            </div>
                          }
                          onChange={(_e, value) => {
                            formik?.setFieldValue(item?.name, value?.value);
                          }}
                          options={item?.options || []}
                        />
                      )}
                    </div>
                  );
                }
                if (item?.name === "batch") {
                  return (
                    <div
                      className="w-full col-span-2 lg:col-span-1"
                      key={item?.key}
                    >
                      {isValidating ? (
                        <Skeleton
                          variant="rounded"
                          height={50}
                          animation="wave"
                        />
                      ) : (
                        <CustomAutocomplete
                          label={item?.label}
                          isOptionEqualToValue={(option, value) =>
                            option?.value === value?.value
                          }
                          onSearchTextChange={(e) =>
                            setBatchSearch(e?.target?.value)
                          }
                          value={
                            formik.values?.[item?.name]
                              ? batch?.data
                                  ?.filter(
                                    (value: any) =>
                                      value?._id === formik.values?.[item?.name]
                                  )
                                  .map((item) => {
                                    return {
                                      key: item?._id,
                                      label: `${item?.course?.title} ${item?.branch?.title} (${item?.session?.title})`,
                                      value: item?._id,
                                    };
                                  })?.[0]
                              : editId
                              ? {
                                  label: " ",
                                  value: " ",
                                  key: " ",
                                }
                              : undefined
                          }
                          noOptionText={
                            <div className="w-full flex flex-col gap-2">
                              <small className="tracking-wide">
                                No {item?.label?.toLowerCase()} found
                              </small>
                              <div
                                className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                                onClick={() =>
                                  item?.name === "publication"
                                    ? router?.push(
                                        `/panel/admin/config/publication`
                                      )
                                    : item?.name === "category"
                                    ? router?.push(
                                        `/panel/admin/config/book-category`
                                      )
                                    : item?.name === "author"
                                    ? router?.push(`/panel/admin/config/author`)
                                    : ""
                                }
                              >
                                Add New {item?.label}
                              </div>
                            </div>
                          }
                          onChange={(_e, value) => {
                            formik?.setFieldValue(item?.name, value?.value);
                          }}
                          options={item?.options || []}
                        />
                      )}
                    </div>
                  );
                }
              } else {
                return (
                  <div
                    className="w-full col-span-2 lg:col-span-1"
                    key={item?.key}
                  >
                    <InputField
                      label={item?.label}
                      name={item?.name}
                      type={item?.type as any}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      value={formik?.values[item?.name]}
                      options={item?.options}
                      error={Boolean(
                        formik?.touched[item?.name] &&
                          formik?.errors[item?.name]
                      )}
                      helperText={
                        formik?.touched[item?.name] &&
                        (formik?.errors[item?.name] as any)
                      }
                    />
                  </div>
                );
              }
            })}

            <div className="flex items-center justify-center col-span-2 ">
              <Button type="submit" loading={formik.isSubmitting}>
                {edit ? `Update` : `Add`} Book
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddBookForm;
