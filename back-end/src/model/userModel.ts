import IUserModel from './interfaces/userModel';
import prismaClient from './prisma/prismaClient';

export default class UserModel implements IUserModel {
  private async findOne(email: string): Promise<string | null> {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });
    return user ? user.id : null;
  }

  private async create(email: string): Promise<string> {
    const user = await prismaClient.user.create({
      data: { email },
    });
    return user.id;
  }

  async findOrCreate(email: string): Promise<string> {
    const findUser = await this.findOne(email);
    return findUser ? findUser : await this.create(email);
  }
}