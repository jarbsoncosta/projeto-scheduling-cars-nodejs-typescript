import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<void> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });
        this.cars.push(car);
    }
}
export { CarsRepositoryInMemory };
