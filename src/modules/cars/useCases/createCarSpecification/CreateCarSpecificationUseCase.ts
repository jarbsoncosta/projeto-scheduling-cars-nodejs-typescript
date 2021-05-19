import { ICarRepository } from '@modules/cars/repositories/ICarsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    specification_id: string;
}
class CreateCarSpecificationUseCase {
    constructor(private carsRepository: ICarRepository) {}
    async execute({ car_id, specification_id }: IRequest): Promise<void> {
        const carExists = this.carsRepository.findById(car_id);
        if (!carExists) {
            throw new AppError('Car does not exists!');
        }
    }
}

export { CreateCarSpecificationUseCase };