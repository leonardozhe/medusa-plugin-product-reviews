import wrapHandler from "@medusajs/medusa/dist/api/middlewares/await-middleware";
import { RouteConfig } from "..";
import { Request, Response } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

// File service interface for type safety
interface IFileService {
  upload(file: any): Promise<any>;
}

// Security constants
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5; // Maximum 5 files per upload

// Validate file type
function isAllowedImageFile(file: any): boolean {
  const normalizedExt = path.extname(file.originalname).toLowerCase();
  
  // Check extension
  if (!ALLOWED_EXTENSIONS.includes(normalizedExt)) {
    return false;
  }
  
  // Check MIME type
  if (file.mimetype && !ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return false;
  }
  
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return false;
  }
  
  return true;
}

// Sanitize filename to prevent path traversal attacks
function sanitizeFilename(filename: string): string {
  // Remove any path components
  const basename = path.basename(filename);
  // Remove any null bytes and other dangerous characters
  return basename.replace(/[\0\.\.\\/\\]/g, "");
}

// Multer configuration with security settings
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILES,
  },
  fileFilter: (_req: any, file: any, callback: any) => {
    const normalizedExt = path.extname(file.originalname).toLowerCase();
    const allowedMime = file.mimetype && ALLOWED_MIME_TYPES.includes(file.mimetype);
    const allowedExt = ALLOWED_EXTENSIONS.includes(normalizedExt);
    
    if (allowedMime && allowedExt) {
      callback(null, true);
    } else {
      callback(new Error(`Invalid file type. Allowed types: ${ALLOWED_EXTENSIONS.join(", ")}`));
    }
  },
});

export const routes: RouteConfig[] = [
  {
    requiredAuth: false,
    path: "/store/product-reviews/upload",
    method: "post",
    handlers: [upload.array("files", MAX_FILES), wrapHandler(uploadImage)],
  },
];

async function uploadImage(req: Request & { files?: any }, res: Response) {
  const fileService = req.scope.resolve<IFileService>("fileService");

  const files = req.files ? (Array.isArray(req.files) ? req.files : Object.values(req.files)) : [];
  
  // Secondary validation on files
  const validFiles: any[] = [];
  const invalidFiles: any[] = [];
  
  for (const f of files) {
    if (!isAllowedImageFile(f)) {
      invalidFiles.push(f.originalname);
      // Clean up invalid files
      try {
        fs.unlinkSync(f.path);
      } catch (error) {
        console.error("Failed to delete invalid file:", error);
      }
    } else {
      // Sanitize filename
      f.originalname = sanitizeFilename(f.originalname);
      validFiles.push(f);
    }
  }
  
  if (invalidFiles.length > 0 && validFiles.length === 0) {
    return res.status(400).json({
      error: "No valid files uploaded. All files were invalid.",
      invalidFiles
    });
  }

  try {
    const result = await Promise.all(
      validFiles.map(async (f) => {
        return fileService.upload(f).then((uploadResult) => {
          // Clean up temp file after upload
          try {
            fs.unlinkSync(f.path);
          } catch (error) {
            console.error("Failed to delete temp file:", error);
          }
          return uploadResult;
        });
      })
    );

    const response: any = { uploads: result };
    if (invalidFiles.length > 0) {
      response.warnings = {
        message: "Some files were skipped due to invalid type or size",
        invalidFiles
      };
    }
    
    res.status(200).json(response);
  } catch (error) {
    // Clean up all valid files on error
    for (const f of validFiles) {
      try {
        fs.unlinkSync(f.path);
      } catch (e) {
        console.error("Failed to clean up file on error:", e);
      }
    }
    res.status(500).json({ error: "Failed to upload files" });
  }
}

export class IAdminPostUploadsFileReq {
  originalName: string;
  path: string;
}
