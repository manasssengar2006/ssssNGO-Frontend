import { motion } from "framer-motion";

const members = [
  { name: "श्री महेश चंद पाल", role: "अध्यक्ष + कोषाध्यक्ष दिल्ली एनसीआर" },
  { name: "श्रीमती लता पाल", role: "अध्यक्ष महिला प्रकोष्ठ दिल्ली एनसीआर" },
  { name: "श्री तेजपाल सिंह", role: "संरक्षक" },
  { name: "श्री भागमल पाली", role: "सहसचिव" },
  { name: "श्री जनक पाल", role: "संरक्षक सलाहकार" },
  { name: "श्री मनोज बघेल", role: "सचिव" },
  { name: "श्री सुरेश कुमार पाल", role: "उपाध्यक्ष" },
  { name: "श्री जे. डी. पाल", role: "संरक्षक" },
  { name: "श्री ललित कुमार", role: "सदस्य" },

  { name: "श्री योगेश कुमार", role: "संयोजक आगरा जिला" },
  { name: "श्री सतेंद्र डागर", role: "संयोजक जिला मेरठ" },
  { name: "श्री योगेश कुमार पाल", role: "संयोजक जिला मुजफ्फरनगर" },

  { name: "अधिवक्ता श्री प्रतिक कटारिया", role: "सदस्य मुजफ्फरनगर" },
  { name: "श्री शि प्रसाद", role: "संयोजक जिला मिर्जापुर, यू.पी" },

  { name: "श्री विवेक कुमार", role: "संयोजक लखनऊ" },

  { name: "श्री राजेश पाल", role: "सदस्य" },
  { name: "श्री रंजीत", role: "सदस्य" },
  { name: "श्री किशन कुमार", role: "सदस्य" },

  { name: "श्री संदीप कुमार", role: "संयोजक जिला देहरादून" },

  { name: "श्री अशोक बगवास", role: "संयोजक जिला प्रतापगढ़, राजस्थान" },

  { name: "श्री तेज सिंह", role: "संयोजक जिला लहार, मध्य प्रदेश" },

  { name: "श्री अभय सिंह", role: "संयोजक बिहार प्रदेश" },

  { name: "श्री मानस", role: "आईटी एक्सपर्ट" },
  { name: "श्री कुणाल पाल", role: "आईटी एक्सपर्ट" },
];

const Card = ({ name, role, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ scale: 1.03 }}
    className="bg-white rounded-xl shadow p-4 border-l-4 border-[#296374]"
  >
    <h3 className="font-semibold text-[#0C2C55]">{name}</h3>
    <p className="text-sm text-[#296374]">{role}</p>

    {/* Future phone placeholder */}
    <p className="text-xs text-gray-400 mt-1">
      संपर्क: जल्द जोड़ा जाएगा
    </p>
  </motion.div>
);

const Sangathan = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center text-[#0C2C55] mb-6"
      >
        संगठन संरचना
      </motion.h1>

      {/* Founders Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-[#0C2C55] to-[#296374] text-white p-6 rounded-xl mb-8"
      >
        <h2 className="text-lg font-semibold mb-3">
          संस्थापक व पदाधिकारी
        </h2>

        <p>श्री अशोक कुमार पाल (संस्थापक अध्यक्ष)</p>
        <p>श्री विपिन कुमार (सचिव)</p>
      </motion.div>

      <h2 className="text-xl font-semibold text-[#0C2C55] mb-4">
        न्यास के प्रमुख कार्यकर्ता
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, i) => (
          <Card key={i} {...m} index={i} />
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        * संपर्क नंबर व फोटो चरणबद्ध रूप से जोड़े जाएँगे
      </p>
    </div>
  );
};

export default Sangathan;
