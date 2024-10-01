export interface LoginFormProps {
    username: string;
    password: string;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    errorMessage: string | null;
    loading: boolean;
}

export interface LoginPageState {
    username: string;
    password: string;
    loading: boolean;
}