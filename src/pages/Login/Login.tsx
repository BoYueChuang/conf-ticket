import { apiService } from "../../api/fetchService";

export const Login: React.FC = () => {

    // 提交登入請求
    const submit = async () => {
        try {
            const data = await apiService.auth.login({
                email: 'john@example.com',
                password: '123456',
            });

            console.log('Login response:', data);

        } catch (error) {
            console.error('Error:', error);
        }
    }


    // 組件邏輯
    return (
        <div>
            <button onClick={submit}>Login</button>
        </div>
    );
};