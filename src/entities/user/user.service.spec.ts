import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { UserService } from "./user.service";

// Mock Repository
const mockUserRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
});

describe("UserService", () => {
    let service: UserService;
    let repository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useFactory: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get(getRepositoryToken(User));
    });

    describe("create", () => {
        it("should successfully create a user", async () => {
            const userDto = {
                email: "test@example.com",
                iin: "000000000000",
                password: "Test1234",
            };
            const savedUser = { ...userDto, id: 1 };

            jest.spyOn(bcrypt, "hash").mockResolvedValue("hashedPassword");
            repository.create.mockReturnValue(savedUser);
            repository.save.mockResolvedValue(savedUser);

            const result = await service.create(userDto);

            expect(result).toEqual(savedUser);
            expect(repository.create).toHaveBeenCalledWith({
                ...userDto,
                password: "hashedPassword",
            });
            expect(repository.save).toHaveBeenCalledWith(savedUser);
        });
    });

    describe("findOneByEmail", () => {
        it("should return a user if a user with the email exists", async () => {
            const user = { id: 1, email: "test@example.com" };
            repository.findOne.mockResolvedValue(user);

            const result = await service.findOneByEmail("test@example.com");
            expect(result).toEqual(user);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { email: "test@example.com" },
            });
        });
    });

    describe("profileEdit", () => {
        it("should update user data", async () => {
            const user = { id: 1, email: "test@example.com" };
            const editData = { email: "new@example.com" };
            const updatedUser = { ...user, ...editData };

            repository.save.mockResolvedValue(updatedUser);

            const result = await service.editProfile({ ...user, ...editData });
            expect(result).toEqual(updatedUser);
            expect(repository.save).toHaveBeenCalledWith({
                ...user,
                ...editData,
            });
        });
    });
});
