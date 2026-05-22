import { useEffect, useState } from "react"

const Modal = ({ children, onClose }) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        setVisible(true)

        const timer = setTimeout(() => {

            setVisible(false)

            const closeTimer = setTimeout(() => {
                onClose()
            }, 300)

            return () => clearTimeout(closeTimer)

        }, 2000)

        return () => clearTimeout(timer)

    }, [onClose])

    return (
        <div className="fixed inset-0 flex items-start justify-center pt-5 z-50 mt-20">

            <div
                className={`
                bg-gray-100 shadow-md w-full max-w-sm text-center text-black text-xl p-4 rounded
                transform transition-all duration-300
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
            >
                {children}
            </div>

        </div>
    )
}

export default Modal