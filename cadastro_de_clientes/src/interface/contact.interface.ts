export interface iContactCreate {
    name: string;
    email: string;
    phone_number: string;
}

export interface iContactUpdate {
    name?: string;
    email?: string;
    phone_number?: string;
}

export interface iContactResponse {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    created_At: Date;
  }