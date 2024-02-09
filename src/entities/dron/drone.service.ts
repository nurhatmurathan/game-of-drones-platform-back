import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { AuthService } from "../../auth/auth.service";
import { User } from "../user/user.entity";
import { Drone } from "./drone.entity";
import { DroneVerifyDto } from "./dto";

@Injectable()
export class DroneService {
    constructor(
        @InjectRepository(Drone)
        private readonly dronRepository: Repository<Drone>,
        private readonly authService: AuthService
    ) {}

    async findAll(): Promise<Drone[]> {
        const instances: Drone[] = await this.dronRepository.find({
            relations: { user: true },
        });

        return instances;
    }

    async findOne(id: string, relations?: FindOptionsRelations<Drone>): Promise<Drone> {
        return this.dronRepository.findOne({ where: { id }, relations });
    }

    async create(id: string, name: string): Promise<Drone> {
        const instance: Drone = this.dronRepository.create({ id, name });
        return await this.dronRepository.save(instance);
    }

    async findAvailableDrones(): Promise<Drone[]> {
        const instances: Drone[] = await this.dronRepository.find({
            where: {
                user: null,
                isOnline: true,
            },
        });
        console.log(instances);
        this.isExists(instances);

        return instances;
    }

    async update(id: string, name: string, isOnline: boolean): Promise<Drone> {
        return await this.dronRepository.save({ id, name, isOnline });
    }

    async delete(id: string) {
        await this.dronRepository.delete({ id });
        return { message: `Dron ${id} is deleted` };
    }

    async bindUserWithDrone(user: User, dron: Drone): Promise<Drone> {
        dron.user = user;
        return this.dronRepository.save(dron);
    }

    async verifyBindingUserWithDrone(verifyDto: DroneVerifyDto): Promise<boolean> {
        const decodedToken = await this.authService.verifyJWTToken(verifyDto.token);

        console.log(decodedToken);
        const instance = await this.dronRepository.findOne({
            where: {
                id: verifyDto.id,
                user: { id: decodedToken.sub },
            },
        });

        return instance ? true : false;
    }

    private isExists(instances: Drone[]): void {
        if (instances.length === 0) throw new NotFoundException(`No available drones`);
    }

    async unbindUser(id: string) {
        this.dronRepository.save({ id, user: null });
        return { mesage: `User is unbinted from drone ${id}` };
    }
}
