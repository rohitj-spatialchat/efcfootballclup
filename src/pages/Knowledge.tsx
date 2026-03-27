import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const categories = ["All", "Fitness", "Meeting Circles", "Nutrition", "Guided Sessions"];

const courses = [
  {
    title: "Desk to deep breath: Midday movement for grounded energy",
    description: "Recovery techniques and stretching routines for peak athletic performance.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/440px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
    type: "WATCH" as const,
    tags: ["Fitness & Exercise Physiology"],
    progress: 100,
    completedDate: "Apr 4, 2025",
    publishedDate: "Mar 10, 2025",
    isNew: false,
  },
  {
    title: "Simple nourishment: Wholesome eating for life in motion",
    description: "Optimize Athletic Performance with Proper Diet and Nutrition.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/440px-Cristiano_Ronaldo_2018.jpg",
    type: "WATCH" as const,
    tags: ["Nutrition"],
    progress: 50,
    completedDate: null,
    publishedDate: "May 20, 2025",
    isNew: true,
  },
  {
    title: "The rest ritual: Reclaiming sleep as sacred restoration",
    description: "Learn Techniques for Recovery, Rehabilitation and Injury Management.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/440px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg",
    type: "LISTEN" as const,
    tags: ["Healing Circles"],
    progress: 0,
    completedDate: null,
    publishedDate: "Jul 25, 2025",
    isNew: true,
  },
  {
    title: "Nutrition for performance: Fueling the footballer's body",
    description: "Optimize Athletic Performance with Proper Diet and Nutrition.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2022_FIFA_World_Cup_France_4%E2%80%931_Australia_-_%2817%29.jpg/440px-2022_FIFA_World_Cup_France_4%E2%80%931_Australia_-_%2817%29.jpg",
    type: "WATCH" as const,
    tags: ["Nutrition", "Sport & Exercise Science"],
    progress: 75,
    completedDate: null,
    publishedDate: "Jun 15, 2025",
    isNew: true,
  },
  {
    title: "ACL recovery & rehabilitation: A footballer's journey back",
    description: "Build Muscle, Enhance Strength, and Improve Athletic Power.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Erling_Haaland_2023.jpg/440px-Erling_Haaland_2023.jpg",
    type: "LISTEN" as const,
    tags: ["Sportmedicine & Physiotherapy"],
    progress: 30,
    completedDate: null,
    publishedDate: "Feb 12, 2025",
    isNew: false,
  },
  {
    title: "Strength & conditioning: Building the complete athlete",
    description: "Learn Techniques for Recovery, Rehabilitation and Injury Management.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mohamed_Salah_2018.jpg/440px-Mohamed_Salah_2018.jpg",
    type: "READ" as const,
    tags: ["Strength & Power"],
    progress: 100,
    completedDate: "Jan 28, 2025",
    publishedDate: "Dec 5, 2024",
    isNew: false,
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
                {/* Image */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {course.isNew && (
                    <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                  {course.title}
                </h3>

                {/* Status row */}
                <div className="space-y-1.5">
                  {course.progress === 100 ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-xs text-muted-foreground">
                        Completed {course.completedDate}
                      </span>
                    </div>
                  ) : course.progress > 0 ? (
                    <div className="flex items-center gap-2">
                      <Progress value={course.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {course.progress}% complete
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span>{course.tags[0]}</span>
                      <span>·</span>
                      <span>Starts on {course.publishedDate}</span>
                    </div>
                  )}
                </div>

                {/* Type badge */}
                <div className="mt-2">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${typeColors[course.type]}`}>
                    {course.type === "LISTEN" ? "🎧 " : course.type === "WATCH" ? "▶ " : "📖 "}{course.type}
                  </span>
                </div>
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
