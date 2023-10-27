// file.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './entities/file.model';
import { Multer } from 'multer';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private readonly fileModel: Model<FileDocument>) {}

  async uploadFile(file: Multer.File, domainName: string) {
    console.log('Received domainName:', domainName);

    if (!domainName) {
      throw new Error('domainName is required');
    }
    console.log(file)
    console.log(file.originalname)
    // const checkFile = await this.fileModel.find({name: file.originalname, domainName: domainName});
    const checkFile = await this.fileModel.findOne({ name: file.originalname, domainName: domainName }).exec();
    console.log(checkFile)
    if(checkFile!==null) {
      throw new Error('Same file with this domain name already exists');
    }

    const savedFile = await this.fileModel.create({
      name: file.originalname,
      domainName: domainName,
    });

    return {
      fileId: savedFile._id, 
      fileName: savedFile.name,
      domainName: savedFile.domainName,
    };
  }

async getImagesByDomainName(domainName: string){
  return await this.fileModel.find({domainName})
}

  async getFileById(fileId: string) {
    try {
      const file = await this.fileModel.findById(fileId);

      if (!file) {
        throw new NotFoundException('File not found');
      }

      return file;
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async getFileName(domainName: string, name: string) {
    try {
      const file = await this.fileModel.findOne({ domainName, name });

      if (!file) {
        throw new NotFoundException('File not found');
      }

      return { fileName: file.name };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
