import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { Products } from "./Products";
// import { Products } from "./Products";

@Entity()
export class Tegs {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Products, (products) => products.tegs)
    products: Products[]


}
