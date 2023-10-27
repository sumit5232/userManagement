// file.controller.ts
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { FileService } from './file.service';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';

@Controller('image')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Body('domainName') domainName: string) {
    const uploadedFile = await this.fileService.uploadFile(file, domainName);
    return uploadedFile;
  }

  @Get(':id')
  async serveFile(@Param('id') fileId: string, @Res() res: Response) {
    const file = await this.fileService.getFileById(fileId);
  
       res.sendFile( '/home/pranavwecallmedia/wecall-cms/uploads/' + file.name);
  
  }

@Get('list/:domainName')
async getImagesByDomainName(@Param('domainName') domainName: string){
  return await this.fileService.getImagesByDomainName(domainName)
}


  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads', // Define your upload directory
  //     filename: (req, file, callback) => {
  //       const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
  //       const extension = path.parse(file.originalname).ext;
  //       callback(null, `${fileName}${extension}`);
  //     },
  //   }),
  // }))

  // uploadFile(@Res() res, @UploadedFile() file) {
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     data: file.path
  //   });
  // }

  // @Get(':id')
  // async serveFile(@Param('id') fileId: string, @Res() res: Response) {
  //   const file = await this.fileService.getFileById(fileId);
    
  //   // return file.name;
  //   console.log(file.name);
  //    const image = fs.readFileSync(`./uploads/${file.name}`)
  //   res.send(image);
    
  // }



// ...

// @Get(':id')
// async serveFile(@Param('id') fileId: string, @Res() res: Response) {
//   const file = await this.fileService.getFileById(fileId);

//   // if (file) {
//     {
//      res.sendFile(path.join(__dirname , '../uploads/' + file));
//     // const image = fs.readFileSync(filePath);
//     // res.send(image);
//   // } else {
//     }
//     // Handle the case where the file does not exist or there's an issue with getFileById.
//     // res.status(404).send('File not found');
//   // }
// }




  @Get(':domainName/:fileName')
  async getFileName(
    @Param('domainName') domainName: string,
    @Param('fileName') fileName: string,
    @Res() res: Response
  ) {
    const result = await this.fileService.getFileName(domainName, fileName);
    
    res.sendFile( '/home/pranavwecallmedia/wecall-cms/uploads/' + fileName);

    return result.fileName;
  }
}
