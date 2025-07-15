import { Piscina } from "./piscina";

export class  User {
    constructor(
      id: number,
      name: string,
      lastname: string,
      email: string,
      piscinas: Piscina[],
      isAdmin: boolean
    ) {}
}    