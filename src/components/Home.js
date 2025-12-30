import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const CATEGORY_CARDS = [
  {
    name: "Reverse Transcription & RT-PCR",
    slug: "reverse-transcription-rt-pcr",
    image: "/images/reverse-transcription-rt-pcr.jpeg",
  },
  {
    name: "Enzymes / Enzyme Inhibitors / Reagents",
    slug: "enzymes-enzyme-inhibitors-reagents",
    image: "/images/enzymes-enzyme-inhibitors-reagents.jpeg",
  },
  {
    name: "Bio Transformation Kit",
    slug: "bio-transformation-kit",
    image: "/images/bio-transformation-kit.jpeg",
  },
  {
    name: "DNA & RNA Purification (Column System)",
    slug: "dna-rna-purification-kits-column-system",
    image: "/images/dna-rna-column.jpeg",
  },
  {
    name: "PCR & Real-Time PCR",
    slug: "pcr-real-time-pcr",
    image: "/images/pcr-real-time-pcr.jpeg",
  },
  {
    name: "Proteomics",
    slug: "proteomics",
    image: "/images/proteomics.jpeg",
  },
  {
    name: "Nucleic Acid Gel Electrophoresis",
    slug: "nucleic-acid-gel-electrophoresis",
    image: "/images/gel-electrophoresis.jpeg",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="category-section">
        <h2 className="section-title">Product Categories</h2>

        <div className="category-grid">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.slug}
              className="category-card"
              onClick={() =>
                navigate(`/products?category=${cat.slug}`)
              }
            >
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay">
                <span>{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
