import { UserModule } from './user.module';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly UserModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    const user = new this.UserModel({
      ...createUserInput,
    });

    const result = await user.save();

    return result;
  }

  async findAll() {
    const users = await this.UserModel.find().exec();

    return users as User[];
  }

  async findOne(username: string): Promise<User> {
    const user = await this.UserModel.findOne({ username });

    return user;
  }

  async getUser(username: string) {
    const user = await this.findOne(username);

    if (!user) {
      throw new Error('No user with given username');
    }

    return user;
  }
}
