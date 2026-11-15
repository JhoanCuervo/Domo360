export const fileBase64 = ({ id }: { id: string }) => {
  const fileDrive = DriveApp.getFileById(id);

  const blob = fileDrive.getBlob();

  const base64 = Utilities.base64Encode(blob.getBytes());

  return base64;
};
