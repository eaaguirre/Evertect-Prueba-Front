
export interface Person {
    Id: number;
    name:string;
    LastName: string;
    BirthDate: Date;
    Photo?: string;
    MaritalStatus: number;
    HasSiblings: string;
  }

  export interface PersonData  {
    id: number;
    id_marital:number;
    name:string;
    lastName: string;
    birthDate: Date;
    photo?: string;
    maritalStatus: string;
    hasSiblings: string;
    totalRecords:number;
  }

  export interface MaritalData {
    id: number;
    description:string;
   status: number;
   registrationdate:Date
  }

  export interface Employee {
    Id: number;
    Name:string;
    LastName: string;
    BirthDate: Date;
    Photo?: string;
    MaritalStatus: number;
    HasSiblings: string;
  }

