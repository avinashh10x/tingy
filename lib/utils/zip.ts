import JSZip from "jszip";

interface FileEntry {
  name: string;
  blob: Blob;
}

/**
 * Creates a ZIP file from a list of blobs
 */
export async function createZip(files: FileEntry[]): Promise<Blob> {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.name, file.blob);
  });

  return await zip.generateAsync({ type: "blob" });
}
