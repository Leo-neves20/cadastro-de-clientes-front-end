export interface iChildren{
    children: React.ReactNode
}

export interface iUserData {
    name: string,
	email: string,
	password: string,
    confirm_password: string,
	phone_number: string
}

export interface iUserDataResponse{
	id: string,
    name: string,
    email: string,
    phone_number: string,
    created_At: Date,
}

export interface iUserDataRequest{
	name: string,
	email: string,
	password: string,
	phone_number: string
}

export interface iUserLoginData{
	email: string,
	password: string
}

