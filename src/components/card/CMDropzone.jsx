import { Group, Text, useMantineTheme } from "@mantine/core";
import { Upload, Photo, X } from "tabler-icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

function getIconColor(status, theme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({ status, ...props }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status, theme) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: "none" }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size="xl" inline>
        Drag images here or click to select files
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Attach as many files as you like, each file should not exceed 5mb
      </Text>
    </div>
  </Group>
);

function CMDropzone({ image, setImage }) {
  const theme = useMantineTheme();

  return (
    <Dropzone
      onDrop={([file]) => {
        setImage({ file: file, isLoaded: true });
      }}
      onReject={(file) => console.log("rejected files", file)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}

export default CMDropzone;
