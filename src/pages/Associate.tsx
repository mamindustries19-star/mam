import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Associate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", profession: "", industry: "", companyName: "",
    phone: "", email: "", address: "", city: "", state: "", zip: "", country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.companyName || !form.phone || !form.email || !form.country) {
      toast.error("Please fill all mandatory fields");
      return;
    }
    toast.success("Thank you! We will get back to you soon.");
    setForm({ name: "", profession: "", industry: "", companyName: "", phone: "", email: "", address: "", city: "", state: "", zip: "", country: "" });
  };

  const inputClass = "w-full bg-transparent border-b border-muted-foreground/30 py-2 px-1 text-foreground font-opensans text-sm focus:outline-none focus:border-primary transition-colors";
  const labelClass = "font-opensans text-sm text-muted-foreground mb-1 block";

  return (
    <div className="min-h-screen bg-quiko-grey">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="font-oswald text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Associate with Quiko Lasers & Co.
            </h4>
            <p className="text-muted-foreground font-opensans text-sm mb-2">
              Connect or associate with us for all your requirements – one time or recurring.
            </p>
            <p className="text-muted-foreground font-opensans text-sm mb-8">
              Let's join hands together to create, accomplish and grow big. Request you to fill up the form with the required details.
            </p>
            <p className="text-muted-foreground font-opensans text-xs mb-6">
              Fields marked with an <span className="text-primary">*</span> are mandatory
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label className={labelClass}>Name <span className="text-primary">*</span></label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Profession</label>
              <input name="profession" value={form.profession} onChange={handleChange} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Industry</label>
              <select name="industry" value={form.industry} onChange={handleChange} className={inputClass + " bg-quiko-grey"}>
                <option value="">Select</option>
                <option value="Architect">Architect</option>
                <option value="Middle Man / Agent">Middle Man / Agent</option>
                <option value="Individual">Individual</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Company Name <span className="text-primary">*</span></label>
              <input name="companyName" value={form.companyName} onChange={handleChange} className={inputClass} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Phone <span className="text-primary">*</span></label>
                <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Email <span className="text-primary">*</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <input name="address" value={form.address} onChange={handleChange} className={inputClass} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>City</label>
                <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>State / Province</label>
                <input name="state" value={form.state} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Zip</label>
                <input name="zip" value={form.zip} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Country <span className="text-primary">*</span></label>
              <input name="country" value={form.country} onChange={handleChange} className={inputClass} required />
            </div>

            <button
              type="submit"
              className="font-oswald text-sm font-semibold px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors tracking-wider uppercase"
            >
              Submit
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Associate;
