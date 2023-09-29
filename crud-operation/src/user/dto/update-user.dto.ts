
export class UpdateUserDto {
    readonly name: string;
    readonly  username: string;
    readonly password: string;
    readonly role: string;
    readonly active: boolean;
    resetToken: String;
    resetTokenExpiration: Date
}
