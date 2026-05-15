import { useEffect, useState } from "react"

const Modal = ({ children, onClose }) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false) 

            setTimeout(() => {
                onClose() 
            }, 300)

        }, 2000)

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="fixed my-5 inset-0 flex items-start justify-center">
            
            <div className={`
                bg-blue-500 w-full max-w-sm mx-auto text-center text-white p-4 rounded
                transform transition-all duration-300
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
            `}>
                {children}
            </div>

        </div>
    )
}

export default Modal