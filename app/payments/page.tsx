import getAllCart from "@/app/actions/getAllCart"
import Button from "../components/Button";
import Item from "./Item";
import getCurrentUser from "../actions/getCurrentUser";


export default async function PaymentsPage() {

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== "ADMIN") {
        return null;
    }

    const data = await getAllCart();

    if (!data) {
        return null;
    }

    return (
        <table className="min-w-full text-center text-sm font-light border-2 rounded-full">
            <thead className="bg-purple-700 font-sm text-white">
                <tr>
                    <th scope="col" className="px-6 py-4">Email</th>
                    <th scope="col" className="px-6 py-4">Tên</th>
                    <th scope="col" className="px-6 py-4">Mã lớp học</th>
                    <th scope="col" className="px-6 py-4">Trạng thái</th>
                    <th scope="col" className="px-6 py-4"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <Item cart={item} />
                ))}
            </tbody>
        </table>
    )
}
