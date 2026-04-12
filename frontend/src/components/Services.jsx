import { TbTruckDelivery } from "react-icons/tb";
import { MdSecurity } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";

const Services = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        
        <div className="grid gap-12 md:grid-cols-3">
          
          {/* Service 1 */}
          <div className="h-72 flex flex-col justify-center items-center text-center bg-gray-100 rounded-2xl shadow-sm">
            <TbTruckDelivery className="text-6xl text-green-600 bg-white p-4 rounded-full mb-4" />
            <h3 className="font-semibold">Super Fast and Free Delivery</h3>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col gap-8">
            
            <div className="flex justify-center items-center bg-gray-100 rounded-2xl shadow-sm h-32">
              <div className="flex items-center gap-4">
                <MdSecurity className="text-6xl text-green-600 bg-white p-4 rounded-full" />
                <h3 className="font-semibold">Non-contact Shipping</h3>
              </div>
            </div>

            <div className="flex justify-center items-center bg-gray-100 rounded-2xl shadow-sm h-32">
              <div className="flex items-center gap-4">
                <GiReceiveMoney className="text-6xl text-green-600 bg-white p-4 rounded-full" />
                <h3 className="font-semibold">Money-Back Guaranteed</h3>
              </div>
            </div>

          </div>

          {/* Service 3 */}
          <div className="h-72 flex flex-col justify-center items-center text-center bg-gray-100 rounded-2xl shadow-sm">
            <RiSecurePaymentLine className="text-6xl text-green-600 bg-white p-4 rounded-full mb-4" />
            <h3 className="font-semibold">Super Secure Payment System</h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;