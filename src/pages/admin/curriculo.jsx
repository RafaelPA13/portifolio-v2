import Titulo from "../../components/titulo";

export default function Curriculo() {
    return (
        <div className="w-[90%] md:w-[50%]">
            <Titulo titulo="Currículo" admin={true} button={false} />
        </div>
    )
}