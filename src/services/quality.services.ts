import * as fs from 'fs';
import * as path from 'path';
import { QualityAttributes } from "../models/quality";
import { QualityRepository } from "../repositories/quality.repository";
import { ValidationError as SequelizeValidationError } from 'sequelize';

interface FileItem {
  name: string;
  isFolder: boolean;
  contents?: FileItem[];
  file?: File;
  isOpen?: boolean;
}
export class QualityService {
  private qualityRepository: QualityRepository;

  constructor() {
    this.qualityRepository = new QualityRepository();
  }
 // Procesar carpeta y archivos recursivamente
 async processFolder(folder: FileItem, parentFolderPath: string): Promise<void> {
  try {
    const folderName = folder.name || 'default_folder';
    const folderPath = path.join(parentFolderPath, folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    console.log(`Carpeta creada: ${folderPath}`);

    // Procesa cada archivo en la carpeta
    if (!folder.isFolder && folder.file) {
      const file = folder.file;
      const filePath = path.join(folderPath, file.name);
      const fileData = Buffer.from(file.data, 'base64');
      fs.writeFileSync(filePath, fileData);
      console.log(`Archivo guardado: ${filePath}`);
    }

    // Procesa subcarpetas recursivamente
    if (folder.contents && Array.isArray(folder.contents)) {
      for (const subfolder of folder.contents) {
        await this.processFolder(subfolder, folderPath);
      }
    }
  } catch (error: any) {
    console.error("Error al procesar la carpeta:", error);
    throw new Error("Error al procesar la carpeta: " + error.message);
  }
}

// Guardar la estructura de carpetas en la base de datos
async uploadFolderStructure(folderStructure: FileItem[]): Promise<void> {
  try {
    const qualityData: QualityAttributes = {
      titulo: 'Estructura de carpetas',
      fechaPublicacion: new Date(),
      file: folderStructure,  // Guardamos la estructura completa en el campo `file`
    };

    // Llamar al repositorio para crear la nueva entrada
    await this.qualityRepository.create(qualityData);
    console.log("Estructura de carpetas subida correctamente.");
  } catch (error: any) {
    console.error("Error al subir la estructura de carpetas:", error.message);
    throw new Error("Error al subir la estructura de carpetas: " + error.message);
  }
}
  
  async create(data: QualityAttributes): Promise<QualityAttributes> {
    try {
      if (!data.titulo) {
        throw new Error('El campo titulo es obligatorio');
      }
      const quality: QualityAttributes = await this.qualityRepository.create(data);
      return quality;
    } catch (error) {
      if (error instanceof SequelizeValidationError) {
        throw new Error('Error de validación: ' + error.message);
      } else if (error instanceof Error) {
        throw new Error('Error al crear la calidad: ' + error.message);
      } else {
        throw new Error('Error desconocido al crear la calidad');
      }
    }
  }

  async get(): Promise<QualityAttributes[]> {
    try {
      return await this.qualityRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async find(id: any): Promise<QualityAttributes> {
    try {
      return await this.qualityRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id: any, data: QualityAttributes): Promise<QualityAttributes> {
    try {
      return await this.qualityRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any): Promise<void> {
    try {
      await this.qualityRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
