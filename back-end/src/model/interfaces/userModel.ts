export default interface IUserModel {
  findOrCreate(email: string) : Promise<string>;
}