import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../repositories/TagRepositories";


class CreateTagService {
    async execute(name: string) {
        const tagsRepository = getCustomRepository(TagRepositories);

        if (!name) {
            throw new Error("Incorrect name!");            
        }

        const tagAlreadyExists = await tagsRepository.findOne({name});

        if (tagAlreadyExists) {
            throw new Error("Tag already exists!");
        }

        const tag = tagsRepository.create({
            name
        });

        await tagsRepository.save(tag);

        return tag;

    }
}

export { CreateTagService }