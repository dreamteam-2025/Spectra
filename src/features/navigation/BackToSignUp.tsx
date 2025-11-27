import { ROUTES } from "@/shared/lib/constants"
import Link from "next/link"
import s from "./BackToSignUp.module.scss"
import Image from "next/image"
import arrowBack from "../../../public/icons/arrow-back-outline.svg"

export const BackToSignUp = () =>{
    return(
        <div className={s.wrapper}>
            <Link href={ROUTES.AUTH.SIGNUP} className={s.backToSignUp}>
                <Image src={arrowBack} alt="Back to Sign Up"/>Back to Sign Up
            </Link>
        </div>
    )
}