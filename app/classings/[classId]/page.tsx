import getClassingByClassId from "@/app/actions/getClassingByClassId";
import ClientOnly from "@/app/components/ClientOnly";
import RegistrationForm from "@/app/components/classings/RegistrationForm";

interface IParams {
    classId?: string,
}

const RegistrationPage = async (
    { params }: { params: IParams }
) => {

    const classing = await getClassingByClassId(params);

    if (!classing) {
        throw new Error("Error");
    }


    return (
        <ClientOnly>
            <RegistrationForm
                classId={params.classId}
                classing={classing}
            />
        </ClientOnly>
    );
}

export default RegistrationPage;