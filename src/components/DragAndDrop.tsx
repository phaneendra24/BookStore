import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "~/utils/api";

export default function DragAndDrop(props: any) {
  const [files, setFiles] = useState<File[]>([]);
  const {
    status: uploadStatus,
    data,
    mutateAsync,
  } = api.minio.generatePreSignedUrlsToUpload.useMutation();
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      maxFiles: 3,
      onDrop: (acceptedFiles: any) => {
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const previews = files.map((file: any, index) => (
    <div key={file.name} className="relative rounded-md">
      <button
        className={`absolute -top-9 right-0 rounded-md text-5xl  text-red-700  hover:scale-105`}
        onClick={() => {
          let temp_files = files;
          temp_files.splice(index, 1);
          console.log(temp_files);
          // setFiles((prev) => temp_files);
          setFiles([...temp_files]);
        }}
      >
        -
      </button>
      <img
        src={file.preview}
        className="h-40 w-full rounded-md"
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  const upload = async () => {
    // const resp = mutate();

    const resp = await mutateAsync({ no_of_urls: files.length });
    console.log("file : ", files[0]);

    try {
      await Promise.all(
        resp.urls.map(async (url, i) => {
          if (!files[i]) {
            return;
          }

          const upload_response = await fetch(url, {
            method: "PUT",
            body: files[i],
            headers: {
              "Content-Type": files[i].type,
            },
          });

          console.log("upload response : ", upload_response);
        })
      );

      console.log("resp : ", resp);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div
          className={`  rounded-md border-[2px] border-dashed ${
            isDragActive && "border-green-600"
          }
          ${isDragReject && "border-red-500"}
            bg-[#1c1c20] py-14 text-center`}
        >
          {/* <Image
            src="/illustrations/draganddrop.svg"
            alt="drag and drop svg"
            width={200}
            height={300}
            className=" mx-auto transition-all duration-500 ease-linear hover:scale-105"
          /> */}
          Drag and drop your file to start uploading
          <div className="my-2 text-gray-300">OR</div>
          <button className="rounded-2xl border border-green-600 px-5 py-1">
            Browse
          </button>
          {/* {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )} */}
        </div>
      </div>
      <div className="mt-8 flex gap-2 ">{previews}</div>

      <div
        className={`mt-8 flex w-full justify-center ${
          files.length > 0 ? "opacity-100" : "pointer-events-none opacity-0"
        }  transition-all duration-500 ease-in`}
      >
        <button
          className=" rounded-md bg-blue-500 px-5 py-1 text-white"
          onClick={upload}
        >
          Upload
        </button>
      </div>
    </section>
  );
}
