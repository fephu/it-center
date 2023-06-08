"use client"

import { Cart } from "@prisma/client";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface ItemProps {
    cart: Cart;
}

const Item: React.FC<ItemProps> = ({
    cart,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            cartId: cart.cartId,
        }
    });

    const deleteCart: SubmitHandler<FieldValues> = (data) => {
        axios.delete('/api/cart', data)
            .then(() => {
                toast.success('Thanh cong')
            })
            .catch((error) => {
                console.log(error);
                toast.error('Khong')
            })
    }

    return (
        <tr className="border-b dark:border-neutral-500">
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {cart.email}
            </td>
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {cart.guestName}
            </td>
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {cart.cartId}
            </td>
            <td
                className="whitespace-nowrap  px-6 py-4 font-medium"
            >
                {cart.state}
            </td>
            <td
                className="whitespace-nowrap  px-6 py-6 font-medium flex"
            >
                <Button
                    label="Xoa"
                    onClick={handleSubmit(deleteCart)}
                />

                <Button
                    label="Sua"
                    onClick={() => { }}
                />
            </td>
        </tr>
    );
}

export default Item;