import { error } from 'console';
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
        try {
            const userRepository = getCustomRepository(UserRepositories);

            if (!email) {
                throw new Error("Email incorrect");
            }

            const userAlreadyExists = await userRepository.findOne({
                email
            });

            if (userAlreadyExists) {
                throw new Error("User already exists");
            }

            const user = userRepository.create({
                name,
                email,
                admin,
            });

            await userRepository.save(user);

            return user;
        } catch (erro) {
            throw new Error(erro);
            
        }

    }
}

export { CreateUserService };
