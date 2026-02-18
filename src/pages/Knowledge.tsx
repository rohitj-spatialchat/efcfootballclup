import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const categories = ["All", "Fitness", "Meeting Circles", "Nutrition", "Guided Sessions"];

const courses = [
  {
    title: "Sport Medicine & Injury Prevention",
    description: "Optimize Athletic Performance with Proper Diet and Nutrition.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop",
    type: "WATCH",
    tags: ["Sport & Exercise Science", "Nutrition"],
  },
  {
    title: "Sport Science & Physiology",
    description: "Build Muscle, Enhance Strength, and Improve Athletic Power.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=300&fit=crop",
    type: "LISTEN",
    tags: ["Sport Psychology", "Sportmedicine & Physiotherapy"],
  },
  {
    title: "Sport Psychology",
    description: "Learn Techniques for Recovery, Rehabilitation and Injury Management.",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=300&fit=crop",
    type: "READ",
    tags: ["Strength & Power", "Fitness & Exercise Physiology"],
  },
  {
    title: "Nutrition for Performance",
    description: "Optimize Athletic Performance with Proper Diet and Nutrition.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    type: "WATCH",
    tags: ["Nutrition", "Sport & Exercise Science"],
  },
  {
    title: "ACL Recovery & Rehabilitation",
    description: "Build Muscle, Enhance Strength, and Improve Athletic Power.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    type: "LISTEN",
    tags: ["Sportmedicine & Physiotherapy"],
  },
  {
    title: "Strength & Conditioning",
    description: "Learn Techniques for Recovery, Rehabilitation and Injury Management.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    type: "READ",
    tags: ["Strength & Power"],
  },
];

const typeColors: Record<string, string> = {
  WATCH: "bg-primary text-primary-foreground",
  LISTEN: "bg-success text-success-foreground",
  READ: "bg-info text-info-foreground",
};

const allTags = [
  "Sport & Exercise Science", "Nutrition", "Sport Psychology",
  "Sportmedicine & Physiotherapy", "Strength & Power", "Fitness & Exercise Physiology",
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>(allTags.slice(0, 4));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-5">
          {/* Category Tabs */}
          <motion.div variants={item} className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              More <ChevronDown className="h-3 w-3" />
            </button>
          </motion.div>

          {/* Course Grid */}
          <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="rounded-lg overflow-hidden aspect-[4/3] mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{course.description}</p>
                <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${typeColors[course.type]}`}>
                  {course.type === "LISTEN" ? "🎧 " : course.type === "WATCH" ? "▶ " : "📖 "}{course.type}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sort & Filter Sidebar */}
        <motion.div variants={item} className="hidden lg:block w-60 shrink-0 space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-primary mb-1">Sort & Filter</h3>
            <p className="text-xs text-muted-foreground">Find the content you are looking for across the Knowledge Hub</p>
          </div>

          {[
            { label: "Topics", value: "All" },
            { label: "Brands", value: "All" },
            { label: "Formats", value: "All" },
            { label: "Date", value: "All Time" },
            { label: "Prices", value: "All" },
          ].map((filter) => (
            <div key={filter.label}>
              <label className="text-xs font-medium text-foreground">{filter.label}:</label>
              <div className="mt-1 flex items-center justify-between rounded-md border border-input bg-background px-3 py-1.5 text-xs text-muted-foreground cursor-pointer hover:border-primary/30 transition-colors">
                {filter.value}
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
          ))}

          <div>
            <label className="text-xs font-medium text-foreground">Tags: {selectedTags.length} Selected</label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
