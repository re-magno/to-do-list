export interface IUserModel {
  findOrCreate(email: string) : Promise<string>;
}
