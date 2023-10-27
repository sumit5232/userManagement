import { Module } from '@nestjs/common';

import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './entities/file.model';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports:[ 
    MongooseModule.forFeature([
      { name: File.name, schema: FileSchema}
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Define your upload directory
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
