"use client";

import { useCallback, useRef, useState } from "react";
import type { FileUIPart } from "ai";

export interface Attachment {
  id: string;
  file: File;
  mediaType: string;
  previewUrl: string; // Object URL for thumbnail display
  dataUrl: string; // base64 data URL for API
  filename: string;
}

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

const MAX_FILES = 5;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_DOC_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_DIMENSION = 2048; // Resize longest edge to keep payload manageable

/**
 * Hook for managing file attachments with validation and client-side image resizing.
 * Generates both preview URLs (for thumbnails) and data URLs (for API submission).
 */
export function useFileAttachments() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const idCounter = useRef(0);

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null);
      const fileArray = Array.from(files);

      // Check max count
      const remaining = MAX_FILES - attachments.length;
      if (remaining <= 0) {
        setError(`Maximum ${MAX_FILES} files allowed`);
        return;
      }

      const toAdd = fileArray.slice(0, remaining);
      if (fileArray.length > remaining) {
        setError(`Only ${remaining} more file(s) can be added`);
      }

      const newAttachments: Attachment[] = [];

      for (const file of toAdd) {
        // Validate type
        if (!ACCEPTED_TYPES.includes(file.type)) {
          setError(`Unsupported file type: ${file.type.split("/")[1] || file.name}`);
          continue;
        }

        // Validate size
        const isImage = file.type.startsWith("image/");
        const maxBytes = isImage ? MAX_IMAGE_BYTES : MAX_DOC_BYTES;
        if (file.size > maxBytes) {
          setError(
            `${file.name} exceeds ${isImage ? "10MB" : "5MB"} limit`
          );
          continue;
        }

        // Process file
        const id = `attachment-${++idCounter.current}`;
        const previewUrl = URL.createObjectURL(file);

        let dataUrl: string;
        if (isImage) {
          dataUrl = await resizeImageToDataUrl(file);
        } else {
          dataUrl = await fileToDataUrl(file);
        }

        newAttachments.push({
          id,
          file,
          mediaType: file.type,
          previewUrl,
          dataUrl,
          filename: file.name,
        });
      }

      if (newAttachments.length > 0) {
        setAttachments((prev) => [...prev, ...newAttachments]);
      }
    },
    [attachments.length]
  );

  const removeAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
    setError(null);
  }, []);

  const clearAttachments = useCallback(() => {
    setAttachments((prev) => {
      prev.forEach((a) => URL.revokeObjectURL(a.previewUrl));
      return [];
    });
    setError(null);
  }, []);

  /** Convert current attachments to FileUIPart[] for sendMessage */
  const toFileUIParts = useCallback((): FileUIPart[] => {
    return attachments.map((a) => ({
      type: "file" as const,
      mediaType: a.mediaType,
      url: a.dataUrl,
      filename: a.filename,
    }));
  }, [attachments]);

  return {
    attachments,
    error,
    addFiles,
    removeAttachment,
    clearAttachments,
    toFileUIParts,
  };
}

// ── Helpers ────────────────────────────────────────────────────────

/** Read a file as a base64 data URL */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Resize image to max dimension and return as data URL */
function resizeImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Only resize if needed
      if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
        URL.revokeObjectURL(img.src);
        fileToDataUrl(file).then(resolve).catch(reject);
        return;
      }

      // Scale to fit within MAX_DIMENSION
      const scale = MAX_DIMENSION / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      URL.revokeObjectURL(img.src);
      // Use JPEG for photos (smaller), PNG for transparent images
      const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
      const quality = outputType === "image/jpeg" ? 0.85 : undefined;
      resolve(canvas.toDataURL(outputType, quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(file);
  });
}
