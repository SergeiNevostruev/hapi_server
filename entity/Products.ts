import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { Tegs } from "./Tegs";

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    price: number;

    @ManyToMany(()=>Tegs, (tegs) => tegs.products)
    @JoinTable()
    tegs: Tegs[]

}
