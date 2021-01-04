import { Field, ObjectType } from "@nestjs/graphql";
import { IsDate, IsEmail } from "class-validator";
import { Entity, BaseEntity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'user' })
export class User extends BaseEntity {
  
    @PrimaryGeneratedColumn('uuid')
    @Index()
    @Field({ description: 'Código hash único autogenerado.' })
    id: string;

    @Column({ type: 'varchar', unique: true })    
    @Field({ description: 'Usuario' })
    userName: string;
  
    @Column({ type: 'varchar', unique: true })
    @IsEmail()
    @Field({ description: 'Correo' })
    email: string;
  
    @CreateDateColumn({ name: 'created_at' })
    @Field({ description: 'Fecha de creación en el sistema.' })
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @IsDate()
    @Field({ description: 'Fecha de la última actualización en el sistema.' })
    updatedAt: Date;
}