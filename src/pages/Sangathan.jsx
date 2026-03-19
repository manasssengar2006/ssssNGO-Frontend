import { motion } from "framer-motion";

const founders = [
  {
    name: "श्री अशोक कुमार पाल",
    role: "संस्थापक अध्यक्ष",
    phone: "9717420311",
  },
  {
    name: "श्री विपिन कुमार",
    role: "सचिव",
    phone: "8532942212",
  },
];

const members = [
  { name: "श्री महेश चंद पाल", role: "सदस्य + कोषाध्यक्ष दिल्ली एनसीआर", phone: "9999903344" },
  { name: "श्रीमती लता पाल", role: "अध्यक्ष महिला प्रकोष्ठ दिल्ली एनसीआर", phone: "8128934394" },
  { name: "श्री तेजपाल सिंह", role: "संरक्षक", phone: "9213070641" },
  { name: "श्री भागमल पाली", role: "सहसचिव", phone: "9212220176" },
  { name: "श्री जनक पाल", role: "संरक्षक सलाहकार", phone: "9717028628" },
  { name: "श्री मनोज बघेल", role: "सचिव", phone: "9999913422" },
  { name: "श्री सुरेश कुमार पाल", role: "उपाध्यक्ष", phone: "9354008031" },
  { name: "श्री जे. डी. पाल", role: "संरक्षक", phone: "9310969775" },
  { name: "श्री ललित कुमार", role: "सदस्य", phone: "9811098062" },
  { name: "श्री योगेश कुमार", role: "संयोजक आगरा जिला", phone: "9927164646" },
  { name: "श्री सतेंद्र डागर", role: "संयोजक जिला मेरठ", phone: "9760774719" },
  { name: "श्री योगेश कुमार पाल", role: "संयोजक जिला मुजफ्फरनगर", phone: "9760239838" },
  { name: "श्री शिव प्रसाद", role: "संयोजक जिला मिर्जापुर, यू.पी", phone: "8655639685" },
  { name: "श्री विवेक कुमार", role: "संयोजक लखनऊ", phone: "9307440269" },
  { name: "श्री राजेश पाल", role: "सदस्य", phone: "8707813459" },
  { name: "श्री किशन कुमार", role: "सदस्य", phone: "9616795555" },
  { name: "श्री मंजीत सिंह वर्मा", role: "संयोजक उत्तराखंड", phone: "8279548484" },
  { name: "श्री संदीप कुमार", role: "संयोजक जिला देहरादून", phone: "7895544350" },
  { name: "श्री अशोक बगवास", role: "संयोजक जिला प्रतापगढ़, राजस्थान", phone: "8696831631" },
  { name: "श्री सुरेश चंद रियार", role: "संयोजक भरतपुर, राजस्थान", phone: "9694529215" },
  { name: "श्री तेज सिंह", role: "संयोजक जिला लहार, मध्य प्रदेश", phone: "8319252071" },
  { name: "श्री अभय सिंह", role: "संयोजक बिहार प्रदेश", phone: "7739602108 / 7717782045" },
];

const Card = ({ name, role, phone, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04 }}
    whileHover={{ y: -4 }}
    className="bg-white rounded-xl shadow-md p-5 border-l-4 border-[#296374] hover:shadow-lg transition"
  >
    <h3 className="font-semibold text-[#0C2C55]">{name}</h3>
    <p className="text-sm text-[#296374] mb-2">{role}</p>

    <a
      href={`tel:${phone.split("/")[0].trim()}`}
      className="text-sm text-green-600 font-medium hover:underline"
    >
      📞 {phone}
    </a>
  </motion.div>
);

const FounderCard = ({ name, role, phone }) => (
  <div className="bg-gradient-to-r from-[#0C2C55] to-[#296374] text-white p-5 rounded-xl shadow-lg">
    <h3 className="font-semibold text-lg">{name}</h3>
    <p className="text-sm opacity-90">{role}</p>
    <a href={`tel:${phone}`} className="text-sm mt-2 inline-block underline">
      📞 {phone}
    </a>
  </div>
);

const Sangathan = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold text-center text-[#0C2C55] mb-8"
      >
        संगठन संरचना
      </motion.h1>

      {/* Founders */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {founders.map((f, i) => (
          <FounderCard key={i} {...f} />
        ))}
      </div>

      <h2 className="text-xl font-semibold text-[#0C2C55] mb-4">
        न्यास के प्रमुख कार्यकर्ता
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, i) => (
          <Card key={i} {...m} index={i} />
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        * यह सूची समय-समय पर अपडेट की जाती रहेगी
      </p>
    </div>
  );
};

export default Sangathan;
