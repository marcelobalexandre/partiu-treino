import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('persona_trainers')
export class PersonalTrainerTypeORMEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
